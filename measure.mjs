import { chromium } from 'playwright';
import * as fs from 'fs';

// Measurement script that will be injected into the page
const measurementScript = `
(async function measurePage() {
  const results = {};

  // Wait a bit for page to settle
  await new Promise(r => setTimeout(r, 1000));

  // 1. Page fade-in
  const pageFadeIn = document.querySelector('.page-fade-in');
  if (pageFadeIn) {
    const cs = getComputedStyle(pageFadeIn);
    results.pageFadeIn = {
      opacity: cs.opacity,
      transform: cs.transform,
    };
  }

  // 2. Banner
  const banner = document.querySelector('.banner.animation-item');
  if (banner) {
    const cs = getComputedStyle(banner);
    results.banner = {
      opacity: cs.opacity,
      transform: cs.transform,
      filter: cs.filter,
    };
  }

  // 3. Hero heading
  const heroHeading = document.querySelector('.hero-heading.animation-text');
  if (heroHeading) {
    const cs = getComputedStyle(heroHeading);
    results.heroHeading = {
      opacity: cs.opacity,
      transform: cs.transform,
      filter: cs.filter,
    };
  }

  // 4. Hero form
  const heroForm = document.querySelector('.form-wrapper.animation-item');
  if (heroForm) {
    const cs = getComputedStyle(heroForm);
    results.heroForm = {
      opacity: cs.opacity,
      transform: cs.transform,
      filter: cs.filter,
    };
  }

  // 5. Hero Lottie animation
  const heroLottie = document.querySelector('.hero-animation');
  if (heroLottie) {
    const cs = getComputedStyle(heroLottie);
    const parent = heroLottie.parentElement;
    const parentRect = parent ? parent.getBoundingClientRect() : null;
    results.heroLottie = {
      transform: cs.transform,
      opacity: cs.opacity,
      visible: parentRect && parentRect.top < window.innerHeight,
    };
  }

  // 6. Banner read link (hover-slide)
  const readLink = document.querySelector('.read-link');
  if (readLink) {
    const linkBox = readLink.querySelector('.link-box');
    if (linkBox) {
      const cs = getComputedStyle(linkBox);
      results.readLink = {
        left: cs.left,
        width: cs.width,
        opacity: cs.opacity,
      };
    }
  }

  // 7. Button hover state (primary "Get Started")
  const primaryBtn = document.querySelector('.button-wrapper--primary .button');
  if (primaryBtn) {
    const cs = getComputedStyle(primaryBtn);
    const wrapper = primaryBtn.parentElement;
    results.primaryButton = {
      paddingRight: cs.paddingRight,
      transform: cs.transform,
      opacity: cs.opacity,
      wrapperClass: wrapper ? wrapper.className : '',
    };
  }

  // 8. Learn more link
  const learnMore = document.querySelector('.learn-more-link');
  if (learnMore) {
    const icon = learnMore.querySelector('.learn-more-icon');
    if (icon) {
      const cs = getComputedStyle(icon);
      const svgs = icon.querySelectorAll('svg');
      results.learnMore = {
        iconWidth: cs.width,
        iconOverflow: cs.overflow,
        svgCount: svgs.length,
        firstSvgTransform: svgs.length > 0 ? getComputedStyle(svgs[0]).transform : null,
      };
    }
  }

  // 9. Nav dropdown trigger
  const navDropdown = document.querySelector('.nav-dropdown-trigger');
  if (navDropdown) {
    const arrow = navDropdown.querySelector('svg');
    const cs = getComputedStyle(navDropdown);
    results.navDropdown = {
      opacity: cs.opacity,
      arrowTransform: arrow ? getComputedStyle(arrow).transform : null,
    };
  }

  // 10. Product Lottie
  const productRaise = document.querySelector('.product-raise');
  if (productRaise) {
    const parent = productRaise.parentElement;
    const parentRect = parent ? parent.getBoundingClientRect() : null;
    results.productLottie = {
      visible: parentRect && parentRect.top < window.innerHeight,
    };
  }

  // 11. Product tabs (≤991)
  const productTabs = document.querySelector('.products-tabs');
  if (productTabs) {
    const cs = getComputedStyle(productTabs);
    results.productTabs = {
      display: cs.display,
      active: productTabs.querySelector('.active-underline') ? 'yes' : 'no',
    };
  }

  // 12. FAQ items
  const faqItems = document.querySelectorAll('.faq-list-item');
  results.faqAccordion = [];
  for (let i = 0; i < Math.min(2, faqItems.length); i++) {
    const item = faqItems[i];
    const answer = item.querySelector('.faq-a');
    const icon = item.querySelector('.faq-icon');
    results.faqAccordion.push({
      index: i,
      isOpen: item.classList.contains('open'),
      answerHeight: answer ? answer.getBoundingClientRect().height : 0,
      iconLine2Transform: icon ? getComputedStyle(icon.querySelector('.line-2')).transform : null,
    });
  }

  // 13. Company logo grid wipe
  const companyGridItems = document.querySelectorAll('.company-grid-item');
  results.companyLogoWipe = [];
  for (let i = 0; i < Math.min(2, companyGridItems.length); i++) {
    const item = companyGridItems[i];
    const mask1 = item.querySelector('.reveal-mask-1');
    const mask2 = item.querySelector('.reveal-mask-2');
    results.companyLogoWipe.push({
      index: i,
      mask2Width: mask2 ? getComputedStyle(mask2).width : null,
      mask2Opacity: mask2 ? getComputedStyle(mask2).opacity : null,
      mask1Opacity: mask1 ? getComputedStyle(mask1).opacity : null,
    });
  }

  // 14. Stage illustration (draw animation)
  const stageIlu = document.querySelector('.draw-stage-ilu svg');
  if (stageIlu) {
    const mainPath = stageIlu.querySelector('.main-path');
    const marker1 = stageIlu.querySelector('.marker-1');
    const text1 = stageIlu.parentElement?.querySelector('.stage-text-1');
    results.stageDraw = {
      mainPathVisible: mainPath ? mainPath.style.display !== 'none' : false,
      marker1Transform: marker1 ? getComputedStyle(marker1).transform : null,
      text1Opacity: text1 ? getComputedStyle(text1).opacity : null,
    };
  }

  // 15. Mobile stage slider
  const stageSlider = document.querySelector('.stages-slider-wrapper');
  if (stageSlider) {
    const cs = getComputedStyle(stageSlider);
    results.mobileStageSlider = {
      display: cs.display,
    };
  }

  // 16. Footer marquee
  const footerMarquee = document.querySelector('.marquee-flex');
  if (footerMarquee) {
    const cs = getComputedStyle(footerMarquee);
    results.footerMarquee = {
      animation: cs.animation,
      animationDuration: cs.animationDuration,
    };
  }

  // 17. Footer illustration draw
  const footerIlu = document.querySelector('.draw-ilu svg');
  if (footerIlu) {
    const paths = footerIlu.querySelectorAll('path');
    if (paths.length > 0) {
      const firstPath = paths[0];
      const cs = getComputedStyle(firstPath);
      results.footerIluDraw = {
        pathCount: paths.length,
        firstPathStrokeDasharray: cs.strokeDasharray,
        firstPathStrokeDashoffset: cs.strokeDashoffset,
      };
    }
  }

  // 18. Cookie bar
  const cookieBar = document.querySelector('.cookie-consent');
  if (cookieBar) {
    const cs = getComputedStyle(cookieBar);
    results.cookieBar = {
      display: cs.display,
      transform: cs.transform,
      opacity: cs.opacity,
    };
  }

  // 19. Mobile menu
  const mobileMenu = document.querySelector('.nav-mobile-menu');
  if (mobileMenu) {
    const cs = getComputedStyle(mobileMenu);
    results.mobileMenu = {
      display: cs.display,
      opacity: cs.opacity,
      isOpen: mobileMenu.classList.contains('is-open'),
    };
  }

  // 20. Mobile Get Started button
  const mobileGetStarted = document.querySelector('.mobile-get-started-wrapper');
  if (mobileGetStarted) {
    const cs = getComputedStyle(mobileGetStarted);
    results.mobileGetStarted = {
      display: cs.display,
      opacity: cs.opacity,
      transform: cs.transform,
    };
  }

  // 21. Testimonial modal
  const testimonialModal = document.querySelector('.action-card-modal');
  if (testimonialModal) {
    const cs = getComputedStyle(testimonialModal);
    results.testimonialModal = {
      transform: cs.transform,
      opacity: cs.opacity,
    };
  }

  return results;
})();
`;

async function measureSite(url, viewport, name) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`${name} - ${viewport.width}x${viewport.height}`);
  console.log('='.repeat(60));

  const browser = await chromium.launch();
  const context = await browser.createContext({
    viewport,
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  try {
    console.log(`Loading ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    
    console.log('Waiting for page to settle...');
    await page.waitForTimeout(2000);

    console.log('Running measurements...');
    const data = await page.evaluate(measurementScript);
    console.log(JSON.stringify(data, null, 2));

    return data;
  } catch (error) {
    console.error(`Error measuring ${name}:`, error.message);
    return null;
  } finally {
    await browser.close();
  }
}

async function main() {
  const results = {};

  // Desktop 1440x900
  results.original_desktop = await measureSite(
    'https://rollups.com/?ref=saaspo.com',
    { width: 1440, height: 900 },
    'ORIGINAL - Desktop'
  );

  results.clone_desktop = await measureSite(
    'http://localhost:5190/',
    { width: 1440, height: 900 },
    'CLONE - Desktop'
  );

  // Mobile 390x900
  results.original_mobile = await measureSite(
    'https://rollups.com/?ref=saaspo.com',
    { width: 390, height: 900 },
    'ORIGINAL - Mobile'
  );

  results.clone_mobile = await measureSite(
    'http://localhost:5190/',
    { width: 390, height: 900 },
    'CLONE - Mobile'
  );

  // Save results to file
  fs.writeFileSync(
    '/private/tmp/claude-504/-Users-riyaghosh-V3-rollups/764bb3f8-dd91-4354-acd5-5a9dbb25aa17/scratchpad/measurements.json',
    JSON.stringify(results, null, 2)
  );
  console.log('\n\nResults saved to measurements.json');
}

main().catch(console.error);
