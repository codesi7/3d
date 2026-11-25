export interface ProjectItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  accentColor: string;
  mainImg: string;
  hoverImg: string;
  logoImg: string;
  year: string;
  deliverables: string[];
  summary: string;
  challenge: string;
  approach: string;
}

export interface ShowcaseSlide {
  id: string;
  type: 'video' | 'image';
  src: string;
  poster?: string;
  alt: string;
}

export interface ServiceItem {
  id: string;
  className: string;
  wordLeft: string;
  wordRight?: string;
  lottiePath: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  heading: string;
  name: string;
  designation: string;
  quote: string;
  avatar: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const SHOWCASE_SLIDES: ShowcaseSlide[] = [
  {
    id: 'shot-1',
    type: 'video',
    src: '/two26/videos/shot1.mp4',
    poster: '/two26/images/shot1-poster.jpg',
    alt: 'Two26 Studio brand motion showcase reel',
  },
  {
    id: 'shot-2',
    type: 'image',
    src: '/two26/images/shot2.jpg',
    alt: 'Two26 Studio visual identity photography',
  },
  {
    id: 'shot-3',
    type: 'video',
    src: '/two26/videos/shot3.mp4',
    poster: '/two26/images/shot3-poster.jpg',
    alt: 'Two26 Studio packaging and motion showcase',
  },
  {
    id: 'shot-4',
    type: 'image',
    src: '/two26/images/shot4.jpg',
    alt: 'Two26 Studio brand collateral print design',
  },
  {
    id: 'shot-5',
    type: 'image',
    src: '/two26/images/shot5.jpg',
    alt: 'Two26 Studio custom editorial typography',
  },
  {
    id: 'shot-6',
    type: 'image',
    src: '/two26/images/shot6.png',
    alt: 'Two26 Studio packaging and illustration detail',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'heygluco',
    slug: 'heygluco',
    name: 'HeyGluco',
    category: 'Health & Wellness',
    accentColor: '#fde1fd',
    mainImg: '/two26/images/heygluco-main.jpg',
    hoverImg: '/two26/images/heygluco-hover.jpg',
    logoImg: '/two26/images/heygluco-logo.png',
    year: '2025',
    deliverables: ['Brand Strategy', 'Brand Identity', 'Illustration', 'Art Direction', 'Web Design'],
    summary:
      'A warm, human-centric brand identity created for a family-born resource helping parents and kids navigate Type 1 diabetes with clarity instead of clinical anxiety.',
    challenge:
      'Medical resources around Type 1 diabetes often feel cold, overwhelming, and overly sterile—the exact opposite of what families need right after a life-changing diagnosis.',
    approach:
      'We built an approachable visual language anchored in friendly organic forms, expressive custom illustrations, and clear typographic hierarchy that turns complex glucose guidance into everyday reassurance.',
  },
  {
    id: 'bagel-bar',
    slug: 'bagel-bar',
    name: 'THE BAGEL BAR',
    category: 'Food & Beverage',
    accentColor: '#1a54e4',
    mainImg: '/two26/images/bagel-main.jpg',
    hoverImg: '/two26/images/bagel-hover.jpg',
    logoImg: '/two26/images/bagel-logo.png',
    year: '2025',
    deliverables: ['Brand Identity', 'Packaging Design', 'Illustration', 'Signage & Print'],
    summary:
      'An unapologetically bold neighborhood identity bringing authentic hand-rolled bagels and independent morning culture to Bucharest.',
    challenge:
      'Stand out in a saturated specialty coffee and bakery scene without leaning on tired minimalist beige tropes.',
    approach:
      'We leaned into punchy cobalt blue, playful custom lettering, tactile paper wraps, and witty copywriting that feels just as energetic at 8 AM as the bagels fresh out of the kettle.',
  },
  {
    id: 'tanti-maria',
    slug: 'tanti-maria',
    name: 'TANTI MARIA',
    category: 'Food & Retail',
    accentColor: '#f25525',
    mainImg: '/two26/images/tanti-main.jpg',
    hoverImg: '/two26/images/tanti-hover.jpg',
    logoImg: '/two26/images/tanti-logo.png',
    year: '2024',
    deliverables: ['Brand Strategy', 'Brand Identity', 'Character Illustration', 'Packaging Design'],
    summary:
      'A retro-inspired specialty delicatessen nestled inside Bucharest’s iconic Obor Market, led by an unforgettable illustrated aunt everyone feels like they already know.',
    challenge:
      'Bridge heritage market warmth with contemporary specialty retail appeal so both longtime market regulars and curious newcomers feel instantly welcome.',
    approach:
      'Centered on a charismatic custom mascot illustration, vibrant vermilion packaging, and nostalgic Romanian typographic cues reimagined with modern craft.',
  },
  {
    id: 'munchies-and-cream',
    slug: 'munchies-and-cream',
    name: 'MUNCHIES AND CREAM',
    category: 'Food & Beverage',
    accentColor: 'hsl(270.2, 60.47%, 50.39%)',
    mainImg: '/two26/images/munchies-main.jpg',
    hoverImg: '/two26/images/munchies-hover.jpg',
    logoImg: '/two26/images/munchies-logo.png',
    year: '2024',
    deliverables: ['Brand Identity', 'Packaging Design', 'Illustration', 'Social Art Direction'],
    summary:
      'Playful, maximalist dessert branding built to trigger cravings from half a block away.',
    challenge:
      'Capture the indulgent, late-night joy of small-batch cookies and soft-serve in a visual system that scales effortlessly across boxes, cups, and social media.',
    approach:
      'Paired electric violet and creamy pastels with chunky display typography, cheeky illustrated characters, and photo-ready packaging engineered for instant recognition.',
  },
  {
    id: 'mvp',
    slug: 'mvp',
    name: 'MVP',
    category: 'Sports & Talent Management',
    accentColor: '#153fe3',
    mainImg: '/two26/images/mvp-main.jpg',
    hoverImg: '/two26/images/mvp-hover.jpg',
    logoImg: '/two26/images/mvp-logo.png',
    year: '2025',
    deliverables: ['Brand Strategy', 'Brand Identity', 'Web Design', 'Motion Design'],
    summary:
      'A sharp, high-energy visual identity and digital presence for an ambitious sports and talent management agency representing elite athletes.',
    challenge:
      'Move beyond generic sports clichés to create a sleek, confident identity that speaks equally well to top athletes, international clubs, and commercial sponsors.',
    approach:
      'Built an assertive athletic wordmark, electric royal-blue accent system, and high-contrast editorial grid with kinetic motion language.',
  },
  {
    id: 'yum-yum',
    slug: 'yum-yum',
    name: 'YUM YUM',
    category: 'Food & Beverage',
    accentColor: '#e5c9df',
    mainImg: '/two26/images/yumyum-main.jpg',
    hoverImg: '/two26/images/yumyum-hover.jpg',
    logoImg: '/two26/images/yumyum-logo.png',
    year: '2024',
    deliverables: ['Brand Identity', 'Packaging Design', 'Illustration', 'Art Direction'],
    summary:
      'A cheerful, flavor-forward brand world designed to make everyday snacks feel like a tiny celebration.',
    challenge:
      'Create shelf presence that pops instantly in crowded retail aisles while staying warm, charming, and unmistakably modern.',
    approach:
      'Combined soft lilac-blush surfaces, bouncy expressive typography, and custom illustrated packaging moments that reward a closer look.',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'brand-strategy',
    className: 'one',
    wordLeft: 'Brand',
    wordRight: 'Strategy',
    lottiePath: '/two26/lotties/brand-strategy.json',
    description: 'We find the idea, the angle and the reasons people should care.',
  },
  {
    id: 'brand-identity',
    className: 'two',
    wordLeft: 'Brand',
    wordRight: 'identity',
    lottiePath: '/two26/lotties/brand-identity.json',
    description:
      'We give your brand a distinctive look, feel and personality that feel unmistakably yours.',
  },
  {
    id: 'web-design',
    className: 'three',
    wordLeft: 'Web',
    wordRight: 'design',
    lottiePath: '/two26/lotties/web-design.json',
    description:
      'We turn your brand into a digital experience that looks great, feels right and is easy to navigate.',
  },
  {
    id: 'illustration',
    className: 'four',
    wordLeft: 'Illustration',
    lottiePath: '/two26/lotties/illustration.json',
    description: 'We create distinctive illustrations that add character to your brand.',
  },
  {
    id: 'motion-design',
    className: 'five',
    wordLeft: 'Motion',
    wordRight: 'Design',
    lottiePath: '/two26/lotties/motion-design.json',
    description: 'We make your brand move, cause standing still just isn’t enough.',
  },
  {
    id: 'packaging-design',
    className: 'six',
    wordLeft: 'Packaging',
    wordRight: 'Design',
    lottiePath: '/two26/lotties/packaging.json',
    description: 'We create packaging that catches the eye and works better for your brand.',
  },
  {
    id: 'art-direction',
    className: 'seven',
    wordLeft: 'Art',
    wordRight: 'direction',
    lottiePath: '/two26/lotties/art-direction.json',
    description:
      'We keep all the moving parts moving in the same direction, from the big idea down to the smallest detail.',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'ruxandra',
    heading: "Working with Bogdan and Diana has been one of the smoothest collaborations I've had",
    name: 'Ruxandra Florescu',
    designation: 'COO, Dare Digital',
    quote:
      "They're sharp, always responsive, and have a real talent for turning briefs into compelling visuals. No matter the challenge: tight deadlines, shifting requirements, tricky creative constraints, they always show up with solutions. Highly recommend working with them!",
    avatar: '/two26/images/ruxandra.jpg',
  },
  {
    id: 'luiza',
    heading: 'Bogdan and Diana truly brought HeyGluco to life',
    name: 'Luiza Zamfirescu',
    designation: 'Co-Founder, HeyGluco',
    quote:
      'Both of them are truly amazing humans, with an incredible amount of creativity and talent. They took our vision, understood it completely, and brought it to life in ways that went beyond anything we could have imagined. We absolutely loved working with them and feel incredibly lucky that, along the way, we got to call them friends. We cannot brag about them or recommend them highly enough. They are the kind of people you feel lucky to have found, and luckier to have worked with! ❤️',
    avatar: '/two26/images/luiza.jpg',
  },
  {
    id: 'vlad',
    heading: 'Working with Two26 is a bit like brainstorming ideas with your best friends',
    name: 'Vlad Belcin',
    designation: 'Sr. Copywriter, Dare Digital',
    quote:
      "Always fun, always insightful, always constructive. It hardly feels like working, cause the whole process is always so smooth. That's what you get for getting the job done with cool creatives, I guess.",
    avatar: '/two26/images/vlad.jpg',
  },
  {
    id: 'ionut',
    heading: 'Four projects and counting',
    name: 'Ionut Belet',
    designation: 'Founder, MVP Agency',
    quote:
      'We’ve worked together on two websites and two visual identities so far, and it’s been a pleasure every time. Great ideas, really well executed, and just lovely people to work with. Pretty sure we’re not done yet.',
    avatar: '/two26/images/ionut.jpg',
  },
  {
    id: 'monica',
    heading: 'Better than we imagined',
    name: 'Monica Tantu',
    designation: 'Co-Founder, Merci',
    quote:
      'Working with Two26 on our brand identity was a great experience from start to finish. They’re incredibly creative and thoughtful, but also easy to work with and genuinely invested in getting things right. They brought ideas we wouldn’t have thought of ourselves and gave the brand a personality that really feels like us. You can tell they care about the work, but also about the people behind it.',
    avatar: '/two26/images/monica.jpg',
  },
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What kind of projects do you take on?',
    answer:
      'Branding is our main thing, from strategy and identity to packaging, illustration, motion and web design. We like projects where there’s room to think, question things and build something with a bit of character.',
  },
  {
    id: 'faq-2',
    question: 'How much does a branding project cost?',
    answer:
      'It depends on what we’re making. Every project is a little different, so we price based on scope rather than pulling a mysterious number out of a hat. Tell us what you have in mind and we’ll take it from there.',
  },
  {
    id: 'faq-3',
    question: 'Can you work with a brand that already exists?',
    answer:
      'Of course. Not everything needs to be burned to the ground and rebuilt. Sometimes a brand just needs a fresh pair of eyes and a few very intentional changes.',
  },
  {
    id: 'faq-4',
    question: 'Do you work with clients outside Romania?',
    answer:
      'Absolutely. We’re based in Bucharest, but our Wi-Fi travels remarkably well. We’re happy to work with people pretty much anywhere.',
  },
  {
    id: 'faq-5',
    question: 'What if we don’t like the first concepts?',
    answer:
      'We talk about why. Feedback is part of the process, and nothing is presented just because “we thought it looked cool.” Although we do like when things look cool.',
  },
  {
    id: 'faq-6',
    question: 'How involved do we need to be?',
    answer:
      'Involved enough. We’ll need your knowledge, feedback and decisions along the way. Don’t worry, we won’t make you sit next to us while we move things two pixels to the left.',
  },
  {
    id: 'faq-7',
    question: 'Can you start yesterday?',
    answer:
      'We checked. Unfortunately, yesterday is fully booked. But send us a message and we’ll tell you when we can realistically get started.',
  },
  {
    id: 'faq-8',
    question: 'Do you work with small businesses?',
    answer:
      'Yep. Company size matters less to us than the project, the people behind it and what we can actually do together.',
  },
  {
    id: 'faq-9',
    question: 'Do you also develop websites?',
    answer:
      'We design them. For development, we work with people we trust and can bring them into the project when needed. So yes, your website can actually become a website.',
  },
  {
    id: 'faq-10',
    question: 'What’s with all the cats?',
    answer:
      'Those are Oreo and Oliver. They’re not technically employed by Two26, but they’ve somehow made it into the brand anyway. They mostly sleep through meetings and contribute very little creatively. We keep them around.',
  },
];
