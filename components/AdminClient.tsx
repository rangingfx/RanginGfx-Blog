'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Save,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  Check,
  AlertCircle,
  Layers,
  Sparkles,
  Code2,
  TrendingUp,
  Image as ImageIcon,
  CheckCircle2,
  RefreshCw,
  Eye,
  Sliders,
  FolderKanban,
  FileText,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';

export interface SiteContent {
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

interface AdminClientProps {
  initialContent: SiteContent;
}

export default function AdminClient({ initialContent }: AdminClientProps) {
  const router = useRouter();
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [activeTab, setActiveTab] = useState<'hero' | 'projects' | 'services' | 'why' | 'featured' | 'footer'>('hero');
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [techStackInput, setTechStackInput] = useState(content.hero.techStack.join(', '));

  // Save all changes via POST /api/content
  async function handleSave() {
    setSaving(true);
    setStatusMsg(null);

    // Sync tech stack array from comma-separated string
    const cleanedTechStack = techStackInput
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    const payload: SiteContent = {
      ...content,
      hero: {
        ...content.hero,
        techStack: cleanedTechStack,
      },
    };

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save content');
      }

      setContent(payload);
      setStatusMsg({ type: 'success', text: 'All content changes saved and published!' });
      setTimeout(() => setStatusMsg(null), 4000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setStatusMsg({ type: 'error', text: err.message });
      } else {
        setStatusMsg({ type: 'error', text: 'An unexpected error occurred while saving.' });
      }
    } finally {
      setSaving(false);
    }
  }

  // Logout via DELETE /api/auth
  async function handleLogout() {
    try {
      await fetch('/api/auth', { method: 'DELETE' });
      router.push('/admin/login');
      router.refresh();
    } catch {
      router.push('/admin/login');
    }
  }

  // --- Helpers for Arrays ---
  // Projects
  function handleAddProject() {
    const newProject = {
      id: Date.now().toString(),
      tag: 'New Category',
      title: 'Project Title',
      desc: 'High-impact project description outlining key technical solutions.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
    };
    setContent({ ...content, projects: [...content.projects, newProject] });
  }

  function handleUpdateProject(index: number, field: string, value: string) {
    const updated = [...content.projects];
    updated[index] = { ...updated[index], [field]: value };
    setContent({ ...content, projects: updated });
  }

  function handleDeleteProject(index: number) {
    const updated = content.projects.filter((_, i) => i !== index);
    setContent({ ...content, projects: updated });
  }

  // Services
  function handleAddService() {
    const newService = {
      id: Date.now().toString(),
      icon: 'Code2',
      title: 'New Service',
      desc: 'Description of the professional service provided to clients.',
    };
    setContent({ ...content, services: [...content.services, newService] });
  }

  function handleUpdateService(index: number, field: string, value: string) {
    const updated = [...content.services];
    updated[index] = { ...updated[index], [field]: value };
    setContent({ ...content, services: updated });
  }

  function handleDeleteService(index: number) {
    const updated = content.services.filter((_, i) => i !== index);
    setContent({ ...content, services: updated });
  }

  // Why Choose Us
  function handleAddWhyChoose() {
    const newItem = {
      id: Date.now().toString(),
      title: 'Distinct Advantage',
      desc: 'Specific reason why clients choose your agency.',
    };
    setContent({ ...content, whyChoose: [...content.whyChoose, newItem] });
  }

  function handleUpdateWhyChoose(index: number, field: string, value: string) {
    const updated = [...content.whyChoose];
    updated[index] = { ...updated[index], [field]: value };
    setContent({ ...content, whyChoose: updated });
  }

  function handleDeleteWhyChoose(index: number) {
    const updated = content.whyChoose.filter((_, i) => i !== index);
    setContent({ ...content, whyChoose: updated });
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Top Header / Control Bar */}
      <header className="sticky top-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center font-black text-sm">
              R
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-white">RanginGfx CMS</h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Live Editor
                </span>
              </div>
              <p className="text-xs text-gray-400">Manage site content & published assets</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-gray-300 hover:text-white transition-all"
            >
              <Eye className="w-3.5 h-3.5 text-purple-400" />
              <span>View Site</span>
            </Link>

            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
            >
              {saving ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              <span>{saving ? 'Saving...' : 'Publish Changes'}</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-300 transition-all cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Notification Toast */}
      {statusMsg && (
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 pt-4">
          <div
            className={`p-4 rounded-2xl flex items-center justify-between gap-3 text-xs font-medium border ${
              statusMsg.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-red-500/10 border-red-500/30 text-red-300'
            }`}
          >
            <div className="flex items-center gap-2">
              {statusMsg.type === 'success' ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-400" />
              )}
              <span>{statusMsg.text}</span>
            </div>
            <button
              onClick={() => setStatusMsg(null)}
              className="text-gray-400 hover:text-white"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 flex-1">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/10 mb-8 max-w-fit">
          <button
            onClick={() => setActiveTab('hero')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'hero'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            Hero & Tech
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            Projects ({content.projects.length})
          </button>
          <button
            onClick={() => setActiveTab('why')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'why'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            Why Choose Us ({content.whyChoose.length})
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'services'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            Services ({content.services.length})
          </button>
          <button
            onClick={() => setActiveTab('featured')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'featured'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            Featured Post
          </button>
          <button
            onClick={() => setActiveTab('footer')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'footer'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            Footer
          </button>
        </div>

        {/* 1. HERO TAB */}
        {activeTab === 'hero' && (
          <div className="space-y-8">
            <div className="bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8">
              <h2 className="text-lg font-bold text-white mb-1">Hero Section</h2>
              <p className="text-xs text-gray-400 mb-6">
                Edit main top badge, large title, subtitle, and primary call-to-actions.
              </p>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Top Badge Text
                  </label>
                  <input
                    type="text"
                    value={content.hero.badge}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, badge: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Hero Main Heading
                  </label>
                  <input
                    type="text"
                    value={content.hero.title}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, title: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Hero Subtitle
                  </label>
                  <textarea
                    rows={3}
                    value={content.hero.subtitle}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        hero: { ...content.hero, subtitle: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                  />
                </div>

                {/* CTAs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/[0.08]">
                  <div className="space-y-4">
                    <h3 className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                      CTA Button 1 (Primary)
                    </h3>
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Label</label>
                      <input
                        type="text"
                        value={content.hero.cta1.text}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            hero: {
                              ...content.hero,
                              cta1: { ...content.hero.cta1, text: e.target.value },
                            },
                          })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Link URL</label>
                      <input
                        type="text"
                        value={content.hero.cta1.link}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            hero: {
                              ...content.hero,
                              cta1: { ...content.hero.cta1, link: e.target.value },
                            },
                          })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
                      CTA Button 2 (Secondary)
                    </h3>
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Label</label>
                      <input
                        type="text"
                        value={content.hero.cta2.text}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            hero: {
                              ...content.hero,
                              cta2: { ...content.hero.cta2, text: e.target.value },
                            },
                          })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">Link URL</label>
                      <input
                        type="text"
                        value={content.hero.cta2.link}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            hero: {
                              ...content.hero,
                              cta2: { ...content.hero.cta2, link: e.target.value },
                            },
                          })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Tech Stack Strip */}
                <div className="pt-4 border-t border-white/[0.08]">
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Tech Stack Strip (Comma-Separated)
                  </label>
                  <input
                    type="text"
                    value={techStackInput}
                    onChange={(e) => setTechStackInput(e.target.value)}
                    placeholder="Google, WordPress, Facebook, TikTok, Cloudflare..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                  />
                  <p className="text-[11px] text-gray-500 mt-2">
                    Displays with elegant low opacity in the tech banner strip.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Our Creative Masterpieces</h2>
                <p className="text-xs text-gray-400">
                  Manage portfolio cards, tags, descriptions, and Unsplash preview images.
                </p>
              </div>
              <button
                onClick={handleAddProject}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {content.projects.map((project, index) => (
                <div
                  key={project.id || index}
                  className="bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 relative"
                >
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.08]">
                    <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                      Project #{index + 1}
                    </span>
                    <button
                      onClick={() => handleDeleteProject(index)}
                      className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-300 p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    <div className="md:col-span-8 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 mb-1">
                            Tag / Category
                          </label>
                          <input
                            type="text"
                            value={project.tag}
                            onChange={(e) => handleUpdateProject(index, 'tag', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-300 mb-1">
                            Title
                          </label>
                          <input
                            type="text"
                            value={project.title}
                            onChange={(e) => handleUpdateProject(index, 'title', e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          Description
                        </label>
                        <textarea
                          rows={2}
                          value={project.desc}
                          onChange={(e) => handleUpdateProject(index, 'desc', e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          Image URL
                        </label>
                        <input
                          type="url"
                          value={project.image}
                          onChange={(e) => handleUpdateProject(index, 'image', e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-4">
                      <label className="block text-xs font-semibold text-gray-400 mb-2">
                        Preview Thumbnail
                      </label>
                      <div className="relative h-44 rounded-2xl overflow-hidden border border-white/15 bg-zinc-900">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. WHY CHOOSE US TAB */}
        {activeTab === 'why' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Why Choose Us Items</h2>
                <p className="text-xs text-gray-400">
                  Left-hand checklist benefits highlighting technical precision and client commitment.
                </p>
              </div>
              <button
                onClick={handleAddWhyChoose}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Benefit</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {content.whyChoose.map((item, index) => (
                <div
                  key={item.id || index}
                  className="bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-3xl p-6 relative flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-purple-400" />
                        <span className="text-xs font-bold text-purple-300">Point #{index + 1}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteWhyChoose(index)}
                        className="text-xs text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-500/10"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => handleUpdateWhyChoose(index, 'title', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        value={item.desc}
                        onChange={(e) => handleUpdateWhyChoose(index, 'desc', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. SERVICES TAB */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Services Grid</h2>
                <p className="text-xs text-gray-400">
                  Right-hand 2x2 services grid (Web Development, UI/UX Design, Visual Excellence, SEO).
                </p>
              </div>
              <button
                onClick={handleAddService}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Service</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {content.services.map((service, index) => (
                <div
                  key={service.id || index}
                  className="bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-3xl p-6 relative flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                      <span className="text-xs font-bold text-purple-400 uppercase">
                        Service #{index + 1}
                      </span>
                      <button
                        onClick={() => handleDeleteService(index)}
                        className="text-xs text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-500/10"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          Icon Name
                        </label>
                        <select
                          value={service.icon}
                          onChange={(e) => handleUpdateService(index, 'icon', e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:border-purple-500 focus:outline-none"
                        >
                          <option value="Code2">Code2 (Web)</option>
                          <option value="Layout">Layout (UI/UX)</option>
                          <option value="Sparkles">Sparkles (Visual)</option>
                          <option value="TrendingUp">TrendingUp (SEO)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={service.title}
                          onChange={(e) => handleUpdateService(index, 'title', e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        value={service.desc}
                        onChange={(e) => handleUpdateService(index, 'desc', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. FEATURED POST TAB */}
        {activeTab === 'featured' && (
          <div className="bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8">
            <h2 className="text-lg font-bold text-white mb-1">Featured Post (Beyond the Logo)</h2>
            <p className="text-xs text-gray-400 mb-6">
              Configure the prominent thought leadership showcase article.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Main Title
                    </label>
                    <input
                      type="text"
                      value={content.featuredPost.title}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          featuredPost: { ...content.featuredPost, title: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Subtitle / Headline
                    </label>
                    <input
                      type="text"
                      value={content.featuredPost.subtitle || ''}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          featuredPost: { ...content.featuredPost, subtitle: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Excerpt / Summary
                  </label>
                  <textarea
                    rows={4}
                    value={content.featuredPost.excerpt}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        featuredPost: { ...content.featuredPost, excerpt: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={content.featuredPost.category}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          featuredPost: { ...content.featuredPost, category: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Date
                    </label>
                    <input
                      type="text"
                      value={content.featuredPost.date}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          featuredPost: { ...content.featuredPost, date: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Read Time
                    </label>
                    <input
                      type="text"
                      value={content.featuredPost.readTime}
                      onChange={(e) =>
                        setContent({
                          ...content,
                          featuredPost: { ...content.featuredPost, readTime: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={content.featuredPost.image}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        featuredPost: { ...content.featuredPost, image: e.target.value },
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="md:col-span-4">
                <label className="block text-xs font-semibold text-gray-400 mb-2">
                  Featured Cover
                </label>
                <div className="relative h-60 rounded-2xl overflow-hidden border border-white/15 bg-zinc-900">
                  <img
                    src={content.featuredPost.image}
                    alt={content.featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 6. FOOTER TAB */}
        {activeTab === 'footer' && (
          <div className="bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8">
            <h2 className="text-lg font-bold text-white mb-1">Footer Settings</h2>
            <p className="text-xs text-gray-400 mb-6">
              Edit bottom tagline, copyright notice, and social mentions.
            </p>

            <div className="space-y-4 max-w-xl">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  value={content.footer.tagline}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      footer: { ...content.footer, tagline: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Copyright Notice
                </label>
                <input
                  type="text"
                  value={content.footer.copyright}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      footer: { ...content.footer, copyright: e.target.value },
                    })
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
