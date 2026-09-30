import { chromium } from 'playwright';
import fs from 'fs';

const WIDTHS = [1440, 1280, 1024, 768, 390];

async function audit() {
  const browser = await chromium.launch({ headless: true });
  
  const results = {
    fidelity: {},
    behaviour: {},
    summary: {}
  };
  
  // Test each width
  for (const width of WIDTHS) {
    const height = 900;
    
    console.log(`\nTesting width ${width}px...`);
    
    const context = await browser.createContext({ viewport: { width, height }, deviceScaleFactor: 1 });
    const clonePage = await context.newPage();
    
    // Capture console messages
    const consoleMessages = [];
    clonePage.on('console', msg => {
      if (msg.type() === 'error' || msg.type() === 'warning') {
        consoleMessages.push({ type: msg.type(), text: msg.text() });
      }
    });
    
    // Capture failed requests
    const failedRequests = [];
    clonePage.on('requestfailed', req => {
      failedRequests.push({ method: req.method(), url: req.url() });
    });
    
    try {
      await clonePage.goto('http://localhost:5190/', { waitUntil: 'networkidle', timeout: 30000 });
      
      // Scroll to bottom to trigger animations
      await clonePage.evaluate(() => window.scrollBy(0, document.documentElement.scrollHeight));
      await clonePage.waitForTimeout(500);
      
      // Scroll back to top
      await clonePage.evaluate(() => window.scrollTo(0, 0));
      await clonePage.waitForTimeout(300);
      
      // Fidelity check: measure key elements
      const metrics = await clonePage.evaluate(() => {
        const m = {};
        
        // Body metrics
        const body = document.body;
        const bodyStyle = getComputedStyle(body);
        m.bodyBg = bodyStyle.backgroundColor;
        m.bodyColor = bodyStyle.color;
        m.bodyPadding = bodyStyle.paddingTop;
        m.bodyFont = bodyStyle.fontFamily;
        m.bodyLineHeight = bodyStyle.lineHeight;
        
        // Grain overlay
        const grain = document.querySelector('.noise-bg');
        if (grain) {
          const grainStyle = getComputedStyle(grain);
          m.grainOpacity = grainStyle.opacity;
          m.grainFilter = grainStyle.filter;
          m.grainDisplay = grainStyle.display;
        }
        
        // Nav
        const nav = document.querySelector('nav');
        if (nav) {
          const navStyle = getComputedStyle(nav);
          m.navBg = navStyle.backgroundColor;
          m.navBackdrop = navStyle.backdropFilter;
        }
        
        // Container
        const container = document.querySelector('.container');
        if (container) {
          const contStyle = getComputedStyle(container);
          m.containerMargin = contStyle.margin;
          m.containerMaxWidth = contStyle.maxWidth;
          m.containerBorder = contStyle.borderLeft;
          m.containerBorderColor = contStyle.borderLeftColor;
        }
        
        // Main heading
        const heading = document.querySelector('.heading');
        if (heading) {
          const headStyle = getComputedStyle(heading);
          m.headingFont = headStyle.fontFamily;
          m.headingSize = headStyle.fontSize;
          m.headingWeight = headStyle.fontWeight;
          m.headingLS = headStyle.letterSpacing;
          m.headingLH = headStyle.lineHeight;
        }
        
        // Check fonts
        m.fontsLoaded = Array.from(document.fonts).length;
        
        // Viewport dimensions
        m.docHeight = document.documentElement.scrollHeight;
        
        return m;
      });
      
      // Check for external URLs
      const externalRefs = await clonePage.evaluate(() => {
        const refs = [];
        document.querySelectorAll('a[href*="rollups.com"], img[src*="rollups.com"], link[href*="rollups.com"]').forEach(el => {
          refs.push({ tag: el.tagName, url: el.href || el.src });
        });
        return refs;
      });
      
      // Check horizontal overflow
      const overflowCheck = await clonePage.evaluate(() => {
        return {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: window.innerWidth,
          hasOverflow: window.innerWidth < document.documentElement.scrollWidth
        };
      });
      
      results.fidelity[width] = {
        metrics,
        externalRefs,
        failedRequests,
        consoleMessages,
        overflowCheck
      };
      
      console.log(`Width ${width}: Fonts loaded = ${metrics.fontsLoaded}, Failures = ${failedRequests.length}, Overflow = ${overflowCheck.hasOverflow}`);
      
    } catch (err) {
      console.error(`Error at width ${width}:`, err.message);
      results.fidelity[width] = { error: err.message };
    }
    
    await context.close();
  }
  
  // Behaviour: test interactive elements at 1440
  console.log('\nTesting interactive behaviour at 1440px...');
  
  const context = await browser.createContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  
  const behavioralConsoleMessages = [];
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      behavioralConsoleMessages.push({ type: msg.type(), text: msg.text() });
    }
  });
  
  try {
    await page.goto('http://localhost:5190/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    
    // Check for internal links
    const links = await page.evaluate(() => {
      const allLinks = [];
      document.querySelectorAll('a[href]').forEach(a => {
        allLinks.push({
          text: a.textContent?.trim().substring(0, 50),
          href: a.href,
          isRelative: !a.href.startsWith('http') || a.href.includes('localhost')
        });
      });
      return allLinks;
    });
    
    // Test mobile menu if present
    const hasMobileMenu = await page.evaluate(() => {
      const menu = document.querySelector('nav button, [aria-label*="menu"], .hamburger, .mobile-menu');
      return !!menu;
    });
    
    // Test form if present
    const formPresent = await page.evaluate(() => {
      return !!document.querySelector('form');
    });
    
    let formTest = null;
    if (formPresent) {
      formTest = await page.evaluate(() => {
        const form = document.querySelector('form');
        const inputs = form.querySelectorAll('input, textarea');
        return {
          inputCount: inputs.length,
          hasEmail: !!form.querySelector('input[type="email"]'),
          hasValidation: Array.from(inputs).some(i => i.required)
        };
      });
    }
    
    // Check for broken links
    const brokenLinks = [];
    for (const linkObj of links) {
      if (linkObj.isRelative && linkObj.href.startsWith('http://localhost')) {
        try {
          const response = await page.goto(linkObj.href, { waitUntil: 'domcontentloaded', timeout: 5000 });
          if (!response.ok()) {
            brokenLinks.push({ url: linkObj.href, status: response.status() });
          }
          await page.goBack();
        } catch (e) {
          brokenLinks.push({ url: linkObj.href, error: e.message });
        }
      }
    }
    
    results.behaviour = {
      links: links.length,
      mobileMenuPresent: hasMobileMenu,
      formPresent,
      formDetails: formTest,
      consoleMessages: behavioralConsoleMessages,
      brokenLinks
    };
    
    console.log(`Links: ${links.length}, Mobile menu: ${hasMobileMenu}, Form: ${formPresent}, Broken links: ${brokenLinks.length}`);
    
  } catch (err) {
    console.error('Behaviour test error:', err.message);
    results.behaviour.error = err.message;
  }
  
  await context.close();
  await browser.close();
  
  // Save results
  fs.writeFileSync('/private/tmp/claude-504/-Users-riyaghosh-V3-rollups/764bb3f8-dd91-4354-acd5-5a9dbb25aa17/scratchpad/audit-results.json', JSON.stringify(results, null, 2));
  console.log('\nAudit complete. Results saved to audit-results.json');
  
  return results;
}

audit().catch(console.error);
