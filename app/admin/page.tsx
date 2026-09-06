import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import fs from 'fs';
import path from 'path';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';
import AdminClient, { SiteContent } from '@/components/AdminClient';

export const dynamic = 'force-dynamic';

function getInitialContent(): SiteContent {
  try {
    const filePath = path.join(process.cwd(), 'content', 'site.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed reading site.json in admin:', err);
    return {
      hero: {
        badge: '● Your Digital Partner',
        title: 'Where Creativity Meets Digital Precision',
        subtitle: 'We turn bold concepts into high-performing digital experiences.',
        cta1: { text: 'Explore Our Work', link: '#work' },
        cta2: { text: 'Start a Project', link: '#services' },
        techStack: ['Google', 'WordPress', 'Facebook', 'TikTok', 'Cloudflare', 'Canva', 'HTML5', 'CSS3', 'JS', 'React', 'GitHub'],
      },
      projects: [],
      whyChoose: [],
      services: [],
      featuredPost: {
        title: 'Beyond the Logo',
        excerpt: 'Discover how modern agencies craft enduring brand identities.',
        date: 'March 2026',
        readTime: '5 min read',
        category: 'Brand Architecture',
        link: '#',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
      },
      footer: {
        tagline: 'Where Creativity Meets Digital Precision.',
        copyright: '© RanginGfx. All rights reserved.',
      },
    };
  }
}

export default async function AdminPage() {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    redirect('/admin/login');
  }

  const payload = await verifyToken(token);
  if (!payload) {
    redirect('/admin/login');
  }

  const content = getInitialContent();

  return <AdminClient initialContent={content} />;
}
