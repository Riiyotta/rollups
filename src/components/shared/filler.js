// Neutral placeholder prose for answers the spec records only as a word count (the original text is not reproduced).
const WORDS = (
  'This placeholder answer stands in for the original response shown on the reference website. It keeps a comparable length so that line wrapping, spacing and the overall height of this section closely match the measured layout, until the final approved wording for this particular question is supplied by the content team.'
).split(' ')

// shorter average word length, for answers whose original wraps to fewer lines
const SHORT_WORDS = (
  'This is placeholder copy that stands in for the original answer on the live page. It keeps a similar length ' +
  'so that line wrapping and the section height match the measured layout, and the final wording can be supplied ' +
  'later without any change to the structure or styling of this section.'
).split(' ')

export default function filler(n, short = false) {
  const words = short ? SHORT_WORDS : WORDS
  const out = []
  for (let i = 0; i < n; i++) out.push(words[i % words.length])
  return out.join(' ').replace(/[.,]$/, '') + '.'
}
