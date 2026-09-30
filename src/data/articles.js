// Blog data (CLONE_SPEC_CONTENT.md §3.4, §4.7; recon/pages/articles.json).
// Titles, excerpts, meta and every heading are verbatim. `blocks` only records the body SHAPE
// (block type + word counts); the prose itself is placeholder copy generated in components/blog/placeholder.js.
// Block types: p{w,l(links),s(strong),br,bo(bold only)} h2/h3{text} hr hl{h,items} ul/ol/process{items,bold,l,nested}
// quote{w} author{w} bq{w} table{headers,rows,w}. faqStart = index of the first block inside div.faq-section.
export const blogIndexMeta = {
  "metaTitle": "Rollups | Blog | Take Control of Your Equity",
  "metaDescription": "Expert insights on consolidating stakeholders, Roll Up Vehicles®, cap table management, and taking control of your equity."
}

export const articles = [
 {
  "slug": "why-clean-captable-matters",
  "title": "Founder's Guide to Clean Cap Table",
  "excerpt": "A practical guide to keeping your cap table clean, predictable, and investor-ready — and how to use founders SPV structures, like RUVs and CVs, to avoid unnecessary complexity.",
  "date": "November 23, 2025",
  "readingTime": "5 min read",
  "category": "Best Practices",
  "author": "Vish Khamamkar",
  "authorTitle": null,
  "authorImage": "/assets/pages/team-vish.png",
  "cover": "/assets/pages/blog-clean-cap-table.png",
  "metaTitle": "Rollups | Founder's Guide to Clean Cap Table | Rollups Blog",
  "metaDescription": "Your cap table tells a story — to investors, to acquirers, and to your future self. Here’s why early complexity slows founders down in later stages, and the practical ways to avoid it.",
  "faqStart": 50,
  "blocks": [
   {
    "t": "hl",
    "h": "Key Takeaways",
    "items": [
     11,
     10,
     12,
     11,
     9
    ]
   },
   {
    "t": "p",
    "w": 30
   },
   {
    "t": "p",
    "w": 21
   },
   {
    "t": "p",
    "w": 43
   },
   {
    "t": "p",
    "w": 17
   },
   {
    "t": "hr"
   },
   {
    "t": "h2",
    "text": "Cap Tables Don’t Get Messy Overnight"
   },
   {
    "t": "p",
    "w": 3
   },
   {
    "t": "p",
    "w": 27
   },
   {
    "t": "p",
    "w": 27,
    "br": 3
   },
   {
    "t": "p",
    "w": 28
   },
   {
    "t": "hr"
   },
   {
    "t": "h2",
    "text": "Where It Surfaces (Always at the Wrong Time)"
   },
   {
    "t": "h3",
    "text": "Diligence drags"
   },
   {
    "t": "p",
    "w": 29,
    "br": 1
   },
   {
    "t": "h3",
    "text": "Consents stall"
   },
   {
    "t": "p",
    "w": 35,
    "br": 1
   },
   {
    "t": "h3",
    "text": "Legal costs rise quietly"
   },
   {
    "t": "p",
    "w": 22,
    "br": 1
   },
   {
    "t": "h3",
    "text": "Leads get uneasy"
   },
   {
    "t": "p",
    "w": 14
   },
   {
    "t": "p",
    "w": 30,
    "br": 3
   },
   {
    "t": "p",
    "w": 19
   },
   {
    "t": "hr"
   },
   {
    "t": "h2",
    "text": "The Real Issue: Decision Points, Not Investors"
   },
   {
    "t": "p",
    "w": 11,
    "br": 1
   },
   {
    "t": "p",
    "w": 26
   },
   {
    "t": "p",
    "w": 6
   },
   {
    "t": "p",
    "w": 17
   },
   {
    "t": "hr"
   },
   {
    "t": "h2",
    "text": "So How Do Founders Keep Their Cap Table Lightweight"
   },
   {
    "t": "p",
    "w": 16,
    "br": 1
   },
   {
    "t": "ol",
    "items": [
     20,
     26,
     25,
     10
    ]
   },
   {
    "t": "p",
    "w": 24
   },
   {
    "t": "hr"
   },
   {
    "t": "h2",
    "text": "A Quick Health Check for Your Cap Table"
   },
   {
    "t": "p",
    "w": 7
   },
   {
    "t": "ul",
    "items": [
     5,
     10,
     4,
     9,
     9
    ]
   },
   {
    "t": "p",
    "w": 11
   },
   {
    "t": "hr"
   },
   {
    "t": "h2",
    "text": "Clean Cap Tables Create Optionality"
   },
   {
    "t": "p",
    "w": 19
   },
   {
    "t": "p",
    "w": 6
   },
   {
    "t": "ul",
    "items": [
     2,
     3,
     3,
     3,
     9
    ]
   },
   {
    "t": "p",
    "w": 16,
    "br": 1
   },
   {
    "t": "hr"
   },
   {
    "t": "h2",
    "text": "Ready to Keep a Clean Cap Table?"
   },
   {
    "t": "p",
    "w": 24
   },
   {
    "t": "p",
    "w": 25
   },
   {
    "t": "p",
    "w": 16,
    "l": 1,
    "s": 1
   },
   {
    "t": "h2",
    "text": "Frequently Asked Questions"
   },
   {
    "t": "h2",
    "text": "What does a “clean cap table” actually mean?"
   },
   {
    "t": "p",
    "w": 17
   },
   {
    "t": "h2",
    "text": "How many investors is too many?"
   },
   {
    "t": "p",
    "w": 18
   },
   {
    "t": "h2",
    "text": "Do small checks make the cap table messy by default?"
   },
   {
    "t": "p",
    "w": 35
   },
   {
    "t": "h2",
    "text": "When is the right time to think about cap table structure?"
   },
   {
    "t": "p",
    "w": 23
   },
   {
    "t": "h2",
    "text": "How do founders include many angels without cluttering the cap table?"
   },
   {
    "t": "p",
    "w": 19,
    "l": 1
   },
   {
    "t": "h2",
    "text": "Do future VCs or acquirers care about this?"
   },
   {
    "t": "p",
    "w": 16
   },
   {
    "t": "h2",
    "text": "Can existing complexity be fixed?"
   },
   {
    "t": "p",
    "w": 18
   },
   {
    "t": "h2",
    "text": "Are RUVs only for U.S. companies?"
   },
   {
    "t": "p",
    "w": 27
   }
  ]
 },
 {
  "slug": "case-study-mem0-ruv",
  "title": "How Mem0 Used a Roll Up Vehicle to Bring in Strategic Backers Without Losing Focus",
  "excerpt": "How a YC-backed startup brought in 30+ infrastructure leaders as strategic backers using a Roll Up Vehicle, without slowing down their $20M Series A.",
  "date": "October 28, 2025",
  "readingTime": "5 min read",
  "category": "Case Studies",
  "author": "Vish Khamamkar",
  "authorTitle": null,
  "authorImage": "/assets/pages/team-vish.png",
  "cover": "/assets/pages/og-mem0-cover.png",
  "metaTitle": "Rollups | How Mem0 Used a Roll Up Vehicle to Bring in Strategic Backers Without Losing Focus | Rollups Blog",
  "metaDescription": "Learn how AI infrastructure company Mem0 raised $650K from 30+ strategic investors using a Roll Up Vehicle (RUV) during their $20M Series A, turning high-value supporters into a single cap table line without sacrificing time or momentum.",
  "faqStart": 19,
  "blocks": [
   {
    "t": "quote",
    "w": 17
   },
   {
    "t": "author",
    "w": 6
   },
   {
    "t": "hl",
    "h": "Highlights",
    "items": [
     15,
     15,
     8,
     16
    ]
   },
   {
    "t": "h2",
    "text": "Background"
   },
   {
    "t": "p",
    "w": 21,
    "l": 1
   },
   {
    "t": "p",
    "w": 25,
    "l": 2
   },
   {
    "t": "p",
    "w": 46
   },
   {
    "t": "p",
    "w": 25,
    "l": 5
   },
   {
    "t": "p",
    "w": 45,
    "l": 7
   },
   {
    "t": "h2",
    "text": "The Problem: High-Conviction Supporters, But High-Friction Process"
   },
   {
    "t": "p",
    "w": 30
   },
   {
    "t": "p",
    "w": 42
   },
   {
    "t": "p",
    "w": 40
   },
   {
    "t": "h2",
    "text": "The Solution: Consolidated Support Without the Chaos"
   },
   {
    "t": "p",
    "w": 38,
    "l": 1
   },
   {
    "t": "p",
    "w": 31
   },
   {
    "t": "p",
    "w": 42
   },
   {
    "t": "p",
    "w": 35
   },
   {
    "t": "p",
    "w": 36
   },
   {
    "t": "h2",
    "text": "Frequently Asked Questions"
   },
   {
    "t": "h2",
    "text": "What is a Roll Up Vehicle (RUV)?"
   },
   {
    "t": "p",
    "w": 43
   },
   {
    "t": "h2",
    "text": "How long does it take to set up and and close an RUV?"
   },
   {
    "t": "p",
    "w": 50
   },
   {
    "t": "h2",
    "text": "Can I use an RUV alongside institutional investors in my round?"
   },
   {
    "t": "p",
    "w": 48
   },
   {
    "t": "h2",
    "text": "What kind of support can I expect during the RUV process?"
   },
   {
    "t": "p",
    "w": 53
   },
   {
    "t": "h2",
    "text": "What are the main benefits of using an RUV for fundraising?"
   },
   {
    "t": "p",
    "w": 39
   },
   {
    "t": "h2",
    "text": "Can I start an RUV for free?"
   },
   {
    "t": "p",
    "w": 37
   },
   {
    "t": "h2",
    "text": "I want to start my RUV right now. Where do I go?"
   },
   {
    "t": "p",
    "w": 10
   }
  ]
 },
 {
  "slug": "case-study-itemfarm-streamlined-fundraise-ruv",
  "title": "How Itemfarm Used a Roll Up Vehicle to Close Strategic Angels on Short Notice",
  "excerpt": "How a hardtech startup used an RUV to capture a few strategic checks without the administrative headache",
  "date": "October 25, 2025",
  "readingTime": "4 min read",
  "category": "Case Studies",
  "author": "Josh Webster",
  "authorTitle": null,
  "authorImage": "/assets/pages/team-josh.png",
  "cover": "/assets/pages/og-itemfarm-cover-1.png",
  "metaTitle": "Rollups | How Itemfarm Used a Roll Up Vehicle to Close Strategic Angels on Short Notice | Rollups Blog",
  "metaDescription": "Learn why Alder Riley, Co-Founder & CEO of Itemfarm, calls his first AngelList RUV ‘wonderful’—a simple, speedy way to bring strategic investors on board without adding legal friction.",
  "faqStart": 15,
  "blocks": [
   {
    "t": "quote",
    "w": 13
   },
   {
    "t": "author",
    "w": 8
   },
   {
    "t": "hl",
    "h": "Highlights",
    "items": [
     17,
     12,
     5,
     8
    ]
   },
   {
    "t": "h2",
    "text": "Background"
   },
   {
    "t": "p",
    "w": 21,
    "l": 1
   },
   {
    "t": "p",
    "w": 49,
    "l": 1
   },
   {
    "t": "p",
    "w": 25
   },
   {
    "t": "h2",
    "text": "The Problem: Including Strategic Investors Without the Cap Table Mess."
   },
   {
    "t": "p",
    "w": 24
   },
   {
    "t": "p",
    "w": 33
   },
   {
    "t": "h2",
    "text": "The Solution: A Streamlined Fundraise and One Entity on the Cap Table."
   },
   {
    "t": "p",
    "w": 52
   },
   {
    "t": "p",
    "w": 16
   },
   {
    "t": "p",
    "w": 22
   },
   {
    "t": "p",
    "w": 40
   },
   {
    "t": "h2",
    "text": "Frequently Asked Questions"
   },
   {
    "t": "h2",
    "text": "What is a Roll Up Vehicle (RUV)?"
   },
   {
    "t": "p",
    "w": 52
   },
   {
    "t": "h2",
    "text": "How long does it take to set up an RUV?"
   },
   {
    "t": "p",
    "w": 44
   },
   {
    "t": "h2",
    "text": "What are the main benefits of using an RUV for fundraising?"
   },
   {
    "t": "p",
    "w": 40
   },
   {
    "t": "h2",
    "text": "Can I start an RUV for free?"
   },
   {
    "t": "p",
    "w": 37
   },
   {
    "t": "h2",
    "text": "I want to start my RUV right now. Where do I go?"
   },
   {
    "t": "p",
    "w": 10,
    "l": 1
   }
  ]
 },
 {
  "slug": "case-study-heron-power-strategic-investors-ruv",
  "title": "How Heron Power Used a Roll Up Vehicle to Rally Strategic Support Fast",
  "excerpt": "How Heron Power consolidated 30+ strategic investors into a single cap table line using a Roll Up Vehicle, accelerating its $38M Series A.",
  "date": "August 8, 2025",
  "readingTime": "4 min read",
  "category": "Case Studies",
  "author": "Vish Khamamkar",
  "authorTitle": null,
  "authorImage": "/assets/pages/team-vish.png",
  "cover": "/assets/pages/og-heron-power.png",
  "metaTitle": "Rollups | How Heron Power Used a Roll Up Vehicle to Rally Strategic Support Fast | Rollups Blog",
  "metaDescription": "Learn how climate tech startup Heron Power raised over $1M from 30+ strategic angel investors using a Roll Up Vehicle (RUV) during its $38M Series A, eliminating cap table complexity and closing in under a month.",
  "faqStart": 16,
  "blocks": [
   {
    "t": "quote",
    "w": 19
   },
   {
    "t": "author",
    "w": 9
   },
   {
    "t": "hl",
    "h": "Highlights",
    "items": [
     15,
     15,
     10,
     13
    ]
   },
   {
    "t": "h2",
    "text": "Background"
   },
   {
    "t": "p",
    "w": 37,
    "l": 1
   },
   {
    "t": "p",
    "w": 42,
    "l": 1
   },
   {
    "t": "h2",
    "text": "The Problem: Strategic Investors, Major Round, Impossible Timeline"
   },
   {
    "t": "p",
    "w": 25
   },
   {
    "t": "p",
    "w": 46
   },
   {
    "t": "p",
    "w": 18
   },
   {
    "t": "p",
    "w": 20
   },
   {
    "t": "h2",
    "text": "The Solution: One Vehicle, Zero Friction"
   },
   {
    "t": "p",
    "w": 67,
    "l": 1
   },
   {
    "t": "p",
    "w": 36
   },
   {
    "t": "p",
    "w": 46
   },
   {
    "t": "p",
    "w": 65
   },
   {
    "t": "h2",
    "text": "Frequently Asked Questions"
   },
   {
    "t": "h2",
    "text": "What is a Roll Up Vehicle (RUV)?"
   },
   {
    "t": "p",
    "w": 43
   },
   {
    "t": "h2",
    "text": "How long does it take to set up an RUV?"
   },
   {
    "t": "p",
    "w": 34
   },
   {
    "t": "h2",
    "text": "What are the main benefits of using an RUV for fundraising?"
   },
   {
    "t": "p",
    "w": 39
   },
   {
    "t": "h2",
    "text": "Is an RUV appropriate for later-stage (Series A and beyond) rounds?"
   },
   {
    "t": "p",
    "w": 44
   },
   {
    "t": "h2",
    "text": "Can I start an RUV for free?"
   },
   {
    "t": "p",
    "w": 37
   },
   {
    "t": "h2",
    "text": "I want to start my RUV right now. Where do I go?"
   },
   {
    "t": "p",
    "w": 10
   }
  ]
 },
 {
  "slug": "how-ruvs-simplify-fundraising",
  "title": "How Roll Up Vehicles Simplify Fundraising",
  "excerpt": "Raise from many investors. Show one line on your cap table. Zero admin drag.",
  "date": "July 30, 2025",
  "readingTime": "5 min read",
  "category": "Best Practices",
  "author": "Vish Khamamkar",
  "authorTitle": null,
  "authorImage": "/assets/pages/team-vish.png",
  "cover": "/assets/pages/og-ruv-blog-cover.png",
  "metaTitle": "Rollups | How Roll Up Vehicles Simplify Fundraising | Rollups Blog",
  "metaDescription": "Roll Up Vehicles (RUVs) let founders accept capital from dozens of angels, advisors, customers, and friends—while showing just one line on the cap table. Discover how RUVs save time, reduce legal costs, and accelerate closing.",
  "faqStart": 35,
  "blocks": [
   {
    "t": "hl",
    "h": "Highlights",
    "items": [
     17,
     23,
     19,
     10,
     13
    ]
   },
   {
    "t": "p",
    "w": 12
   },
   {
    "t": "p",
    "w": 53,
    "l": 1
   },
   {
    "t": "h2",
    "text": "What is an RUV?"
   },
   {
    "t": "p",
    "w": 38
   },
   {
    "t": "p",
    "w": 23
   },
   {
    "t": "p",
    "w": 64
   },
   {
    "t": "h2",
    "text": "Why Use an RUV?"
   },
   {
    "t": "p",
    "w": 26,
    "s": 1
   },
   {
    "t": "p",
    "w": 26,
    "s": 1
   },
   {
    "t": "p",
    "w": 21,
    "s": 1
   },
   {
    "t": "p",
    "w": 23,
    "s": 1
   },
   {
    "t": "p",
    "w": 18,
    "s": 1
   },
   {
    "t": "p",
    "w": 21,
    "s": 1
   },
   {
    "t": "h2",
    "text": "How Founders & Companies Use RUVs"
   },
   {
    "t": "p",
    "w": 13
   },
   {
    "t": "ul",
    "items": [
     15,
     10,
     10,
     14,
     24
    ],
    "bold": 5
   },
   {
    "t": "h2",
    "text": "Without RUVs: Hidden Costs Add Up"
   },
   {
    "t": "p",
    "w": 6
   },
   {
    "t": "ul",
    "items": [
     10,
     15,
     14
    ],
    "bold": 3
   },
   {
    "t": "p",
    "w": 24
   },
   {
    "t": "h2",
    "text": "Company & Investor Outcomes with RUVs"
   },
   {
    "t": "p",
    "w": 5
   },
   {
    "t": "ul",
    "items": [
     25,
     14,
     12,
     19,
     10
    ]
   },
   {
    "t": "quote",
    "w": 61
   },
   {
    "t": "author",
    "w": 5
   },
   {
    "t": "h2",
    "text": "How RUVs Work with Rollups"
   },
   {
    "t": "p",
    "w": 17
   },
   {
    "t": "p",
    "w": 4
   },
   {
    "t": "process",
    "items": [
     18,
     28,
     25
    ],
    "bold": 3,
    "nested": 3
   },
   {
    "t": "p",
    "w": 15
   },
   {
    "t": "h2",
    "text": "Let’s Simplify Fundraising"
   },
   {
    "t": "p",
    "w": 13
   },
   {
    "t": "p",
    "w": 23
   },
   {
    "t": "p",
    "w": 16,
    "l": 1
   },
   {
    "t": "h2",
    "text": "Frequently Asked Questions"
   },
   {
    "t": "h2",
    "text": "What is a Roll Up Vehicle (RUV)?"
   },
   {
    "t": "p",
    "w": 43
   },
   {
    "t": "h2",
    "text": "How much can an RUV save in administrative costs?"
   },
   {
    "t": "p",
    "w": 19
   },
   {
    "t": "h2",
    "text": "What are the main benefits of using an RUV for fundraising?"
   },
   {
    "t": "p",
    "w": 39
   },
   {
    "t": "h2",
    "text": "How long does it take to set up an RUV?"
   },
   {
    "t": "p",
    "w": 11
   },
   {
    "t": "h2",
    "text": "Which investment instruments are supported?"
   },
   {
    "t": "p",
    "w": 18
   },
   {
    "t": "h2",
    "text": "Is there a limit to how much I can raise from an RUV?"
   },
   {
    "t": "p",
    "w": 33,
    "s": 1
   },
   {
    "t": "h2",
    "text": "Can I start an RUV for free?"
   },
   {
    "t": "p",
    "w": 37
   },
   {
    "t": "h2",
    "text": "I want to start my RUV right now. Where do I go?"
   },
   {
    "t": "p",
    "w": 10
   }
  ]
 },
 {
  "slug": "case-study-cimento-ai-angel-investors-ruv",
  "title": "How Cimento AI Built a Strategic Angel Network with an RUV",
  "excerpt": "How one startup tapped a network of security experts using a Roll Up Vehicle, bypassing traditional investment hurdles.",
  "date": "July 30, 2025",
  "readingTime": "4 min read",
  "category": "Case Studies",
  "author": "Vish Khamamkar",
  "authorTitle": null,
  "authorImage": "/assets/pages/team-vish.png",
  "cover": "/assets/pages/og-cimento-cover-1.png",
  "metaTitle": "Rollups | How Cimento AI Built a Strategic Angel Network with an RUV | Rollups Blog",
  "metaDescription": "Learn how AI security startup Cimento AI raised $150K from 20+ strategic angel investors using a Roll Up Vehicle (RUV), eliminating cap table complexity and administrative overhead in their pre-seed round.",
  "faqStart": 19,
  "blocks": [
   {
    "t": "quote",
    "w": 18
   },
   {
    "t": "author",
    "w": 13
   },
   {
    "t": "hl",
    "h": "Highlights",
    "items": [
     16,
     16,
     11,
     18
    ]
   },
   {
    "t": "h2",
    "text": "Background"
   },
   {
    "t": "p",
    "w": 22,
    "l": 1
   },
   {
    "t": "p",
    "w": 41,
    "l": 1
   },
   {
    "t": "p",
    "w": 17
   },
   {
    "t": "h2",
    "text": "The Problem: Too Many Valuable Connections, Too Much Potential Friction"
   },
   {
    "t": "p",
    "w": 26
   },
   {
    "t": "p",
    "w": 40
   },
   {
    "t": "p",
    "w": 45
   },
   {
    "t": "h2",
    "text": "The Solution: One Link, One Line, Done"
   },
   {
    "t": "p",
    "w": 23
   },
   {
    "t": "p",
    "w": 46,
    "l": 1
   },
   {
    "t": "p",
    "w": 17
   },
   {
    "t": "p",
    "w": 22
   },
   {
    "t": "p",
    "w": 27
   },
   {
    "t": "p",
    "w": 21
   },
   {
    "t": "p",
    "w": 30
   },
   {
    "t": "h2",
    "text": "Frequently Asked Questions"
   },
   {
    "t": "h2",
    "text": "What is a Roll Up Vehicle (RUV)?"
   },
   {
    "t": "p",
    "w": 43
   },
   {
    "t": "h2",
    "text": "How long does it take to set up an RUV?"
   },
   {
    "t": "p",
    "w": 35
   },
   {
    "t": "h2",
    "text": "What are the main benefits of using an RUV for fundraising?"
   },
   {
    "t": "p",
    "w": 39
   },
   {
    "t": "h2",
    "text": "Can I start an RUV for free?"
   },
   {
    "t": "p",
    "w": 37
   },
   {
    "t": "h2",
    "text": "I want to start my RUV right now. Where do I go?"
   },
   {
    "t": "p",
    "w": 10
   }
  ]
 },
 {
  "slug": "announcing-rollups",
  "title": "Announcing Rollups",
  "excerpt": "Rollups offers Roll Up Vehicles and Consolidation Vehicles to help companies take control of their equity.",
  "date": "July 30, 2025",
  "readingTime": "3 min read",
  "category": "Announcements",
  "author": "Rollups Team",
  "authorTitle": "Product Team",
  "authorImage": "/assets/pages/og-homepage.png",
  "cover": "/assets/pages/og-homepage.png",
  "metaTitle": "Rollups | Announcing Rollups | Rollups Blog",
  "metaDescription": "AngelList launches Rollups.com, a dedicated brand for companies offering Roll Up Vehicles and new Consolidation Vehicles. Clear guidance on where founders, investors, and stakeholders should go.",
  "faqStart": 39,
  "blocks": [
   {
    "t": "p",
    "w": 39,
    "l": 1,
    "s": 1
   },
   {
    "t": "h2",
    "text": "The Journey So Far"
   },
   {
    "t": "p",
    "w": 18
   },
   {
    "t": "ul",
    "items": [
     11,
     10,
     8
    ],
    "l": 1
   },
   {
    "t": "p",
    "w": 17
   },
   {
    "t": "h2",
    "text": "What Rollups Offers"
   },
   {
    "t": "p",
    "w": 32
   },
   {
    "t": "h3",
    "text": "Roll Up Vehicles (RUVs) - Now Enhanced"
   },
   {
    "t": "p",
    "w": 22
   },
   {
    "t": "ul",
    "items": [
     10,
     11,
     11,
     16
    ],
    "bold": 4
   },
   {
    "t": "h3",
    "text": "Consolidation Vehicles (CVs) - Brand New"
   },
   {
    "t": "p",
    "w": 21
   },
   {
    "t": "ul",
    "items": [
     10,
     8,
     9
    ],
    "bold": 3
   },
   {
    "t": "h2",
    "text": "Why This Matters"
   },
   {
    "t": "p",
    "w": 38
   },
   {
    "t": "h2",
    "text": "What This Means for You"
   },
   {
    "t": "h3",
    "text": "For Founders and Companies"
   },
   {
    "t": "p",
    "w": 4,
    "l": 1,
    "s": 1
   },
   {
    "t": "p",
    "w": 7
   },
   {
    "t": "ol",
    "items": [
     10,
     19
    ],
    "bold": 2
   },
   {
    "t": "h3",
    "text": "For Investors (GPs, LPs, and Individual Investors)"
   },
   {
    "t": "p",
    "w": 10,
    "l": 1,
    "s": 2
   },
   {
    "t": "p",
    "w": 6
   },
   {
    "t": "ul",
    "items": [
     9,
     7,
     7
    ]
   },
   {
    "t": "h3",
    "text": "For Cap Table Stakeholders and Administrators"
   },
   {
    "t": "p",
    "w": 8,
    "s": 1
   },
   {
    "t": "p",
    "w": 5
   },
   {
    "t": "ul",
    "items": [
     5,
     8
    ],
    "l": 2
   },
   {
    "t": "h3",
    "text": "For GPs/Fund Managers"
   },
   {
    "t": "p",
    "w": 4,
    "l": 1,
    "s": 1
   },
   {
    "t": "p",
    "w": 8
   },
   {
    "t": "h2",
    "text": "Introducing Consolidation Vehicles (CVs)"
   },
   {
    "t": "p",
    "w": 38
   },
   {
    "t": "h2",
    "text": "Powered by AngelList Infrastructure"
   },
   {
    "t": "p",
    "w": 33
   },
   {
    "t": "h2",
    "text": "What's Next"
   },
   {
    "t": "p",
    "w": 36
   },
   {
    "t": "p",
    "w": 2,
    "s": 1,
    "bo": 1
   },
   {
    "t": "ul",
    "items": [
     5,
     6
    ],
    "l": 2
   },
   {
    "t": "h2",
    "text": "Frequently Asked Questions"
   },
   {
    "t": "h2",
    "text": "What is the relationship between Rollups.com and AngelList?"
   },
   {
    "t": "p",
    "w": 29
   },
   {
    "t": "h2",
    "text": "Do I need to create a new account for Rollups?"
   },
   {
    "t": "p",
    "w": 36
   },
   {
    "t": "h2",
    "text": "Where should I go if I'm not sure which platform to use?"
   },
   {
    "t": "ul",
    "items": [
     2,
     2,
     4
    ],
    "bold": 3,
    "l": 3
   }
  ]
 },
 {
  "slug": "case-study-secureframe-maximize-captable-value-ruv",
  "title": "How Secureframe Maximized the Value of Its Cap Table With a Roll Up Vehicle",
  "excerpt": "How Secureframe consolidated 50+ strategic investors into a single line on their cap table, saving over $100k in admin fees with an RUV.",
  "date": "July 12, 2025",
  "readingTime": "5 min read",
  "category": "Case Studies",
  "author": "Vish Khamamkar",
  "authorTitle": null,
  "authorImage": "/assets/pages/team-vish.png",
  "cover": "/assets/pages/og-secureframe-cover.png",
  "metaTitle": "Rollups | How Secureframe Maximized the Value of Its Cap Table With a Roll Up Vehicle | Rollups Blog",
  "metaDescription": "Learn how data security startup Secureframe raised from 50+ world-class operators using a Roll Up Vehicle (RUV), reducing administrative costs from $100k+ to just $8k while simplifying their cap table for their $18M Series A.",
  "faqStart": 25,
  "blocks": [
   {
    "t": "quote",
    "w": 11
   },
   {
    "t": "author",
    "w": 6
   },
   {
    "t": "hl",
    "h": "Highlights",
    "items": [
     15,
     15,
     11,
     20
    ]
   },
   {
    "t": "h2",
    "text": "Background"
   },
   {
    "t": "p",
    "w": 28
   },
   {
    "t": "p",
    "w": 24,
    "l": 1
   },
   {
    "t": "p",
    "w": 35,
    "l": 1
   },
   {
    "t": "h2",
    "text": "The Problem: Raising Money From a Lot of Investors is Expensive and Time Consuming"
   },
   {
    "t": "p",
    "w": 29
   },
   {
    "t": "p",
    "w": 40
   },
   {
    "t": "p",
    "w": 34
   },
   {
    "t": "p",
    "w": 48
   },
   {
    "t": "h2",
    "text": "The Solution: Allow Operators to Invest Through a Single Link Using a Roll Up Vehicle"
   },
   {
    "t": "p",
    "w": 37,
    "l": 1
   },
   {
    "t": "p",
    "w": 40
   },
   {
    "t": "p",
    "w": 46
   },
   {
    "t": "p",
    "w": 33
   },
   {
    "t": "p",
    "w": 28
   },
   {
    "t": "p",
    "w": 73
   },
   {
    "t": "h2",
    "text": "Build With Great Investors Using a Roll Up Vehicle"
   },
   {
    "t": "p",
    "w": 17
   },
   {
    "t": "p",
    "w": 38
   },
   {
    "t": "p",
    "w": 29
   },
   {
    "t": "p",
    "w": 16
   },
   {
    "t": "p",
    "w": 53
   },
   {
    "t": "h2",
    "text": "Frequently Asked Questions"
   },
   {
    "t": "h2",
    "text": "What is a Roll Up Vehicle (RUV)?"
   },
   {
    "t": "p",
    "w": 43
   },
   {
    "t": "h2",
    "text": "How much can an RUV save in administrative costs?"
   },
   {
    "t": "p",
    "w": 35
   },
   {
    "t": "h2",
    "text": "What are the main benefits of using an RUV for fundraising?"
   },
   {
    "t": "p",
    "w": 39
   },
   {
    "t": "h2",
    "text": "Can I start an RUV for free?"
   },
   {
    "t": "p",
    "w": 37
   },
   {
    "t": "h2",
    "text": "I want to start my RUV right now. Where do I go?"
   },
   {
    "t": "p",
    "w": 10
   }
  ]
 },
 {
  "slug": "special-purpose-vehicles-for-startups-guide",
  "title": "Founder's Guide to Special Purpose Vehicles",
  "excerpt": "What founders need to know about Founder SPVs and raising capital from many investors.",
  "date": "January 15, 2024",
  "readingTime": "6 min read",
  "category": "Best Practices",
  "author": "Dan Hightower",
  "authorTitle": "General Manager",
  "authorImage": "/assets/pages/team-dan4.png",
  "cover": "/assets/pages/founderspv.png",
  "metaTitle": "Rollups | Founder's Guide to Special Purpose Vehicles | Rollups Blog",
  "metaDescription": "Discover how startups can run their own SPV to raise capital from multiple investors without GP fees, maintain founder control, and keep cap tables clean. Learn about Roll Up Vehicles (RUVs) - the only SPV/vehicle solution built specifically for companies.",
  "faqStart": 43,
  "blocks": [
   {
    "t": "hl",
    "h": "Key Takeaways",
    "items": [
     14,
     12,
     14
    ]
   },
   {
    "t": "p",
    "w": 38
   },
   {
    "t": "p",
    "w": 41
   },
   {
    "t": "p",
    "w": 12
   },
   {
    "t": "bq",
    "w": 36
   },
   {
    "t": "p",
    "w": 19
   },
   {
    "t": "p",
    "w": 19
   },
   {
    "t": "hr"
   },
   {
    "t": "h2",
    "text": "What Is a Special Purpose Vehicle?"
   },
   {
    "t": "p",
    "w": 19,
    "s": 1
   },
   {
    "t": "ol",
    "items": [
     9,
     9,
     14,
     18,
     17
    ]
   },
   {
    "t": "hr"
   },
   {
    "t": "h2",
    "text": "The Challenges of Taking Direct Investments"
   },
   {
    "t": "p",
    "w": 14
   },
   {
    "t": "ul",
    "items": [
     11,
     10,
     14,
     10,
     12
    ],
    "bold": 5
   },
   {
    "t": "bq",
    "w": 26
   },
   {
    "t": "bq",
    "w": 17
   },
   {
    "t": "p",
    "w": 29
   },
   {
    "t": "hr"
   },
   {
    "t": "h2",
    "text": "Your Options for Investment Vehicles"
   },
   {
    "t": "p",
    "w": 11
   },
   {
    "t": "h3",
    "text": "1. Do nothing (take direct checks, skip the vehicle)"
   },
   {
    "t": "ul",
    "items": [
     10,
     6,
     11,
     7
    ],
    "bold": 4
   },
   {
    "t": "h3",
    "text": "2. Find a VC or 3rd party to create and lead an SPV into your startup"
   },
   {
    "t": "ul",
    "items": [
     19,
     6,
     31,
     24
    ],
    "bold": 4
   },
   {
    "t": "h3",
    "text": "3. Use a vehicle created by a law firm or \"entity-only\" SPV provider"
   },
   {
    "t": "ul",
    "items": [
     20,
     11,
     51,
     12
    ],
    "bold": 4,
    "nested": 1
   },
   {
    "t": "h3",
    "text": "4. Vehicles started and led by the company (such as an RUV)."
   },
   {
    "t": "ul",
    "items": [
     42,
     57,
     6,
     14
    ],
    "bold": 4,
    "nested": 2
   },
   {
    "t": "hr"
   },
   {
    "t": "h2",
    "text": "Cost & Risk: Side-by-Side Comparison"
   },
   {
    "t": "p",
    "w": 9,
    "s": 1
   },
   {
    "t": "table",
    "headers": [
     "Structure",
     "Capital Invested",
     "Capital Reaching Company At Close",
     "Entity Risk for Founder",
     "Long-Term Risks"
    ],
    "rows": 4,
    "w": 105
   },
   {
    "t": "h2",
    "text": "Final Thoughts"
   },
   {
    "t": "p",
    "w": 29
   },
   {
    "t": "p",
    "w": 35
   },
   {
    "t": "ol",
    "items": [
     16,
     15,
     13,
     6
    ]
   },
   {
    "t": "p",
    "w": 7,
    "l": 1
   },
   {
    "t": "bq",
    "w": 33
   },
   {
    "t": "bq",
    "w": 32
   },
   {
    "t": "bq",
    "w": 23
   },
   {
    "t": "bq",
    "w": 32
   },
   {
    "t": "bq",
    "w": 40
   },
   {
    "t": "h2",
    "text": "Ready to Launch Your RUV?"
   },
   {
    "t": "p",
    "w": 24
   },
   {
    "t": "p",
    "w": 3,
    "s": 1,
    "bo": 1
   },
   {
    "t": "ul",
    "items": [
     6,
     6,
     10
    ],
    "l": 1
   },
   {
    "t": "hr"
   },
   {
    "t": "h2",
    "text": "FAQ"
   },
   {
    "t": "h2",
    "text": "What is a Roll Up Vehicle and how does it differ from a traditional SPV?"
   },
   {
    "t": "p",
    "w": 47
   },
   {
    "t": "h2",
    "text": "How much does it cost to set up an RUV for my startup?"
   },
   {
    "t": "p",
    "w": 24
   },
   {
    "t": "h2",
    "text": "What's the minimum and maximum amount I can raise through an RUV?"
   },
   {
    "t": "p",
    "w": 33
   },
   {
    "t": "h2",
    "text": "How long does it take to set up and close an RUV?"
   },
   {
    "t": "p",
    "w": 34
   },
   {
    "t": "h2",
    "text": "Can international companies use RUVs to raise from US investors?"
   },
   {
    "t": "p",
    "w": 25
   },
   {
    "t": "h2",
    "text": "How do investors view RUVs compared to direct investments?"
   },
   {
    "t": "p",
    "w": 56
   }
  ]
 }
]

export const getArticle = (slug) => articles.find((a) => a.slug === slug)
