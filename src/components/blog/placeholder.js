// Neutral placeholder copy for article bodies. The original prose is intentionally not reproduced;
// these helpers produce generic text with the same word counts as the outline in articles.json.

const SENTENCES = [
  'Placeholder copy stands in for the final text of this part of the article.',
  'The finished version will describe the main idea in plain and neutral language.',
  'It outlines the general context before moving on to the practical details.',
  'Specific names, figures and examples are intentionally left out of this draft.',
  'Readers can expect a short overview followed by a few supporting points.',
  'Each point is kept brief so the structure of the page stays easy to follow.',
  'The wording here is generic and only shows the length and rhythm of the section.',
  'Later revisions will replace this paragraph with reviewed editorial content.',
  'The section connects to the surrounding material without repeating it.',
  'A concise summary closes the thought before the next heading begins.',
  'This sample text keeps the layout realistic while the real copy is prepared.',
  'Nothing in this paragraph should be read as advice or as a factual claim.',
]

const LEAD_INS = ['Key point:', 'In short:', 'Overview:', 'Next step:', 'Example:', 'Note:', 'Summary:', 'Detail:']

const LINK_TARGETS = ['/ruv', '/consolidate', '/safe', '/waitlist', '/contact-us', '/how-to-raise-capital']

// Deterministic word source: each article gets its own cursor so text varies block to block.
export function createWriter() {
  let cursor = 0
  let linkCursor = 0
  const words = (n, topic) => {
    const out = []
    if (topic) out.push(...`This part covers \u201C${topic.replace(/[?.:!]+$/, '')}\u201D in general terms.`.split(' '))
    while (out.length < n) {
      out.push(...SENTENCES[cursor % SENTENCES.length].split(' '))
      cursor += 1
    }
    const cut = out.slice(0, Math.max(n, 1))
    cut[cut.length - 1] = cut[cut.length - 1].replace(/[,.:;]+$/, '') + '.'
    return cut
  }
  const text = (n, topic) => words(n, topic).join(' ')
  const leadIn = (i) => LEAD_INS[i % LEAD_INS.length]
  const href = () => LINK_TARGETS[linkCursor++ % LINK_TARGETS.length]
  return { words, text, leadIn, href }
}

// Split a word count into `parts` roughly equal counts.
export function split(total, parts) {
  const base = Math.floor(total / parts)
  return Array.from({ length: parts }, (_, i) => base + (i < total % parts ? 1 : 0)).filter((n) => n > 0)
}
