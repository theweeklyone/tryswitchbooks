// Local service-area landing pages. Switch Books is a free matching service
// with NO office in any town and an anonymous owner, so these are "areas we
// serve" pages, not "we have premises here" pages. The JSON-LD on each page
// uses areaServed only, never a postal address. Each town has genuinely unique,
// locally-accurate copy to stay well clear of thin/doorway-content penalties.

export type LocationFaq = { q: string; a: string };

export type Location = {
  slug: string;
  name: string;
  county: string;
  metaTitle: string;
  metaDescription: string;
  headline: string;
  intro: string;
  localContext: string;
  whyLocal: string;
  nearbyAreas: string[];
  sectors: string[];
  faq: LocationFaq[];
};

export const locations: Location[] = [
  {
    slug: "brighton-and-hove",
    name: "Brighton & Hove",
    county: "City of Brighton & Hove",
    metaTitle: "Accountants in Brighton | Free Local Match | Switch Books",
    metaDescription:
      "Looking for a better accountant in Brighton & Hove? Switch Books matches you with the right local firm for free. Start your free review today.",
    headline: "Find the right accountant in Brighton & Hove",
    intro:
      "Switch Books is a free service that matches Brighton & Hove business owners with a local accountant who actually fits how they work. Tell us about your business and we'll connect you with a firm that suits your needs and your budget.",
    localContext:
      "Brighton & Hove has one of the most varied small-business economies on the south coast, from digital agencies and software studios in the North Laine and around New England House to independent shops on Western Road, restaurants and bars across the city, and the year-round tourism trade along the seafront. Many of these owners are freelancers, contractors or fast-moving creative businesses whose finances do not fit the mould of a traditional high-street firm. Plenty have outgrown an accountant who only files their year-end and never picks up the phone, or who does not understand R&D claims, mixed income streams or seasonal cashflow. When you are billing across projects, dealing with VAT on hospitality, or trying to plan around an irregular income, you need someone who gets that. Switch Books exists because too many city business owners are quietly underserved and unsure where to turn.",
    whyLocal:
      "An accountant who knows Brighton & Hove understands the rhythms of its trade, the seasonal swings in tourism and hospitality, and the way the city's creative and digital firms tend to operate. That local knowledge can make conversations quicker and advice more relevant, and a nearby firm is easy to meet face to face when it matters. That said, plenty of excellent firms now work brilliantly over video and cloud software, so we focus on the right fit first and let you decide how much in-person contact you want.",
    nearbyAreas: ["Hove", "Portslade", "Shoreham-by-Sea", "Lewes", "Saltdean", "Newhaven"],
    sectors: [
      "Digital and creative agencies",
      "Hospitality and restaurants",
      "Independent retail",
      "Tourism and events",
      "Freelancers and contractors",
      "Health and wellbeing",
    ],
    faq: [
      {
        q: "Do you only match Brighton & Hove businesses?",
        a: "No. We match owners right across the city and the surrounding area, including Hove, Portslade and out towards Shoreham and Lewes. If you are based or trading anywhere near Brighton & Hove, we can find you a suitable local firm.",
      },
      {
        q: "What does it cost to use Switch Books?",
        a: "Nothing. Our matching service is completely free to you. You only ever pay the accountant you choose to work with, at the fee you agree directly with them. We are not an accountancy firm and we do not do your accounts ourselves.",
      },
      {
        q: "Can the firm take over from my current accountant?",
        a: "Yes. Switching is routine and the new firm will handle the professional handover with your old accountant for you, including requesting your records. Many Brighton owners come to us simply because their current accountant has stopped being responsive.",
      },
      {
        q: "Can you match me with someone who understands creative or freelance income?",
        a: "That is a big part of what we do here. The city is full of agencies, contractors and project-based businesses, so we can connect you with a firm that is comfortable with mixed income, IR35 questions and irregular cashflow.",
      },
    ],
  },
  {
    slug: "worthing",
    name: "Worthing",
    county: "West Sussex",
    metaTitle: "Accountants in Worthing | Free Local Match | Switch Books",
    metaDescription:
      "Want a better accountant in Worthing? Switch Books matches you with the right local firm, free of charge. Book your free review and get matched today.",
    headline: "Find the right accountant in Worthing",
    intro:
      "Switch Books is a free service that matches Worthing business owners with a local accountant who is genuinely the right fit. Tell us what you need and we'll connect you with a firm that suits your business and your budget.",
    localContext:
      "Worthing has changed a great deal in recent years, with a growing base of professional services, tech and digital firms settling in town alongside its long-standing retail, care and trades businesses. The town centre and Montague Street shops sit next to a rising number of office-based and remote-first companies that have moved out from Brighton and London for the lower costs. Many of these owners are scaling for the first time and need an accountant who can do more than file accounts, someone who can advise on growth, payroll and tax planning. Others run established local trades or care businesses and simply want a firm that is responsive and proactive rather than silent until the deadline. A common story we hear is an owner who has stuck with the same accountant for years out of habit, while quietly feeling they could do better.",
    whyLocal:
      "A Worthing accountant who knows the local economy will understand the mix of newer professional firms and established trades and care businesses, and can be easy to drop in on when you want a face-to-face conversation. Local knowledge also helps with practical things like understanding the typical client base and rates in the area. Many strong firms now also work effectively online, so we put the right match first and leave the choice of how you meet up to you.",
    nearbyAreas: ["Goring-by-Sea", "Durrington", "Ferring", "Lancing", "Findon", "Shoreham-by-Sea"],
    sectors: [
      "Professional and business services",
      "Tech and digital",
      "Retail and hospitality",
      "Care and healthcare",
      "Construction and trades",
      "Property and lettings",
    ],
    faq: [
      {
        q: "Do you only match Worthing businesses?",
        a: "No. We cover the wider area too, including Goring, Durrington, Ferring and Lancing. Wherever you are around Worthing, we can find you a local firm that suits your needs.",
      },
      {
        q: "What does it cost to use Switch Books?",
        a: "It is free. Our matching service costs you nothing, and you only pay the accountant you choose, at the fee you agree with them directly. Switch Books is not an accountancy firm and does not do the work itself.",
      },
      {
        q: "Can the firm take over from my current accountant?",
        a: "Yes, and it is more straightforward than most owners expect. The new firm manages the handover with your previous accountant and requests your records on your behalf. A lot of Worthing owners come to us because they have simply outgrown their old firm.",
      },
      {
        q: "I'm growing for the first time. Can you match me with someone who helps with that?",
        a: "Yes. With so many Worthing businesses scaling up, we can connect you with a firm that does more than compliance and can advise on payroll, tax planning and managing growth sensibly.",
      },
    ],
  },
  {
    slug: "eastbourne",
    name: "Eastbourne",
    county: "East Sussex",
    metaTitle: "Accountants in Eastbourne | Free Local Match | Switch Books",
    metaDescription:
      "Need a better accountant in Eastbourne? Switch Books matches you with the right local firm for free. Start your free review and get matched today.",
    headline: "Find the right accountant in Eastbourne",
    intro:
      "Switch Books is a free service that matches Eastbourne business owners with a local accountant who actually fits how they trade. Tell us about your business and we'll connect you with a firm that suits your needs and your budget.",
    localContext:
      "Eastbourne's economy leans heavily on tourism, hospitality and a large care and retirement sector, with seafront hotels, guest houses and restaurants alongside a substantial number of care homes, domiciliary care providers and health-related businesses. The town centre and the Enterprise Shopping Centre support a steady retail and services trade, while many owners run seasonal businesses where summer income has to carry the quieter months. Care businesses in particular face complex payroll, staffing and compliance demands that need an accountant who understands the sector. A lot of owners here feel their current firm treats them as just another set of year-end accounts, with little advice on cashflow, seasonality or planning. That is exactly the gap Switch Books helps to close.",
    whyLocal:
      "An accountant who knows Eastbourne understands the seasonal nature of its tourism trade and the particular demands of the local care and retirement economy, which makes their advice more practical. A nearby firm is also convenient when you want to sit down together, especially for care businesses dealing with detailed payroll and compliance. At the same time, many capable firms now work well remotely, so we focus on matching you with the right expertise and let you choose how you prefer to meet.",
    nearbyAreas: ["Hailsham", "Polegate", "Pevensey", "Seaford", "Willingdon", "Bexhill-on-Sea"],
    sectors: [
      "Care homes and domiciliary care",
      "Hospitality and hotels",
      "Tourism and leisure",
      "Retail and services",
      "Healthcare",
      "Property and lettings",
    ],
    faq: [
      {
        q: "Do you only match Eastbourne businesses?",
        a: "No. We also cover the surrounding area, including Hailsham, Polegate, Pevensey and Seaford. Wherever you are near Eastbourne, we can match you with a suitable local firm.",
      },
      {
        q: "What does it cost to use Switch Books?",
        a: "Nothing at all. Our matching service is free to you, and you only pay the accountant you go on to choose, at the fee you agree with them. Switch Books is not an accountancy firm and does not do your accounts.",
      },
      {
        q: "Can the firm take over from my current accountant?",
        a: "Yes. The new firm handles the handover with your old accountant and requests your records for you, so there is very little for you to do. Many Eastbourne owners switch simply because their current firm has stopped being proactive.",
      },
      {
        q: "Can you match me with someone who understands care businesses?",
        a: "Yes. The care and retirement sector is a major part of Eastbourne's economy, so we can connect you with a firm that is experienced in care home and domiciliary care payroll, staffing and compliance.",
      },
    ],
  },
  {
    slug: "hastings",
    name: "Hastings",
    county: "East Sussex",
    metaTitle: "Accountants in Hastings | Free Local Match | Switch Books",
    metaDescription:
      "Looking for a better accountant in Hastings? Switch Books matches you with the right local firm, free of charge. Book your free review and get matched.",
    headline: "Find the right accountant in Hastings",
    intro:
      "Switch Books is a free service that matches Hastings business owners with a local accountant who genuinely understands how they work. Tell us what you need and we'll connect you with a firm that fits your business and your budget.",
    localContext:
      "Hastings has a distinctive business mix, with a strong creative and arts community, the working fishing fleet and seafood trade on the Stade, and a busy hospitality and tourism scene around the Old Town and seafront. Years of regeneration have brought new independent businesses, studios and small enterprises into the town, many of them run by sole traders and micro-businesses working on tight margins. These owners often need an accountant who is approachable and good value, not a firm that charges premium fees for impersonal service. Seasonal trade, mixed income from creative work, and the practicalities of running a small seafront or Old Town business all call for advice that fits the reality on the ground. Too many local owners stick with a firm that never really got to know their business.",
    whyLocal:
      "An accountant familiar with Hastings understands its creative economy, its seasonal hospitality trade and the realities of running a small independent business in the town. That makes for advice that is grounded and relevant, and a local firm is easy to pop in to see when you need to. Many good firms also work well over the phone and online now, so we concentrate on finding the right fit and let you decide how much face-to-face contact you want.",
    nearbyAreas: ["St Leonards-on-Sea", "Bexhill-on-Sea", "Rye", "Battle", "Ore", "Westfield"],
    sectors: [
      "Creative arts and studios",
      "Hospitality and tourism",
      "Fishing and seafood trade",
      "Independent retail",
      "Sole traders and micro-businesses",
      "Construction and trades",
    ],
    faq: [
      {
        q: "Do you only match Hastings businesses?",
        a: "No. We cover the wider area as well, including St Leonards, Bexhill, Rye and Battle. Wherever you trade around Hastings, we can find you a local firm that suits you.",
      },
      {
        q: "What does it cost to use Switch Books?",
        a: "It is completely free. Our matching service costs you nothing, and you only pay the accountant you choose, at a fee you agree with them directly. We are not an accountancy firm and we do not do the accounting ourselves.",
      },
      {
        q: "Can the firm take over from my current accountant?",
        a: "Yes, and it is simpler than people think. The new firm arranges the handover with your old accountant and requests your records on your behalf. Plenty of Hastings owners come to us because they want a firm that is better value and more approachable.",
      },
      {
        q: "I'm a sole trader on a tight budget. Can you still help?",
        a: "Absolutely. A lot of Hastings businesses are sole traders and micro-businesses, so we can match you with a firm that offers fair, transparent pricing and is comfortable working with smaller clients.",
      },
    ],
  },
  {
    slug: "crawley",
    name: "Crawley",
    county: "West Sussex",
    metaTitle: "Accountants in Crawley | Free Local Match | Switch Books",
    metaDescription:
      "Want a better accountant in Crawley? Switch Books matches you with the right local firm for free. Start your free review and get matched today.",
    headline: "Find the right accountant in Crawley",
    intro:
      "Switch Books is a free service that matches Crawley business owners with a local accountant who fits how they operate. Tell us about your business and we'll connect you with a firm that suits your needs and your budget.",
    localContext:
      "Crawley's economy is shaped by its proximity to Gatwick Airport, with a large concentration of logistics, aviation services, engineering and import and export businesses, many of them based around the Manor Royal business district. Manor Royal alone is home to hundreds of firms spanning manufacturing, distribution, professional services and tech, and the town has a steady supply of growing companies dealing with payroll, multiple sites and international trade. These owners often need an accountant who understands VAT on cross-border work, larger payrolls and the demands of a business that is scaling. Many feel their current firm is fine for the basics but cannot keep pace as they grow, or never offers proactive advice. With so much business activity in one place, the right accountant can make a real difference to how a Crawley company plans and performs.",
    whyLocal:
      "An accountant who knows Crawley understands the Gatwick-driven economy, the businesses on Manor Royal and the issues that come with logistics, engineering and trading internationally. That makes their advice more useful, and a local firm is convenient for in-person meetings when you are managing a busy operation. Many capable firms also work effectively online and across cloud systems now, so we focus on the right fit first and leave it to you to decide how you want to work together.",
    nearbyAreas: ["Horley", "Horsham", "Three Bridges", "Ifield", "Gatwick", "East Grinstead"],
    sectors: [
      "Logistics and distribution",
      "Aviation and airport services",
      "Engineering and manufacturing",
      "Import and export",
      "Professional and business services",
      "Construction and trades",
    ],
    faq: [
      {
        q: "Do you only match Crawley businesses?",
        a: "No. We also cover the surrounding area, including Horley, Horsham, Three Bridges and out towards Gatwick. Wherever you are based near Crawley, we can match you with a suitable local firm.",
      },
      {
        q: "What does it cost to use Switch Books?",
        a: "Nothing. Our matching service is free to you, and you only pay the accountant you choose to work with, at the fee you agree directly with them. Switch Books is not an accountancy firm and does not do your accounts.",
      },
      {
        q: "Can the firm take over from my current accountant?",
        a: "Yes. The new firm manages the handover with your previous accountant and requests your records for you. Many Crawley owners switch because their business has grown and their old firm can no longer keep up.",
      },
      {
        q: "Can you match me with someone who understands logistics or international trade?",
        a: "Yes. Given Crawley's links to Gatwick and Manor Royal, we can connect you with a firm that is experienced in cross-border VAT, larger payrolls and the needs of logistics and trading businesses.",
      },
    ],
  },
  {
    slug: "chichester",
    name: "Chichester",
    county: "West Sussex",
    metaTitle: "Accountants in Chichester | Free Local Match | Switch Books",
    metaDescription:
      "Looking for a better accountant in Chichester? Switch Books matches you with the right local firm for free. Book your no-obligation review today.",
    headline: "Find the right accountant in Chichester",
    intro:
      "Switch Books is a free service that matches Chichester business owners with a local accounting firm that genuinely fits their needs and budget. We are not accountants, we simply connect you with the right one.",
    localContext:
      "Chichester's economy runs on more than its cathedral and Festival Theatre crowds. The city supports a steady mix of tourism and hospitality, professional services around East Street and the city centre, and a strong agricultural and horticultural base across the surrounding plain. The harbour at Chichester and Itchenor brings marine trades, boatyards and seasonal leisure businesses, while Goodwood draws events, motorsport and equestrian spending that ripples through local suppliers. Owners here often outgrow a one-size-fits-all accountant who treats a harbourside charter business the same as a city-centre consultancy, and they start looking for someone who understands seasonal cash flow and rural property.",
    whyLocal:
      "An accountant who already knows Chichester understands the rhythm of a tourism and harbour economy, the quirks of agricultural and equestrian businesses, and how local commercial property and seasonal trade affect your numbers. That local grounding tends to mean quicker, more relevant advice and fewer things explained from scratch. We will be honest though: a good firm can work perfectly well remotely, so if the best fit for you happens to be a little further out, we will still put them forward.",
    nearbyAreas: ["Bognor Regis", "Bosham", "Selsey", "Midhurst", "Petersfield", "Emsworth"],
    sectors: [
      "Tourism and hospitality",
      "Agriculture and horticulture",
      "Marine and boatyards",
      "Professional services",
      "Retail",
      "Events and leisure",
    ],
    faq: [
      {
        q: "Can you match me with an accountant who understands seasonal tourism businesses in Chichester?",
        a: "Yes. A lot of Chichester trade is seasonal, from harbour charters to city-centre hospitality, so we prioritise firms that are used to managing uneven cash flow and quieter winter months when we match you.",
      },
      {
        q: "I run an agricultural or equestrian business near Goodwood. Will the firm get it?",
        a: "We can match you with a local accountant who regularly works with farms, smallholdings and equestrian operations around the Chichester plain and Goodwood, including the specific tax and land considerations that come with them.",
      },
      {
        q: "Does Switch Books charge for the introduction?",
        a: "No. The matching service and your initial review are completely free. You only ever pay the accountant you choose to work with, on terms agreed directly with them.",
      },
      {
        q: "What if the best firm is in Bognor or Midhurst rather than Chichester itself?",
        a: "That is fine. We focus on the right fit, not just the nearest postcode. If a firm in a neighbouring area suits your business better, we will explain why and let you decide.",
      },
    ],
  },
  {
    slug: "lewes",
    name: "Lewes",
    county: "East Sussex",
    metaTitle: "Accountants in Lewes | Free Local Match | Switch Books",
    metaDescription:
      "Want a better accountant in Lewes? Switch Books matches you with the right local firm for free. Book your no-obligation review and switch with confidence.",
    headline: "Find the right accountant in Lewes",
    intro:
      "Switch Books is a free service that matches Lewes business owners with a local accounting firm that actually suits how they work. We are not accountants ourselves, we just connect you with the right one.",
    localContext:
      "Lewes has a business character all of its own, built around independent retailers along the High Street and Cliffe, a strong creative and professional community, and long-standing names like Harveys brewery. The town leans heavily on small and micro-businesses, sole traders, makers, designers and consultants who value doing things their own way. That independence is part of the appeal, but it can leave owners with an accountant who never quite engages with how a small creative or retail business really runs. Many start looking for someone who can talk plainly about the things that matter to a one-person studio or a family-run shop rather than a faceless corporate client.",
    whyLocal:
      "A Lewes accountant who knows the High Street and the local independent scene understands the realities of seasonal footfall, event-driven trade and the margins of small retail and creative work. That familiarity usually means advice that fits your actual business instead of generic templates. We are upfront that plenty of excellent firms work well remotely, so if the strongest match for you is based slightly outside Lewes, we will still recommend them.",
    nearbyAreas: ["Ringmer", "Newhaven", "Seaford", "Uckfield", "Brighton", "Peacehaven"],
    sectors: [
      "Independent retail",
      "Creative and design",
      "Brewing and food and drink",
      "Professional services",
      "Hospitality",
      "Sole traders and micro-businesses",
    ],
    faq: [
      {
        q: "I run a small independent shop in Lewes. Can you match me with someone who gets that?",
        a: "Yes. Independent retail is at the heart of Lewes, so we look for firms that understand small-shop margins, stock, seasonal trade and the day-to-day reality of running a High Street or Cliffe business.",
      },
      {
        q: "I am a sole trader or creative freelancer. Is this service worth it for me?",
        a: "Very much so. A lot of Lewes business is one-person studios, makers and consultants, and we match you with accountants who are comfortable working with sole traders rather than only larger companies.",
      },
      {
        q: "How much does the matching service cost?",
        a: "Nothing. The introduction and your first review are free. You only pay the accountant you decide to go with, at rates you agree with them directly.",
      },
      {
        q: "My current accountant is fine but distant. Should I still get matched?",
        a: "If they are not engaging with how your business actually works, it is worth seeing what a better-matched local firm could offer. The review is free and there is no obligation to switch.",
      },
    ],
  },
  {
    slug: "bognor-regis",
    name: "Bognor Regis",
    county: "West Sussex",
    metaTitle: "Accountants in Bognor Regis | Free Local Match | Switch Books",
    metaDescription:
      "Searching for a better accountant in Bognor Regis? Switch Books matches you with the right local firm for free. Book your no-obligation review today.",
    headline: "Find the right accountant in Bognor Regis",
    intro:
      "Switch Books is a free service that matches Bognor Regis business owners with a local accounting firm that fits their trade and their budget. We are not accountants, we simply put you in touch with the right one.",
    localContext:
      "Bognor Regis is a seaside town where the economy leans strongly on tourism, hospitality and leisure, with Butlin's anchoring a large share of seasonal visitor spending. Cafes, guesthouses, holiday lets and retail along the seafront and town centre all feel the swing between a busy summer and a quieter winter. There is also a steady base of trades, care services and small businesses serving the resident population year round. Owners here often find their current accountant does not really account for the seasonality, and they look for someone who can help them plan cash flow across the peaks and troughs rather than just file accounts once a year.",
    whyLocal:
      "An accountant who knows Bognor understands a leisure and tourism economy that surges in summer and slows in winter, and the cash flow planning that goes with it. That local insight tends to mean more practical advice for guesthouses, seafront retail and seasonal trades. We will always be honest that a strong firm can support you remotely too, so if the best match sits a little outside the town, we will still recommend them.",
    nearbyAreas: ["Chichester", "Littlehampton", "Felpham", "Aldwick", "Pagham", "Arundel"],
    sectors: [
      "Tourism and leisure",
      "Hospitality and guesthouses",
      "Seafront retail",
      "Holiday lets",
      "Trades and construction",
      "Care services",
    ],
    faq: [
      {
        q: "My business is busy in summer and quiet in winter. Can you match me accordingly?",
        a: "Yes. Seasonality defines a lot of Bognor trade, so we prioritise firms that understand managing cash flow across a strong summer and a slower winter, including holiday lets and seafront hospitality.",
      },
      {
        q: "I run a guesthouse or holiday let. Will the accountant understand the tax side?",
        a: "We can match you with a local firm that regularly handles guesthouses, B&Bs and furnished holiday lets, including the specific allowances and reporting that come with them.",
      },
      {
        q: "Is there any cost to using Switch Books?",
        a: "No. The matching service and your initial review are free. You only ever pay the accountant you choose to work with, on terms agreed directly between you.",
      },
      {
        q: "What if I also serve year-round customers, not just tourists?",
        a: "That is common in Bognor, with plenty of trades and care services working for residents all year. We factor in your full mix of work so the firm we match you with suits the whole business, not just the summer.",
      },
    ],
  },
  {
    slug: "horsham",
    name: "Horsham",
    county: "West Sussex",
    metaTitle: "Accountants in Horsham | Free Local Match | Switch Books",
    metaDescription:
      "Looking for a better accountant in Horsham? Switch Books matches you with the right local firm for free. Book your no-obligation review with no pressure.",
    headline: "Find the right accountant in Horsham",
    intro:
      "Switch Books is a free service that matches Horsham business owners with a local accounting firm that genuinely suits them. We are not accountants, we just connect you with the right one for your business.",
    localContext:
      "Horsham is an affluent market town with a large commuter base and a deep pool of professional services, consultants and growing limited companies. Alongside the office-based economy there is established manufacturing and engineering on the edges of town, plus major employers such as the RSPCA national headquarters that support a wider network of local suppliers. The Carfax and town centre keep a busy independent retail and hospitality scene running too. With so many directors and ambitious small companies based here, owners often want more than basic compliance, and they look for an accountant who can offer proper tax planning and growth advice rather than just year-end accounts.",
    whyLocal:
      "A Horsham accountant who knows the town understands its mix of commuter-owned limited companies, professional service firms and local manufacturers, and the kind of proactive tax and growth advice those owners expect. That familiarity often means a sharper, more strategic relationship. We are honest that many excellent firms work very effectively remotely, so if your best match is based just outside Horsham, we will still put them forward.",
    nearbyAreas: ["Crawley", "Billingshurst", "Southwater", "Storrington", "Cranleigh", "Pulborough"],
    sectors: [
      "Professional services",
      "Limited companies and contractors",
      "Manufacturing and engineering",
      "Retail and hospitality",
      "Construction and trades",
      "Technology and consulting",
    ],
    faq: [
      {
        q: "I run a limited company and want real tax planning, not just compliance. Can you help?",
        a: "Yes. Many Horsham owners are company directors who want proactive advice, so we match you with firms that go beyond filing accounts and actively help with tax planning and profit extraction.",
      },
      {
        q: "I commute to London but my company is based in Horsham. Does that matter?",
        a: "Not at all. A lot of Horsham directors work away during the week, so we match you with firms that are easy to deal with around your schedule, in person or remotely, whichever suits you.",
      },
      {
        q: "Do you charge for the introduction?",
        a: "No. The matching service and your first review are completely free. You only pay the accountant you decide to work with, at rates agreed directly with them.",
      },
      {
        q: "I run a manufacturing or engineering business near Horsham. Will the firm understand it?",
        a: "We can match you with a local accountant experienced in manufacturing and engineering, including stock, equipment and the R&D and capital allowances that often apply.",
      },
    ],
  },
  {
    slug: "burgess-hill",
    name: "Burgess Hill",
    county: "West Sussex",
    metaTitle: "Accountants in Burgess Hill | Free Local Match | Switch Books",
    metaDescription:
      "Want a better accountant in Burgess Hill? Switch Books matches you with the right local firm for free. Book your no-obligation review today.",
    headline: "Find the right accountant in Burgess Hill",
    intro:
      "Switch Books is a free service that matches Burgess Hill business owners with a local accounting firm that fits their operation and budget. We are not accountants ourselves, we just connect you with the right one.",
    localContext:
      "Burgess Hill has a notably industrial and commercial character for its size, with established industrial estates such as Victoria and Sheddingdean hosting manufacturing, distribution and trade suppliers. The Burgess Hill Science and Technology Park has added a layer of innovation and growing firms to the mix, sitting alongside the warehousing and logistics businesses that use the town's strong road and rail links. There is also a solid base of construction firms, trades and town-centre services supporting a growing residential population. Owners of these businesses often deal with stock, plant and payroll complexity that a generalist accountant skims over, so they look for someone who really understands manufacturing, distribution and how their commercial costs work.",
    whyLocal:
      "An accountant familiar with Burgess Hill understands its industrial estates, distribution operators and the technology firms on the Science and Technology Park, along with the stock, payroll and capital costs those businesses carry. That local knowledge usually means more relevant, practical advice. We will be straight with you though: a capable firm can support you remotely just as well, so if the best match is slightly outside town, we will still recommend them.",
    nearbyAreas: ["Haywards Heath", "Hassocks", "Wivelsfield", "Ditchling", "Hurstpierpoint", "Cuckfield"],
    sectors: [
      "Manufacturing",
      "Distribution and logistics",
      "Technology and innovation",
      "Construction and trades",
      "Wholesale and trade supply",
      "Professional and town-centre services",
    ],
    faq: [
      {
        q: "My business is on one of the Burgess Hill industrial estates. Can you match me with the right firm?",
        a: "Yes. The Victoria and Sheddingdean estates are full of manufacturers and distributors, so we prioritise accountants who understand stock, plant, payroll and the cost structures those businesses run on.",
      },
      {
        q: "I am a growing firm on the Science and Technology Park. Will the accountant keep up?",
        a: "We can match you with a local firm experienced with growing and technology-led businesses, including funding, R&D claims and the planning that comes with scaling up.",
      },
      {
        q: "Is the matching service really free?",
        a: "Yes. Both the introduction and your initial review cost nothing. You only ever pay the accountant you choose to work with, on terms you agree directly with them.",
      },
      {
        q: "I run a distribution or logistics business. Does the firm need to understand that?",
        a: "It helps a lot. Burgess Hill's road and rail links support a real distribution sector, so we match you with accountants who understand logistics margins, fleet costs and cross-border VAT where it applies.",
      },
    ],
  },
  {
    slug: "littlehampton",
    name: "Littlehampton",
    county: "West Sussex",
    metaTitle: "Accountants in Littlehampton | Free Match | Switch Books",
    metaDescription:
      "Find the right accountant in Littlehampton. Switch Books matches you with a trusted local firm that fits your needs and budget, for free. Get your free review today.",
    headline: "Find the right accountant in Littlehampton",
    intro:
      "Switch Books is a free service that matches Littlehampton business owners with a local accountant who actually fits how they trade. Tell us about your business and we will connect you with the right firm.",
    localContext:
      "Littlehampton runs on a mix of seaside tourism, a working harbour and marina, and a riverside and seafront retail and hospitality trade that swings hard with the seasons. There is also a base of light manufacturing and the holiday parks along the coast, which bring their own VAT, payroll and cash flow quirks. Owners here often start out with an accountant who treats them like a flat year-round business and misses how much a summer peak and a quiet winter change the picture. When the numbers stop matching the reality of the trading year, that is usually the point owners decide to look for someone who gets it. We match you with a Littlehampton accountant who has seen those patterns before.",
    whyLocal:
      "An accountant who knows Littlehampton understands seasonal cash flow, holiday-let and furnished-letting rules, and the rhythm of a coastal hospitality trade, so you spend less time explaining the basics. They are also closer to the local picture if you ever want to meet face to face. Plenty of good firms work perfectly well remotely too, so we focus on the right fit first and the location second.",
    nearbyAreas: ["Rustington", "East Preston", "Angmering", "Wick", "Arundel", "Ferring"],
    sectors: [
      "Hospitality and seasonal tourism",
      "Retail",
      "Marina and marine trades",
      "Light manufacturing",
      "Holiday parks and furnished lettings",
      "Construction and trades",
    ],
    faq: [
      {
        q: "Can you match me with an accountant who understands seasonal tourism businesses in Littlehampton?",
        a: "Yes. A lot of Littlehampton trade is built around the summer season, the seafront and the holiday parks, so we look for firms used to managing cash flow across busy and quiet months and handling the VAT and payroll that comes with seasonal staff.",
      },
      {
        q: "Do you cover holiday lets and furnished lettings near the seafront?",
        a: "We do. Furnished holiday lets and short-term lettings around Littlehampton have their own tax treatment, and we can connect you with a local firm that handles them regularly rather than one figuring it out as they go.",
      },
      {
        q: "Is the Switch Books matching service really free for Littlehampton owners?",
        a: "Yes, our matching service is completely free to you. We are not an accountancy firm and we do not do your accounts, we simply find you a trusted local firm that fits your needs and budget.",
      },
    ],
  },
  {
    slug: "haywards-heath",
    name: "Haywards Heath",
    county: "West Sussex",
    metaTitle: "Accountants in Haywards Heath | Free Match | Switch Books",
    metaDescription:
      "Find the right accountant in Haywards Heath. Switch Books matches you with a trusted local firm that fits your needs and budget, for free. Book your free review now.",
    headline: "Find the right accountant in Haywards Heath",
    intro:
      "Switch Books is a free service that matches Haywards Heath business owners with a local accountant who suits how they work. Tell us what you need and we will connect you with the right firm.",
    localContext:
      "Haywards Heath is an affluent mid-Sussex commuter town with a strong professional and financial services base, a busy retail trade and a steady stream of growing limited companies. Many owners here are directors of small but serious businesses, often with personal tax, dividends and a fast main line into London to factor in. The risk is outgrowing an accountant who was fine when you were a sole trader but is now slow to advise on remuneration, planning or company structure. When you feel like you are the one chasing answers, it is usually time for a better match. We match you with a Haywards Heath accountant who can keep pace with a company that is actually moving.",
    whyLocal:
      "An accountant who knows Haywards Heath is used to director-led limited companies, dividend and salary planning, and clients who commute and value their time. They understand the local professional scene and can meet when it matters. Good firms also work well remotely, so we put the right expertise and fit ahead of being on the same street.",
    nearbyAreas: ["Lindfield", "Burgess Hill", "Cuckfield", "Scaynes Hill", "Ardingly", "Wivelsfield"],
    sectors: [
      "Professional services",
      "Financial services",
      "Retail",
      "Limited companies and contractors",
      "Property and construction",
      "Creative and consultancy",
    ],
    faq: [
      {
        q: "I run a growing limited company in Haywards Heath. Can you match me with the right accountant?",
        a: "Yes. Haywards Heath has a lot of director-led companies, and we look for firms that go beyond filing to advise on salary and dividend planning, company structure and tax as you grow, rather than just keeping you compliant.",
      },
      {
        q: "I commute to London but want a local accountant. Does that work?",
        a: "It does. Many Haywards Heath owners commute and want someone nearby for the occasional meeting but flexible enough to handle most things by email, call or video. We match you on both fit and how you prefer to work.",
      },
      {
        q: "What does the Switch Books service cost?",
        a: "Nothing to you. We are a free matching service, not an accountancy firm, so we simply introduce you to a trusted local firm in the Haywards Heath area that fits your needs and budget.",
      },
    ],
  },
  {
    slug: "shoreham-by-sea",
    name: "Shoreham-by-Sea",
    county: "West Sussex",
    metaTitle: "Accountants in Shoreham-by-Sea | Free Match | Switch Books",
    metaDescription:
      "Find the right accountant in Shoreham-by-Sea. Switch Books matches you with a trusted local firm that fits your needs and budget, for free. Get your free review.",
    headline: "Find the right accountant in Shoreham-by-Sea",
    intro:
      "Switch Books is a free service that matches Shoreham-by-Sea business owners with a local accountant who understands the area's trades. Tell us about your business and we will connect you with the right firm.",
    localContext:
      "Shoreham-by-Sea has an unusually varied business base for its size, from the Port of Shoreham and the harbour and houseboat community to Brighton City Airport, marine trades and a strong run of creative and engineering businesses. With names like Ricardo in the area alongside light industry, there is real depth in technical and project-based work that needs careful accounting. Owners here can feel boxed in by an accountant who only does straightforward bookkeeping and cannot handle R&D, project costing or the mix of contracts a marine or engineering firm carries. When your accounts do not reflect how technical your work really is, it is worth looking again. We match you with a Shoreham accountant who can deal with that complexity.",
    whyLocal:
      "An accountant who knows Shoreham understands marine and harbour trades, engineering and creative businesses, and the practicalities of project-based and contract work. Being local helps when you want to talk things through in person near the port or airport. Many strong firms also work remotely, so we lead with the right specialism and fit rather than distance alone.",
    nearbyAreas: ["Southwick", "Lancing", "Portslade", "Steyning", "Upper Beeding", "Sompting"],
    sectors: [
      "Marine and harbour trades",
      "Engineering",
      "Creative and media",
      "Aviation and airport businesses",
      "Light industry and manufacturing",
      "Construction and trades",
    ],
    faq: [
      {
        q: "Can you match me with an accountant who understands marine and harbour businesses in Shoreham?",
        a: "Yes. The Port of Shoreham, the harbour and the houseboat community support a lot of marine trades, and we look for firms that understand contract work, asset-heavy businesses and the cash flow that comes with them.",
      },
      {
        q: "My engineering firm does technical and R&D work. Can you find an accountant who handles that?",
        a: "We can. Shoreham has real engineering and technical depth, so we match you with firms comfortable with project costing and R&D tax relief rather than ones that only handle basic bookkeeping.",
      },
      {
        q: "I run a creative business near Shoreham. Will the matching service suit me?",
        a: "Yes. There is a strong creative and media scene around Shoreham, and we connect you with a local firm used to freelancers, studios and project-based income, matched to your size and budget.",
      },
    ],
  },
  {
    slug: "newhaven",
    name: "Newhaven",
    county: "East Sussex",
    metaTitle: "Accountants in Newhaven | Free Match | Switch Books",
    metaDescription:
      "Find the right accountant in Newhaven. Switch Books matches you with a trusted local firm that fits your needs and budget, for free. Book your free review today.",
    headline: "Find the right accountant in Newhaven",
    intro:
      "Switch Books is a free service that matches Newhaven business owners with a local accountant who understands a working port town. Tell us what you need and we will connect you with the right firm.",
    localContext:
      "Newhaven is a working port with a ferry link to Dieppe, an Enterprise Zone and industrial estate, and a base of manufacturing, marine and logistics businesses alongside a long-standing fishing trade. That means cross-border movement, import and export VAT, and the kind of operations and stock that need an accountant who is comfortable with more than a simple set of books. Owners on the industrial estate or in logistics can quickly outgrow an accountant who has never dealt with customs, EORI numbers or international invoicing. When questions about VAT on imports get vague answers, it is time for a firm that knows this ground. We match you with a Newhaven accountant who understands port-town trade.",
    whyLocal:
      "An accountant who knows Newhaven is used to port, logistics and manufacturing businesses, Enterprise Zone incentives, and the import and export side that comes with a ferry port. Being local makes it easier to sit down together when an operation gets complicated. Plenty of capable firms also work remotely, so we focus on the right experience and fit ahead of postcode.",
    nearbyAreas: ["Seaford", "Peacehaven", "Denton", "Bishopstone", "South Heighton", "Telscombe"],
    sectors: [
      "Port and logistics",
      "Manufacturing",
      "Marine and fishing",
      "Import and export",
      "Light industry",
      "Construction and trades",
    ],
    faq: [
      {
        q: "Can you match me with an accountant who understands import and export through Newhaven?",
        a: "Yes. With the ferry to Dieppe and a working port, plenty of Newhaven businesses deal with cross-border trade, so we look for firms that understand import and export VAT, customs and international invoicing.",
      },
      {
        q: "I'm based on the Enterprise Zone or industrial estate. Can you help?",
        a: "We can. Manufacturing, logistics and marine businesses around the Newhaven Enterprise Zone have specific needs, and we match you with a local firm used to that kind of operation rather than office-only clients.",
      },
      {
        q: "Is the Switch Books matching service free in Newhaven?",
        a: "Yes. We are a free matching service, not an accountancy firm. We simply introduce you to a trusted local firm that fits your needs and budget, at no cost to you.",
      },
    ],
  },
  {
    slug: "east-grinstead",
    name: "East Grinstead",
    county: "West Sussex",
    metaTitle: "Accountants in East Grinstead | Free Match | Switch Books",
    metaDescription:
      "Find the right accountant in East Grinstead. Switch Books matches you with a trusted local firm that fits your needs and budget, for free. Get your free review.",
    headline: "Find the right accountant in East Grinstead",
    intro:
      "Switch Books is a free service that matches East Grinstead business owners with a local accountant who fits how they run things. Tell us about your business and we will connect you with the right firm.",
    localContext:
      "East Grinstead has a deep professional services base, a healthcare cluster around the Queen Victoria Hospital, a busy High Street retail trade and a good number of commuter-owned companies and light industry. Many owners here are skilled professionals, consultants or directors running tidy but ambitious businesses that need proper advice rather than just year-end filing. The common frustration is an accountant who never picks up the phone first and only does the minimum, leaving owners unsure whether they are paying too much tax or missing opportunities. When your accountant only appears at the deadline, a better match is overdue. We connect you with an East Grinstead accountant who works with you through the year.",
    whyLocal:
      "An accountant who knows East Grinstead understands its professional and healthcare-linked businesses, commuter-run companies and High Street retailers, so the advice fits the local reality. Being nearby helps when you want a proper conversation rather than another email. Many good firms also work remotely, so we match on expertise and fit first and location second.",
    nearbyAreas: ["Forest Row", "Lingfield", "Felbridge", "Crawley Down", "Ashurst Wood", "Dormansland"],
    sectors: [
      "Professional services",
      "Healthcare and clinics",
      "Retail",
      "Limited companies and contractors",
      "Light industry",
      "Consultancy",
    ],
    faq: [
      {
        q: "I run a professional services firm in East Grinstead. Can you find me a better accountant?",
        a: "Yes. East Grinstead has a strong professional base, and we look for firms that give proactive advice on tax, planning and structure through the year rather than only filing accounts at the deadline.",
      },
      {
        q: "Do you work with healthcare and clinic businesses near the Queen Victoria Hospital?",
        a: "We do. There is a real healthcare cluster around East Grinstead, and we can match you with a local firm used to clinics, practitioners and the mix of employment and self-employment that often comes with it.",
      },
      {
        q: "What does it cost to use Switch Books in East Grinstead?",
        a: "Nothing to you. We are a free matching service, not an accountancy firm, so we simply introduce you to a trusted local firm that fits your needs and budget.",
      },
    ],
  },
  {
    slug: "bexhill-on-sea",
    name: "Bexhill-on-Sea",
    county: "East Sussex",
    metaTitle: "Accountants in Bexhill-on-Sea | Free Match | Switch Books",
    metaDescription:
      "Switch Books matches Bexhill-on-Sea business owners with the right local accountant, for free. Get a free review and find a firm that actually fits you.",
    headline: "Find the right accountant in Bexhill-on-Sea",
    intro:
      "Switch Books is a free service that matches Bexhill-on-Sea business owners with a local accountant who suits their work and their budget. We are not an accountancy firm, we connect you with one that fits.",
    localContext:
      "Bexhill-on-Sea has a business base built heavily around its retirement and care economy, with care homes, domiciliary care providers and the many small services that support an older population. Tourism and hospitality matter too, helped by the De La Warr Pavilion drawing visitors to the seafront, alongside a steady run of independent retailers along the town's high streets. Owners here often run lean, seasonal or care-sector businesses where cash flow timing and payroll really matter. When an accountant treats them as just another file and goes quiet for months, it tends to show, and that is usually when people start looking for someone better matched to how they actually trade.",
    whyLocal:
      "An accountant who knows Bexhill understands the rhythms of a care and hospitality town, from seasonal trade to the payroll demands of a care home rota. Being matched with someone local can also make it easier to meet in person when you want to, and to get advice that reflects how businesses around Rother actually operate. Plenty of good firms work perfectly well remotely, so we focus on the right fit first and let you decide how close you want them to be.",
    nearbyAreas: ["Hastings", "St Leonards-on-Sea", "Battle", "Cooden", "Little Common", "Ninfield"],
    sectors: [
      "Care homes and domiciliary care",
      "Hospitality and tourism",
      "Independent retail",
      "Trades and construction",
      "Health and wellbeing services",
      "Property and lettings",
    ],
    faq: [
      {
        q: "Can you match me with an accountant who understands Bexhill's care sector?",
        a: "Yes. The care and domiciliary economy is a big part of Bexhill, so we can match you with a firm that already handles care-home payroll, rota-driven wages and the reporting that comes with it, rather than one learning it on your time.",
      },
      {
        q: "I run a seasonal seafront business. Will that be a problem?",
        a: "Not at all. We can connect you with a Bexhill accountant who is used to seasonal trade around the seafront and De La Warr Pavilion, and who can help you plan cash flow across the quieter winter months.",
      },
      {
        q: "Does it cost anything to be matched?",
        a: "No. Switch Books is completely free for Bexhill business owners. You tell us about your business, we suggest a local firm that fits, and you decide whether to go ahead. There is no charge and no obligation.",
      },
      {
        q: "Do I have to use a firm based right in Bexhill?",
        a: "No. We can prioritise a firm in Bexhill or the surrounding Rother area if you want someone nearby, but if a slightly further afield firm is the better fit we will say so. The match matters more than the postcode.",
      },
    ],
  },
  {
    slug: "seaford",
    name: "Seaford",
    county: "East Sussex",
    metaTitle: "Accountants in Seaford | Free Local Match | Switch Books",
    metaDescription:
      "Switch Books matches Seaford business owners with the right local accountant, for free. Book a free review and find a firm that genuinely fits your business.",
    headline: "Find the right accountant in Seaford",
    intro:
      "Switch Books is a free service that matches Seaford business owners with a local accountant who fits how they work and what they can afford. We are not accountants ourselves, we connect you with the right firm.",
    localContext:
      "Seaford is a coastal town with a strong residential and retirement base, which shapes the kind of businesses that do well here. Independent retailers, small service firms and trades make up a lot of the local economy, alongside tourism drawn to Seaford Head and the seafront. There is also a sizeable commuter population running businesses on the side or stepping out on their own, who need an accountant that fits around a busy schedule. Many owners here feel their current accountant is fine for filing a return but not much help beyond that, and that gap is usually what prompts them to look for a better match.",
    whyLocal:
      "An accountant who knows Seaford understands a town built on small, owner-run businesses and a commuter base, and can give advice that fits that reality rather than generic boilerplate. Being matched locally makes it easier to drop in or meet when something needs a proper conversation. That said, some excellent firms work mostly remotely and serve Seaford owners well, so we look for the best fit first and let you choose how local you want them.",
    nearbyAreas: ["Newhaven", "Lewes", "Peacehaven", "Eastbourne", "Alfriston", "Bishopstone"],
    sectors: [
      "Independent retail",
      "Trades and construction",
      "Tourism and hospitality",
      "Professional and consulting services",
      "Health and wellbeing services",
      "Property and lettings",
    ],
    faq: [
      {
        q: "I'm a sole trader in Seaford. Is this service for me too?",
        a: "Yes. A lot of Seaford's economy is sole traders and small service firms, so we regularly match owners at exactly that stage with an accountant who is happy to work at your scale and not just chase larger clients.",
      },
      {
        q: "I commute to work and run my business around it. Can you find someone flexible?",
        a: "We can. Seaford has a real commuter base, so we can match you with a firm that is used to clients who need evening calls, quick replies and a setup that fits around a day job.",
      },
      {
        q: "Is there really no cost to using Switch Books?",
        a: "None. The matching service is free for Seaford owners. We learn what you need, point you to a local firm that suits, and you decide whether to proceed. You are never tied in by us.",
      },
      {
        q: "Can you match me with a firm near Newhaven or Lewes if needed?",
        a: "Yes. If the best fit sits in Newhaven, Lewes or elsewhere nearby rather than Seaford itself, we will tell you. We aim for the right accountant first and keep things as local as makes sense for you.",
      },
    ],
  },
  {
    slug: "uckfield",
    name: "Uckfield",
    county: "East Sussex",
    metaTitle: "Accountants in Uckfield | Free Match | Switch Books",
    metaDescription:
      "Switch Books matches Uckfield business owners with the right local accountant, for free. Get a free review and find a firm that fits your business and budget.",
    headline: "Find the right accountant in Uckfield",
    intro:
      "Switch Books is a free service that matches Uckfield business owners with a local accountant who suits their business and their budget. We are not an accountancy firm, we connect you with one that fits.",
    localContext:
      "Uckfield is an East Sussex market town with a broader business mix than its size suggests, including manufacturing and light industry alongside its retail core. There is a solid layer of professional services and a strong contingent of commuters who own and run businesses locally while working across the wider region. That mix means accounting needs range from straightforward sole-trader returns to stock, plant and payroll for established firms. Owners here often outgrow an accountant who was right at the start but has not kept pace as the business has grown, and that mismatch is usually what brings them looking for something better.",
    whyLocal:
      "An accountant who knows Uckfield understands a town that runs on a genuine mix of industry, trades and professional services, and can advise accordingly rather than treating every client the same. A local match makes site visits and face-to-face reviews simpler when a manufacturing or growing business needs them. Many capable firms also handle Uckfield clients remotely without any drop in service, so we prioritise the right fit and leave the choice of distance to you.",
    nearbyAreas: ["Crowborough", "Heathfield", "Lewes", "Haywards Heath", "Buxted", "Maresfield"],
    sectors: [
      "Manufacturing and light industry",
      "Independent retail",
      "Professional services",
      "Trades and construction",
      "Logistics and distribution",
      "Property and lettings",
    ],
    faq: [
      {
        q: "I run a small manufacturing business in Uckfield. Can you match me appropriately?",
        a: "Yes. Uckfield has a real manufacturing and light-industry base, so we can match you with a firm that is comfortable with stock, plant, payroll and the reporting that comes with a working business rather than just a basic tax return.",
      },
      {
        q: "My business has grown but my accountant hasn't kept up. Can you help?",
        a: "That is one of the most common reasons Uckfield owners get in touch. We can match you with a firm that handles businesses at your current size and can support the next stage, not just the one you started at.",
      },
      {
        q: "How much does the matching service cost?",
        a: "It is free. You tell us about your Uckfield business, we suggest a local accountant that fits, and you decide whether to take it forward. There is no fee and no obligation to us.",
      },
      {
        q: "Can you find a firm covering Crowborough or Heathfield if that suits better?",
        a: "Yes. If a firm in Crowborough, Heathfield or the wider area is the stronger match, we will point you to it. The goal is the right accountant for your business, kept as local as is sensible.",
      },
    ],
  },
  {
    slug: "arundel",
    name: "Arundel",
    county: "West Sussex",
    metaTitle: "Accountants in Arundel | Free Local Match | Switch Books",
    metaDescription:
      "Switch Books matches Arundel business owners with the right local accountant, for free. Book a free review and find a firm that genuinely fits your business.",
    headline: "Find the right accountant in Arundel",
    intro:
      "Switch Books is a free service that matches Arundel business owners with a local accountant who fits their trade and their budget. We are not accountants ourselves, we connect you with the right firm.",
    localContext:
      "Arundel is a small historic town where the castle and cathedral shape much of the local economy, drawing steady tourism that supports hospitality, antiques dealers and independent retailers. Events through the year bring peaks of trade, and the surrounding countryside adds agriculture and rural businesses to the mix. Many owners here run visitor-facing businesses where takings swing with the seasons and the events calendar, which makes good cash-flow advice genuinely valuable. When an accountant only surfaces once a year at filing time, owners in a town this dependent on seasonal trade tend to notice, and that is often what starts the search for a better fit.",
    whyLocal:
      "An accountant who knows Arundel understands a tourism and events economy where trade rises and falls with the season, and can plan around it rather than being caught out by it. A local match also makes it easier to meet in person, which many hospitality and retail owners prefer when discussing a difficult quarter. Plenty of strong firms support Arundel businesses remotely too, so we concentrate on the right fit and let you decide how nearby you want them to be.",
    nearbyAreas: ["Littlehampton", "Chichester", "Worthing", "Pulborough", "Storrington", "Amberley"],
    sectors: [
      "Tourism and hospitality",
      "Independent retail and antiques",
      "Events and venues",
      "Agriculture and rural business",
      "Food and drink",
      "Property and lettings",
    ],
    faq: [
      {
        q: "My takings swing with the tourist season. Can you match me with someone who gets that?",
        a: "Yes. Arundel lives and breathes seasonal and event-driven trade, so we can match you with a firm used to visitor-facing businesses and able to help you plan cash flow across the busy and quiet stretches of the year.",
      },
      {
        q: "I run a hospitality business near the castle. Will the right firm understand it?",
        a: "We can match you with an accountant who already works with Arundel's hospitality and retail trade, including the events peaks the town is known for, rather than one who treats it like any inland business.",
      },
      {
        q: "Is the service genuinely free?",
        a: "Yes. Switch Books costs Arundel owners nothing. You tell us about your business, we suggest a local firm that fits, and you decide whether to go ahead. There is no charge and no obligation.",
      },
      {
        q: "Could you match me with a firm in Chichester or Littlehampton instead?",
        a: "If that is the better fit, yes. Arundel is small, so sometimes the strongest match sits in Chichester, Littlehampton or nearby. We aim for the right accountant first and keep it as local as makes sense for you.",
      },
    ],
  },
  {
    slug: "midhurst",
    name: "Midhurst",
    county: "West Sussex",
    metaTitle: "Accountants in Midhurst | Free Match | Switch Books",
    metaDescription:
      "Switch Books matches Midhurst business owners with the right local accountant, for free. Get a free review and find a firm that fits your business and budget.",
    headline: "Find the right accountant in Midhurst",
    intro:
      "Switch Books is a free service that matches Midhurst business owners with a local accountant who suits their work and their budget. We are not an accountancy firm, we connect you with one that fits.",
    localContext:
      "Midhurst is a South Downs market town with an economy shaped by tourism, independent retail and hospitality, supported by the wider countryside around it. Agriculture and equestrian businesses are part of the local picture, and the Cowdray estate and its polo economy bring a distinctive seasonal trade that few other towns share. That mix means owners here range from high-street shops and cafes to rural and land-based businesses with their own particular tax and reporting needs. When an accountant does not understand farming, equestrian work or the seasonal swings around Cowdray, it shows quickly, and that is often why owners here go looking for a better-matched firm.",
    whyLocal:
      "An accountant who knows Midhurst understands a market town tied to agriculture, equestrian trade and the Cowdray and polo economy, and can advise on the specific needs those bring. A local match makes farm and stables visits and in-person reviews far more practical than working with someone who has never seen the setup. Some excellent firms still serve rural Midhurst clients remotely without issue, so we focus on the right fit first and let you choose how close you want them.",
    nearbyAreas: ["Petworth", "Petersfield", "Chichester", "Haslemere", "Easebourne", "Fernhurst"],
    sectors: [
      "Tourism and hospitality",
      "Independent retail",
      "Agriculture and farming",
      "Equestrian and land-based business",
      "Food and drink",
      "Property and estates",
    ],
    faq: [
      {
        q: "I run an agricultural or equestrian business near Midhurst. Can you match me well?",
        a: "Yes. Farming and equestrian work are part of the Midhurst area, so we can match you with a firm that understands land-based businesses, the relevant tax treatment and the seasonal cash flow that comes with them.",
      },
      {
        q: "My trade rises and falls around Cowdray and the polo season. Will the right firm get that?",
        a: "We can match you with an accountant who understands the seasonal economy around Cowdray and the polo calendar, and who can help you plan for the busy stretches and the quieter ones rather than being surprised by them.",
      },
      {
        q: "Does the matching service cost anything?",
        a: "No. It is free for Midhurst owners. You tell us what your business needs, we suggest a local firm that fits, and you decide whether to proceed. There is no fee and no obligation to us.",
      },
      {
        q: "Can you match me with a firm near Petworth or Petersfield if it fits better?",
        a: "Yes. If the strongest match is in Petworth, Petersfield or nearby rather than Midhurst itself, we will say so. We look for the right accountant first and keep things as local as is practical for you.",
      },
    ],
  },
  {
    slug: "petworth",
    name: "Petworth",
    county: "West Sussex",
    metaTitle: "Accountants in Petworth | Free Match | Switch Books",
    metaDescription:
      "Looking for a Petworth accountant who actually understands your business? Switch Books matches you with the right local firm for free. Start your free review today.",
    headline: "Find the right accountant in Petworth",
    intro:
      "If your current accountant only gets in touch once a year, we can help. Switch Books matches you with a Petworth accountant who fits how you trade and what you can afford, and the matching service is free.",
    localContext:
      "Petworth is a historic West Sussex market town best known as an antiques centre, with the National Trust drawing visitors to Petworth House throughout the year. That mix of independent antiques dealers, galleries, hospitality and retail sits alongside the farms and estates that surround the town. Each of those needs something different from an accountant, from VAT on second-hand goods to seasonal tourism cashflow and agricultural reliefs. We match you with a firm that has actually worked with businesses like yours, not one that treats every client the same.",
    whyLocal:
      "A nearby firm is easy to meet face to face, and they tend to know how trade in and around Petworth really works. That said, plenty of good accountants now handle everything online and serve clients across West Sussex without a hitch. We listen to how you prefer to work, then match you with a firm that suits it, whether that means a local office or a fully remote arrangement.",
    nearbyAreas: ["Pulborough", "Fittleworth", "Tillington", "Chichester", "Midhurst", "Wisborough Green"],
    sectors: [
      "Antiques and art dealers",
      "Hospitality and tourism",
      "Independent retail",
      "Farming and estates",
      "Trades and construction",
      "Holiday lets and self-catering",
    ],
    faq: [
      {
        q: "Can you match me with an accountant who understands antiques and second-hand goods?",
        a: "Yes. The VAT margin scheme and record keeping for second-hand goods catch a lot of dealers out, so we match you with a Petworth area firm that has handled it before and can keep you on the right side of HMRC.",
      },
      {
        q: "I run a holiday let near Petworth House. Can you help?",
        a: "We can. Furnished holiday lets and self-catering have their own tax rules, and they keep changing, so we connect you with a local firm that already works with tourism and short-let owners in the area.",
      },
      {
        q: "Does Switch Books charge for finding me a Petworth accountant?",
        a: "No. Our matching service is completely free to you. You tell us about your business, we match you with a suitable local firm, and you decide whether to go ahead.",
      },
      {
        q: "Do I have to use an accountant with an office in Petworth itself?",
        a: "Not at all. Some owners want someone close by for in-person meetings, others are happy working remotely. We match you based on what you prefer, including firms across the wider West Sussex area.",
      },
    ],
  },
  {
    slug: "storrington",
    name: "Storrington",
    county: "West Sussex",
    metaTitle: "Accountants in Storrington | Free Match | Switch Books",
    metaDescription:
      "Need a Storrington accountant who gives you proper attention? Switch Books matches you with the right local firm for free. Get your free accountant review now.",
    headline: "Find the right accountant in Storrington",
    intro:
      "If you feel like just another name on your accountant's list, you are not alone. Switch Books matches you with a Storrington accountant who has time for your business, and using us costs you nothing.",
    localContext:
      "Storrington is a small West Sussex town at the foot of the South Downs, with a busy high street of independent shops, trades and service businesses. It also has a notable cluster of care services and a large commuter population who run businesses on the side or work for themselves. Farming and land-based work continue across the surrounding downland and villages. We match you with a firm that recognises the difference between, say, a care provider and a sole trader contractor, and advises each accordingly.",
    whyLocal:
      "There is real value in an accountant who knows the area and can meet you in person when something needs a proper conversation. Even so, many strong firms now work entirely online and look after Storrington clients without ever needing you to drive over. We match you on how you actually want to deal with your accountant, whether that is local and hands-on or remote and efficient.",
    nearbyAreas: ["Pulborough", "Washington", "West Chiltington", "Ashington", "Amberley", "Thakeham"],
    sectors: [
      "Care and support services",
      "Independent retail",
      "Trades and construction",
      "Agriculture and land-based",
      "Professional and freelance services",
      "Health and wellbeing",
    ],
    faq: [
      {
        q: "I run a care business in Storrington. Can you match me with the right accountant?",
        a: "Yes. Care providers have particular payroll, staffing and compliance pressures, so we match you with a local firm that understands the sector rather than one learning it on your time.",
      },
      {
        q: "I am a sole trader tradesperson. Is Switch Books worth it for me?",
        a: "Definitely. Plenty of trades around Storrington overpay or miss allowances simply because their accountant is not paying attention. We match you with a firm that handles trades day in, day out, and the service is free.",
      },
      {
        q: "How long does it take to get matched?",
        a: "You tell us a few details about your business and what you want from an accountant, and we come back with a suitable Storrington area firm. There is no obligation to proceed.",
      },
    ],
  },
  {
    slug: "steyning",
    name: "Steyning",
    county: "West Sussex",
    metaTitle: "Accountants in Steyning | Free Match | Switch Books",
    metaDescription:
      "Want a Steyning accountant who is proactive, not just reactive? Switch Books matches you with the right local firm for free. Start your free review today.",
    headline: "Find the right accountant in Steyning",
    intro:
      "If your accountant only ever tells you what you owe and never how to plan ahead, it might be time for a change. Switch Books matches you with a Steyning accountant who suits your business, for free.",
    localContext:
      "Steyning is a historic West Sussex market town with a well-loved high street of independent shops, cafes and professional services. Its location near the South Downs brings steady tourism, while downland farming continues across the surrounding countryside. A large share of residents commute or run their own businesses, from consultants to small trades. We match you with a firm that understands which of those you are, and what good advice looks like for your particular situation.",
    whyLocal:
      "An accountant based nearby can be handy when you want to sit down together and talk things through properly. But many excellent firms now run everything digitally and support Steyning businesses from further afield without any drop in service. We focus on matching you with the right firm for how you work, whether that is a local office down the road or a remote team you only ever email and call.",
    nearbyAreas: ["Bramber", "Upper Beeding", "Henfield", "Ashurst", "Wiston", "Shoreham-by-Sea"],
    sectors: [
      "Independent retail and hospitality",
      "Professional and consultancy services",
      "Tourism and leisure",
      "Farming and downland estates",
      "Trades and construction",
      "Creative and freelance services",
    ],
    faq: [
      {
        q: "Can you match me with an accountant who does more than just file my tax return?",
        a: "Yes. A lot of Steyning owners want advice on growth, tax planning and cashflow, not just compliance. We match you with a firm that takes a proactive approach rather than only reacting at year end.",
      },
      {
        q: "I run an independent shop on the high street. Can you help?",
        a: "We can. Retailers in Steyning deal with stock, seasonal trade and tight margins, so we match you with a local firm that knows independent retail and can help you keep more of what you make.",
      },
      {
        q: "Is the matching service really free?",
        a: "Yes, it is free to you. Switch Books is not an accountancy firm. We simply match you with a trusted local accountant who fits your needs and budget, and you decide whether to go ahead.",
      },
      {
        q: "Do I need a firm in Steyning itself, or can it be nearby?",
        a: "Either works. We match you with the right firm for you, which may be in Steyning or in nearby Shoreham, Henfield or the wider area, depending on what you prefer.",
      },
    ],
  },
  {
    slug: "peacehaven",
    name: "Peacehaven",
    county: "East Sussex",
    metaTitle: "Accountants in Peacehaven | Free Match | Switch Books",
    metaDescription:
      "Looking for a Peacehaven accountant who returns your calls? Switch Books matches you with the right local firm for free. Get your free accountant review today.",
    headline: "Find the right accountant in Peacehaven",
    intro:
      "If chasing your accountant for a reply has become normal, you deserve better. Switch Books matches you with a Peacehaven accountant who actually stays in touch, and the matching is free.",
    localContext:
      "Peacehaven is an East Sussex coastal town with a largely residential base and a strong commuter link to Brighton and Newhaven. Its business community is built on trades, small service firms and independent retailers, many of them run by sole traders and owner-managers. A good number of residents are self-employed or run a small limited company alongside other work. We match you with a firm that is comfortable with smaller, owner-run businesses and does not reserve its best attention for the big clients.",
    whyLocal:
      "Having an accountant close to home or your yard can make life simpler when you need to drop off paperwork or talk something over. At the same time, many capable firms now work fully online and support Peacehaven clients alongside others across East Sussex with no loss of service. We match you on the way you like to work, be that a nearby local office or a remote arrangement you handle from your phone.",
    nearbyAreas: ["Newhaven", "Saltdean", "Telscombe Cliffs", "Rottingdean", "Brighton", "Seaford"],
    sectors: [
      "Trades and construction",
      "Small service businesses",
      "Independent retail",
      "Freelance and self-employed",
      "Hospitality and food",
      "Property and lettings",
    ],
    faq: [
      {
        q: "I am a sole trader in Peacehaven. Will an accountant be interested in a business my size?",
        a: "Yes. We match you with firms that genuinely want owner-run and sole trader clients, so you get proper attention rather than being treated as too small to bother with.",
      },
      {
        q: "I commute to Brighton but want a local accountant. Can you help?",
        a: "We can. Plenty of Peacehaven owners want someone close to home for convenience. We match you with a local firm, or one that works remotely if that fits your routine better.",
      },
      {
        q: "What does Switch Books cost?",
        a: "Nothing to you. We are a free matching service, not an accountancy firm. We connect you with a trusted Peacehaven area accountant that suits your needs and budget.",
      },
      {
        q: "Can you match me with someone who handles property and lettings tax?",
        a: "Yes. With landlords and lettings common along the coast, we match you with a firm that knows rental income, allowable costs and the current tax rules for property.",
      },
    ],
  },
  {
    slug: "crowborough",
    name: "Crowborough",
    county: "East Sussex",
    metaTitle: "Accountants in Crowborough | Free Match | Switch Books",
    metaDescription:
      "Want a Crowborough accountant who understands your business? Switch Books matches you with the right local firm for free. Start your free accountant review now.",
    headline: "Find the right accountant in Crowborough",
    intro:
      "If your accountant feels like a stranger you only hear from at tax time, we can change that. Switch Books matches you with a Crowborough accountant who fits your business, and using us is free.",
    localContext:
      "Crowborough is the largest inland town in East Sussex, sitting on the edge of Ashdown Forest with a strong commuter base towards London and the coast. It supports a healthy mix of professional services, healthcare practices and retail, along with many people who run their own consultancies or small firms from home. That spread means very different accounting needs across the town. We match you with a firm that understands your sector and can advise on more than just the basics of filing.",
    whyLocal:
      "A local accountant who knows Crowborough can be reassuring, especially when you want to meet in person and talk through bigger decisions. Even so, a great many firms now operate entirely online and look after Crowborough clients without ever needing you to come in. We match you on what suits you, whether that is a nearby office for face-to-face meetings or a remote team that handles everything digitally.",
    nearbyAreas: ["Jarvis Brook", "Rotherfield", "Uckfield", "Mayfield", "Forest Row", "Hartfield"],
    sectors: [
      "Professional and consultancy services",
      "Healthcare and medical practices",
      "Retail and hospitality",
      "Trades and construction",
      "Home-based and freelance businesses",
      "Property and lettings",
    ],
    faq: [
      {
        q: "I run a consultancy from home in Crowborough. Can you match me with the right accountant?",
        a: "Yes. Home-based consultants and contractors have specific questions around expenses, IR35 and the most tax-efficient setup, so we match you with a firm that advises businesses like yours regularly.",
      },
      {
        q: "I run a healthcare practice. Can you find an accountant who understands the sector?",
        a: "We can. Medical and healthcare practices have particular accounting and tax considerations, so we match you with a local firm that has experience in the sector rather than one figuring it out as it goes.",
      },
      {
        q: "Is there any cost or obligation?",
        a: "No. The matching service is free, and there is no obligation. We connect you with a suitable Crowborough area firm and you decide whether it is the right fit.",
      },
      {
        q: "Do you only match me with firms in Crowborough?",
        a: "Not necessarily. We may suggest a firm in Crowborough or in nearby Uckfield, Forest Row or the surrounding area, and we always factor in whether you want local meetings or remote service.",
      },
    ],
  },
  {
    slug: "heathfield",
    name: "Heathfield",
    county: "East Sussex",
    metaTitle: "Accountants in Heathfield | Free Match | Switch Books",
    metaDescription:
      "Looking for a Heathfield accountant who actually gets your business? Switch Books matches you with the right local firm for free. Start your free review today.",
    headline: "Find the right accountant in Heathfield",
    intro:
      "Switch Books is a free service that matches Heathfield business owners with a trusted local accountant who fits the way they work. We are not an accountancy firm, we connect you with one that suits your needs and budget.",
    localContext:
      "Heathfield is a working East Sussex market town with a real mix of trades, from the rural and farming businesses that fill the Heathfield show each year to the firms on the industrial estate, the shops along the high street and the builders, electricians and contractors covering the surrounding villages. The bookkeeping needs of a hill farm, a fabrication unit and a hair salon are not the same, and neither is the accountant who should be looking after them. If your current accountant treats you like a file number and only speaks to you once a year at the deadline, you are not getting much for your fee. We match you with a Heathfield accountant who understands agricultural accounts, plant and machinery, the construction industry scheme and the seasonal cash flow that rural and trade businesses live with.",
    whyLocal:
      "A local accountant who knows the Heathfield area can be easier to sit down with and quicker to understand the kind of work you do. That said, plenty of good firms now handle everything over email, video calls and cloud software, so the right match might be a few miles away in Hailsham or Uckfield rather than on the high street. We focus on finding you a firm that fits, then let you decide how close you want them to be.",
    nearbyAreas: ["Cross in Hand", "Mayfield", "Horam", "Waldron", "Uckfield", "Hailsham"],
    sectors: [
      "Agriculture and farming",
      "Construction and trades",
      "Manufacturing and engineering",
      "Retail and high street shops",
      "Hospitality",
      "Professional and rural services",
    ],
    faq: [
      {
        q: "Do you have an office in Heathfield?",
        a: "No, Switch Books is a free matching service, not a local firm with premises. We connect you with an established accountant who covers Heathfield and the surrounding area, so you deal directly with the firm we introduce you to.",
      },
      {
        q: "Can you match me with an accountant who understands farm accounts?",
        a: "Yes. Agriculture is a big part of the Heathfield economy, and we work with accountants who handle farm accounts, agricultural reliefs, machinery and the cash flow patterns that come with rural businesses. Tell us about your setup and we will match you accordingly.",
      },
      {
        q: "I run a building or trade business near Heathfield. Can you help?",
        a: "We can. We match trades and construction businesses with accountants who know the construction industry scheme, subcontractor pay and the tax that comes with tools and vans. Start the free review and we will find a firm that fits.",
      },
      {
        q: "How much does the matching service cost?",
        a: "Nothing. Switch Books is free to you. We get you talking to the right Heathfield accountant, and you agree fees directly with the firm you choose.",
      },
    ],
  },
  {
    slug: "battle",
    name: "Battle",
    county: "East Sussex",
    metaTitle: "Accountants in Battle | Free Match | Switch Books",
    metaDescription:
      "Need a Battle accountant who understands hospitality and retail? Switch Books matches you with the right local firm for free. Book your free review today.",
    headline: "Find the right accountant in Battle",
    intro:
      "Switch Books is a free service that matches Battle business owners with a trusted local accountant who fits their trade. We do not do the accounting ourselves, we connect you with a firm that does, and one that suits your needs and budget.",
    localContext:
      "Battle is built around its history, with the Abbey and the 1066 story drawing visitors through the town all year, which means a lot of local businesses live and die by tourism. The independent shops, cafes, pubs, guest houses and tearooms along the high street feel the swings between a busy summer and a quiet January, and the farms and smallholdings in the surrounding countryside add another layer again. An accountant who understands seasonal trade, VAT on food and accommodation and how to plan cash flow around the visitor calendar is worth a great deal more than one who simply files your return. If your current accountant has never asked about your peak and off-peak months, that tells you something. We match you with a Battle accountant who knows how a hospitality and retail town actually earns its money.",
    whyLocal:
      "A nearby accountant can pop in, knows the town and gets the rhythm of a tourism trade without you having to explain it. Even so, the right firm for you might work mostly online and cover Battle from Hastings or Bexhill, and many good accountants now run almost everything through cloud software. We care more about the fit than the postcode, and we leave the choice of how local with you.",
    nearbyAreas: ["Sedlescombe", "Catsfield", "Crowhurst", "Robertsbridge", "Hastings", "Bexhill"],
    sectors: [
      "Hospitality and accommodation",
      "Independent retail",
      "Cafes, pubs and restaurants",
      "Tourism and visitor attractions",
      "Agriculture",
      "Trades and services",
    ],
    faq: [
      {
        q: "Does Switch Books have premises in Battle?",
        a: "No. We are a free introduction service, not an accountancy firm, and we hold no office in the town. We match you with an established accountant who covers Battle, and you work directly with them.",
      },
      {
        q: "My business depends on the tourist season. Can you find an accountant who gets that?",
        a: "Yes. Tourism shapes a lot of trade in Battle, and we match hospitality and retail owners with accountants who plan around seasonal cash flow, VAT on food and accommodation and the quiet months after Christmas.",
      },
      {
        q: "I run a guest house near Battle Abbey. Will the matching work for me?",
        a: "It will. We connect accommodation and hospitality businesses with firms that understand the VAT rules, occupancy patterns and bookkeeping that come with letting rooms. Start the free review and we will match you.",
      },
      {
        q: "Is there any charge for the introduction?",
        a: "No. The Switch Books service is free. We find you a suitable Battle accountant, and you agree fees directly with the firm you pick.",
      },
    ],
  },
  {
    slug: "rye",
    name: "Rye",
    county: "East Sussex",
    metaTitle: "Accountants in Rye | Free Match | Switch Books",
    metaDescription:
      "Find a Rye accountant who understands tourism, the arts and independent retail. Switch Books matches you with the right local firm, free. Start your free review.",
    headline: "Find the right accountant in Rye",
    intro:
      "Switch Books is a free service that matches Rye business owners with a trusted local accountant who fits the work they do. We are not an accountancy firm, we connect you with one that suits your needs and budget.",
    localContext:
      "Rye packs a lot into a small, historic town: a strong tourist trade, a real creative and arts community, antiques and independent shops, plenty of pubs and places to eat, and the fishing boats working out of Rye Harbour. The accounts of a gallery, a self-employed maker, an antiques dealer and a fishing business look nothing alike, and they need an accountant who can move between them without missing the detail. Artists and makers often juggle irregular income, online sales and the odd grant, while hospitality and retail ride the visitor seasons, and the harbour trade has its own way of working. If your accountant only understands one of these and treats the rest as an afterthought, you deserve better. We match you with a Rye accountant who fits the kind of business you actually run.",
    whyLocal:
      "An accountant who knows Rye can be quicker to grasp a creative or hospitality business and easy to meet in person. Just as often, though, the best fit is a firm that works remotely and covers Rye from Hastings or Tenterden through cloud software and video calls. We look for the right match first, and let you decide how much the location matters.",
    nearbyAreas: ["Rye Harbour", "Winchelsea", "Camber", "Peasmarsh", "Northiam", "Tenterden"],
    sectors: [
      "Tourism and hospitality",
      "Arts, crafts and creative businesses",
      "Independent retail and antiques",
      "Fishing and the harbour trade",
      "Cafes, pubs and restaurants",
      "Self-employed and sole traders",
    ],
    faq: [
      {
        q: "Do you have an office in Rye?",
        a: "No. Switch Books is a free matching service and not a firm with premises in the town. We introduce you to an established accountant who covers Rye, and you deal with them directly.",
      },
      {
        q: "I am a self-employed artist or maker. Can you match me with the right accountant?",
        a: "Yes. Rye has a strong creative community, and we work with accountants who understand irregular income, online sales, materials costs and the way makers and sole traders are taxed. Tell us about your work and we will match you.",
      },
      {
        q: "Can you help businesses connected to Rye Harbour and the fishing trade?",
        a: "We can. We match harbour and trade businesses with accountants who understand how they earn and the bookkeeping that goes with it. Start the free review and we will find a firm that fits.",
      },
      {
        q: "What does the matching service cost?",
        a: "It is free. Switch Books gets you talking to the right Rye accountant, and you agree fees directly with the firm you choose.",
      },
    ],
  },
  {
    slug: "hailsham",
    name: "Hailsham",
    county: "East Sussex",
    metaTitle: "Accountants in Hailsham | Free Match | Switch Books",
    metaDescription:
      "Looking for a Hailsham accountant who understands manufacturing and trades? Switch Books matches you with the right local firm, free. Book your free review.",
    headline: "Find the right accountant in Hailsham",
    intro:
      "Switch Books is a free service that matches Hailsham business owners with a trusted local accountant who fits the way they work. We do not do the accounting ourselves, we connect you with a firm that does, and one that suits your needs and budget.",
    localContext:
      "Hailsham is a working East Sussex market town with a strong industrial side, from the manufacturers and units on its industrial estates to a long history of rope and string making and a cattle market that has been part of the town for generations. Alongside the makers and engineers, there are the shops in the centre and the trades that serve the town and the villages around it. A manufacturing business with stock, equipment and payroll needs an accountant who can handle far more than a basic return, and a busy trades business has its own tax and cash flow to manage. If your current accountant never seems to understand how your stock or your machinery affects your numbers, that is a problem worth fixing. We match you with a Hailsham accountant who knows what an industrial and trades town really needs.",
    whyLocal:
      "A local accountant who knows Hailsham can be handy for a face to face meeting and tends to understand the type of business you run. That said, many good firms now manage everything through cloud software, email and video calls, so the right match might cover Hailsham from Eastbourne or Polegate rather than the town centre. We focus on the fit, and we leave the question of distance to you.",
    nearbyAreas: ["Hellingly", "Herstmonceux", "Polegate", "Stone Cross", "Eastbourne", "Heathfield"],
    sectors: [
      "Manufacturing and engineering",
      "Trades and construction",
      "Retail and town centre shops",
      "Warehousing and distribution",
      "Agriculture and livestock",
      "Professional services",
    ],
    faq: [
      {
        q: "Does Switch Books have an office in Hailsham?",
        a: "No. We are a free matching service rather than a firm with premises in the town. We connect you with an established accountant who covers Hailsham, and you work directly with them.",
      },
      {
        q: "I run a manufacturing business on a Hailsham industrial estate. Can you help?",
        a: "Yes. We match manufacturers and makers with accountants who understand stock, equipment, payroll and the reliefs that apply to industrial businesses. Tell us about your setup and we will find a firm that fits.",
      },
      {
        q: "Can you match a trades business with the right accountant?",
        a: "We can. We work with accountants who know the construction industry scheme, subcontractor pay and the day to day bookkeeping that trades businesses around Hailsham deal with. Start the free review and we will match you.",
      },
      {
        q: "How much do you charge for the introduction?",
        a: "Nothing. Switch Books is free to you. We get you talking to the right Hailsham accountant, and you agree fees directly with the firm you choose.",
      },
    ],
  },
  {
    slug: "pulborough",
    name: "Pulborough",
    county: "West Sussex",
    metaTitle: "Accountants in Pulborough | Free Match | Switch Books",
    metaDescription:
      "Find a Pulborough accountant who fits your business and budget. Switch Books matches you with the right local West Sussex firm, free. Start your free review.",
    headline: "Find the right accountant in Pulborough",
    intro:
      "Switch Books is a free service that matches Pulborough business owners with a trusted local accountant who fits the work they do. We are not an accountancy firm, we connect you with one that suits your needs and budget.",
    localContext:
      "Pulborough is a West Sussex village with a working countryside around it, where farming and land based businesses sit alongside independent shops, professional firms and the people who commute up to London on the rail line. The RSPB reserve at Pulborough Brooks brings visitors into the area, which feeds local hospitality and retail, while the commuter link means plenty of consultants, contractors and small limited companies are run from home or a small local office. A farm, a village shop and a one person consultancy each need something different from their accountant, and the right firm is the one that matches your situation rather than a one size fits all package. If your current accountant has never taken the time to understand what you do, it may be time to look. We match you with a Pulborough accountant who fits your business.",
    whyLocal:
      "A nearby accountant who knows Pulborough and the surrounding area can be easy to meet and quick to understand a rural or village business. Even so, the best fit for you might be a firm that works mostly online and covers Pulborough from Storrington, Petworth or Horsham through cloud software and video calls. We concentrate on finding the right match, and we leave the choice of how local with you.",
    nearbyAreas: ["Storrington", "Petworth", "Billingshurst", "Amberley", "West Chiltington", "Horsham"],
    sectors: [
      "Agriculture and land based businesses",
      "Independent retail",
      "Professional services and consultancy",
      "Hospitality and tourism",
      "Trades and construction",
      "Home based and small limited companies",
    ],
    faq: [
      {
        q: "Do you have an office in Pulborough?",
        a: "No. Switch Books is a free matching service, not a firm with premises in the village. We connect you with an established accountant who covers Pulborough, and you deal directly with the firm we introduce.",
      },
      {
        q: "I commute to London but run a small company from home. Can you match me with an accountant?",
        a: "Yes. Plenty of Pulborough business owners run consultancies and small limited companies alongside a commute, and we match them with accountants who handle directors' tax, dividends and home based working. Start the free review and we will find a firm that fits.",
      },
      {
        q: "Can you help a farm or land based business near Pulborough?",
        a: "We can. We work with accountants who understand farm accounts, land and the reliefs that come with rural businesses. Tell us about your setup and we will match you with a suitable firm.",
      },
      {
        q: "What does the matching service cost?",
        a: "It is free. Switch Books gets you talking to the right Pulborough accountant, and you agree fees directly with the firm you choose.",
      },
    ],
  },
];

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}
