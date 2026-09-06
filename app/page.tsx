import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import {
  Code2,
  Layout,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
  Layers,
  Palette,
  Terminal,
  Cpu,
  Globe,
  Lock,
} from 'lucide-react';

interface SiteContent {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    cta1: { text: string; link: string };
    cta2: { text: string; link: string };
    techStack: string[];
  };
  projects: Array<{
    id: string;
    tag: string;
    title: string;
    desc: string;
    image: string;
  }>;
  whyChoose: Array<{
    id: string;
    title: string;
    desc: string;
  }>;
  services: Array<{
    id: string;
    icon: string;
    title: string;
    desc: string;
  }>;
  featuredPost: {
    title: string;
    subtitle?: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
    link: string;
    image: string;
  };
  footer: {
    tagline: string;
    copyright: string;
  };
}

// Icon mapper for services
function getServiceIcon(iconName: string) {
  switch (iconName?.toLowerCase()) {
    case 'code2':
    case 'web development':
      return <Code2 className="w-6 h-6 text-[#7c3aed]" />;
    case 'layout':
    case 'layers':
    case 'ui/ux design':
      return <Layout className="w-6 h-6 text-[#7c3aed]" />;
    case 'sparkles':
    case 'palette':
    case 'visual excellence':
      return <Sparkles className="w-6 h-6 text-[#7c3aed]" />;
    case 'trendingup':
    case 'seo & growth':
    case 'seo':
      return <TrendingUp className="w-6 h-6 text-[#7c3aed]" />;
    default:
      return <Sparkles className="w-6 h-6 text-[#7c3aed]" />;
  }
}

// Helper to load content via fs.readFileSync
function getSiteContent(): SiteContent {
  try {
    const filePath = path.join(process.cwd(), 'content', 'site.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading site content:', err);
    // Safe fallback
    return {
      hero: {
        badge: '● Your Digital Partner',
        title: 'Where Creativity Meets Digital Precision',
        subtitle:
          'We engineer captivating digital identities, custom high-performance websites, and transformative user experiences designed to scale your brand.',
        cta1: { text: 'Explore Our Work', link: '#work' },
        cta2: { text: 'Start a Project', link: '#services' },
        techStack: [
          'Google',
          'WordPress',
          'Facebook',
          'TikTok',
          'Cloudflare',
          'Canva',
          'HTML5',
          'CSS3',
          'JS',
          'React',
          'GitHub',
        ],
      },
      projects: [
        {
          id: '1',
          tag: 'Graphic Design',
          title: 'Elite Brand Identity',
          desc: 'Comprehensive visual identity system for next-generation tech brands.',
          image:
            'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop',
        },
        {
          id: '2',
          tag: 'Web Development',
          title: 'Modern E-Commerce Site',
          desc: 'High-conversion headless storefront built with lightning-fast speeds.',
          image:
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
        },
        {
          id: '3',
          tag: 'UI/UX Design',
          title: 'Mobile App Concept',
          desc: 'Intuitive, micro-interaction rich fintech iOS & Android mobile design.',
          image:
            'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=1200&auto=format&fit=crop',
        },
      ],
      whyChoose: [
        {
          id: '1',
          title: 'Expertise',
          desc: 'Our collective unites deep engineering mastery with avant-garde visual craft.',
        },
        {
          id: '2',
          title: 'Customization',
          desc: 'Tailored solutions engineered specifically to address your distinct goals.',
        },
      ],
      services: [
        {
          id: '1',
          icon: 'Code2',
          title: 'Web Development',
          desc: 'Scalable modern web applications with cutting-edge edge infrastructure.',
        },
        {
          id: '2',
          icon: 'Layout',
          title: 'UI/UX Design',
          desc: 'Human-centric interfaces engineered through rigorous behavioral research.',
        },
        {
          id: '3',
          icon: 'Sparkles',
          title: 'Visual Excellence',
          desc: 'Compelling brand storytelling and visual identities.',
        },
        {
          id: '4',
          icon: 'TrendingUp',
          title: 'SEO',
          desc: 'Organic discovery maximization through search performance tuning.',
        },
      ],
      featuredPost: {
        title: 'Beyond the Logo',
        subtitle: 'The Architectural Anatomy of a Timeless Brand Identity',
        excerpt:
          'Discover how modern digital agencies synthesize psychological resonance and typography hierarchy.',
        date: 'March 2026',
        readTime: '5 min read',
        category: 'Brand Architecture',
        link: '#',
        image:
          'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
      },
      footer: {
        tagline: 'Where Creativity Meets Digital Precision.',
        copyright: '© RanginGfx. All rights reserved.',
      },
    };
  }
}

export default function HomePage() {
  const content = getSiteContent();

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden selection:bg-[#7c3aed] selection:text-white font-sans">
      {/* Background ambient light blobs */}
      <div className="ambient-glow w-[500px] h-[500px] bg-[#7c3aed] top-[-100px] left-[20%] -z-10 opacity-20" />
      <div className="ambient-glow w-[600px] h-[600px] bg-indigo-700 top-[35%] right-[-150px] -z-10 opacity-15" />
      <div className="ambient-glow w-[450px] h-[450px] bg-[#7c3aed] bottom-[10%] left-[-100px] -z-10 opacity-15" />

      {/* 1. NAVBAR */}
      <header className="sticky top-0 z-50 w-full frosted-glass-nav transition-all">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
            Rangin<span className="text-[#7c3aed]">Gfx</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="#home" className="text-white hover:text-white transition-colors">
              Home
            </Link>
            <Link href="#services" className="hover:text-white transition-colors">
              Services
            </Link>
            <Link href="#work" className="hover:text-white transition-colors">
              Work
            </Link>
            <Link href="#why-us" className="hover:text-white transition-colors">
              Why Us
            </Link>
          </nav>

          {/* Action / Admin Button */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="bg-[#7c3aed] hover:bg-[#6d28d9] px-6 py-2 rounded-full text-sm font-semibold transition-colors text-white shadow-lg shadow-[#7c3aed]/20 inline-flex items-center gap-1.5"
              title="Content Management Dashboard"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
            <Link
              href="#services"
              className="hidden sm:inline-flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 px-5 py-2 rounded-full text-sm font-semibold text-white backdrop-blur-md transition-all hover:scale-[1.02]"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section id="home" className="relative pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="max-w-5xl mx-auto px-6 sm:px-12 text-center flex flex-col items-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-200 mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#7c3aed]" />
            <span>{content.hero.badge.replace(/^●\s*/, '')}</span>
          </div>

          {/* Huge Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-center leading-[1.1] mb-6 max-w-4xl text-white tracking-tight">
            Where Creativity Meets<br />
            <span className="text-[#7c3aed]">Digital Precision</span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-400 text-center max-w-2xl text-base sm:text-lg mb-8 leading-relaxed">
            {content.hero.subtitle}
          </p>

          {/* 2 CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 w-full sm:w-auto">
            <Link
              href={content.hero.cta2.link || '#services'}
              className="w-full sm:w-auto bg-[#7c3aed] hover:bg-[#6d28d9] px-8 py-3.5 rounded-full font-bold text-base shadow-lg shadow-[#7c3aed]/20 text-white transition-all hover:scale-[1.02] text-center"
            >
              {content.hero.cta2.text}
            </Link>
            <Link
              href={content.hero.cta1.link || '#work'}
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-3.5 rounded-full font-bold text-base backdrop-blur-md text-white transition-all hover:scale-[1.02] text-center"
            >
              {content.hero.cta1.text}
            </Link>
          </div>

          {/* Tech Stack Strip (Low Opacity) */}
          <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-5xl px-4 py-6 border-t border-white/5 gap-4">
            <div className="flex flex-wrap items-center justify-center gap-6 opacity-30 text-[10px] font-bold tracking-widest uppercase hover:opacity-80 transition-opacity">
              {content.hero.techStack.map((tech, index) => (
                <span key={index}>{tech}</span>
              ))}
            </div>
            <div className="text-xs text-gray-500">
              © {new Date().getFullYear()} RanginGfx. Built for Digital Excellence.
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR CREATIVE MASTERPIECES */}
      <section id="work" className="py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-xs font-semibold tracking-widest text-[#7c3aed] uppercase mb-3">
              Portfolio & Case Studies
            </h2>
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              Our Creative Masterpieces
            </p>
            <p className="text-gray-400 text-base">
              A curated selection of visionary visual design, high-converting digital storefronts, and tactile mobile interfaces.
            </p>
          </div>

          {/* 3 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto mb-8">
            {content.projects.map((project, idx) => {
              const gradientBgs = [
                'from-[#7c3aed]/20 to-transparent',
                'from-blue-500/10 to-transparent',
                'from-pink-500/10 to-transparent',
              ];
              const grad = gradientBgs[idx % gradientBgs.length];

              return (
                <div
                  key={project.id}
                  className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className={`h-36 w-full bg-gradient-to-br ${grad} rounded-2xl mb-4 flex items-center justify-center overflow-hidden border border-white/5 relative`}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/70 via-transparent to-transparent" />
                      {idx === 0 && (
                        <div className="w-16 h-16 rounded-full border-2 border-[#7c3aed] opacity-50 relative z-10 pointer-events-none" />
                      )}
                      {idx === 1 && (
                        <div className="w-20 h-12 rounded border border-white/20 relative z-10 pointer-events-none" />
                      )}
                      {idx === 2 && (
                        <div className="w-12 h-12 rounded-lg border-2 border-white/20 rotate-12 relative z-10 pointer-events-none" />
                      )}
                      <div className="absolute top-3 left-3 z-20">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-black/60 backdrop-blur-md border border-white/10 text-gray-200">
                          {project.tag}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-[#7c3aed] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {project.desc}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-[#7c3aed]">
                    <span>View Project</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. WHERE CREATIVITY MEETS DIGITAL PRECISION (Left: Why Choose, Right: Services Grid) */}
      <section id="why-us" className="py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* LEFT SIDE: Why Choose with Checkmarks */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-semibold tracking-widest text-[#7c3aed] uppercase">
                  Why Partner With RanginGfx
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2 leading-tight">
                  Where Creativity Meets Digital Precision
                </h2>
                <p className="text-gray-400 text-base mt-4 leading-relaxed">
                  We don’t just build software or design graphics; we cultivate digital authority. Every touchpoint is calibrated for measurable ROI and enduring distinction.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {content.whyChoose.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 hover:border-[#7c3aed]/40 hover:bg-white/[0.05] transition-all"
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-[#7c3aed]" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-white">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="#services"
                  className="inline-flex items-center gap-2 bg-[#7c3aed] hover:bg-[#6d28d9] px-7 py-3 rounded-full font-bold text-sm shadow-lg shadow-[#7c3aed]/20 text-white transition-all"
                >
                  <span>Discover Full Capabilities</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* RIGHT SIDE: Services Grid (Web Dev, UI/UX, Visual Excellence, SEO) */}
            <div id="services" className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {content.services.map((service) => (
                  <div
                    key={service.id}
                    className="group p-6 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl hover:border-[#7c3aed]/50 hover:bg-white/[0.05] transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-[#7c3aed]/10 border border-[#7c3aed]/20 flex items-center justify-center mb-4 text-[#7c3aed] group-hover:scale-110 transition-transform">
                        {getServiceIcon(service.icon || service.title)}
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#7c3aed] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {service.desc}
                      </p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-white/5 flex items-center gap-1.5 text-xs font-semibold text-[#7c3aed]">
                      <span>Learn more</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED POST: Beyond the Logo Card */}
      <section className="py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="mb-10">
            <span className="text-xs font-semibold tracking-widest text-[#7c3aed] uppercase">
              Insights & Thought Leadership
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2">
              Featured Post
            </h2>
          </div>

          <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-[#7c3aed]/40 hover:bg-white/[0.05] transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Image side */}
              <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-[420px] bg-zinc-900 overflow-hidden">
                <img
                  src={content.featuredPost.image}
                  alt={content.featuredPost.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-[#0a0a0a]/30 to-[#0a0a0a] opacity-80" />
                <div className="absolute top-6 left-6">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#7c3aed] text-white shadow-lg shadow-[#7c3aed]/20">
                    {content.featuredPost.category || 'Brand Architecture'}
                  </span>
                </div>
              </div>

              {/* Text side */}
              <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs font-medium text-gray-400 mb-4">
                    <span>{content.featuredPost.date}</span>
                    <span>•</span>
                    <span>{content.featuredPost.readTime}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 leading-snug hover:text-[#7c3aed] transition-colors">
                    {content.featuredPost.title}
                  </h3>

                  {content.featuredPost.subtitle && (
                    <h4 className="text-base font-semibold text-[#7c3aed] mb-4">
                      {content.featuredPost.subtitle}
                    </h4>
                  )}

                  <p className="text-gray-300 text-base leading-relaxed mb-8">
                    {content.featuredPost.excerpt}
                  </p>
                </div>

                <div>
                  <a
                    href={content.featuredPost.link || '#'}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-[#7c3aed] border border-white/10 hover:border-transparent text-sm font-semibold text-white backdrop-blur-md transition-all group"
                  >
                    <span>Read Full Article</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="border-t border-white/5 bg-[#0a0a0a]/90 backdrop-blur-xl pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Brand Col */}
            <div className="md:col-span-2 space-y-4">
              <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
                Rangin<span className="text-[#7c3aed]">Gfx</span>
              </Link>
              <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
                {content.footer.tagline || 'Where Creativity Meets Digital Precision.'}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-4">
                Navigation
              </h4>
              <ul className="space-y-2.5 text-sm text-gray-400">
                <li>
                  <Link href="#home" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="hover:text-white transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="#work" className="hover:text-white transition-colors">
                    Work
                  </Link>
                </li>
                <li>
                  <Link href="#why-us" className="hover:text-white transition-colors">
                    Why Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Admin & Direct Contact */}
            <div>
              <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-4">
                Control & Direct
              </h4>
              <ul className="space-y-2.5 text-sm text-gray-400">
                <li>
                  <Link
                    href="/admin"
                    className="inline-flex items-center gap-1.5 hover:text-[#7c3aed] transition-colors"
                  >
                    <Lock className="w-3.5 h-3.5 text-[#7c3aed]" />
                    <span>Admin CMS</span>
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:rangingfx@gmail.com"
                    className="hover:text-white transition-colors"
                  >
                    rangingfx@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>{content.footer.copyright || '© RanginGfx. All rights reserved.'}</p>
            <p className="flex items-center gap-1 text-gray-400">
              <span>Crafted for high performance & edge scalability</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
