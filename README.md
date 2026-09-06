# RanginGfx - Where Creativity Meets Digital Precision

A modern, production-ready clone of [rangingfx.com](https://rangingfx.com/), engineered with Next.js 14 App Router, TypeScript, Tailwind CSS, and optimized for deployment to Cloudflare Pages via `@cloudflare/next-on-pages`.

---

## Features & Sections

- **Dark Theme Aesthetics**: Background `#0a0a0a`, pure white typography, violet accent `#7c3aed`.
- **Glassmorphic Cards**: `bg-white/[0.05] backdrop-blur-xl border-white/10 rounded-3xl`.
- **Hero Section**: Live animated badge `● Your Digital Partner`, bold headline, dual CTAs, and low-opacity partner tech stack strip (Google, WordPress, Facebook, TikTok, Cloudflare, Canva, HTML5, CSS3, JS, React, GitHub).
- **Our Creative Masterpieces**: 3-column responsive showcase grid featuring Graphic Design, Web Development, and UI/UX Design case studies with high-resolution imagery.
- **Where Creativity Meets Digital Precision**: 
  - Left column: "Why Choose Us" value propositions with verified checkmarks (Technical Expertise, Tailored Customization, etc.).
  - Right column: Interactive 2x2 Services grid (Web Development, UI/UX Design, Visual Excellence, SEO & Growth).
- **Featured Post**: Thought leadership article card ("Beyond the Logo") with read time, date, category, and external link.
- **Full Admin CMS (`/admin`)**:
  - Secure Passcode-only authentication (`/admin/login`) with `jose` signed JWT in 7-day `httpOnly` secure cookies.
  - Live editing of Hero copy, Projects, Services, Why Choose Us, and Featured Post.
  - Dual persistence: writes immediately to `content/site.json` in local/Node runtimes and to Cloudflare KV `SITE_CONTENT` on Cloudflare Pages.

---

## Tech Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Authentication**: Passcode verification + [jose](https://github.com/panva/jose) (Edge-compatible JWT)
- **Deployment Adapter**: [@cloudflare/next-on-pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-nextjs-site/)
- **Persistence**: `content/site.json` + optional Cloudflare KV binding `SITE_CONTENT`

---

## Quick Start (Local Development)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/rangingfx.git
   cd rangingfx
   ```

2. **Install dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Configure environment variables**:
   Create a `.env.local` file:
   ```bash
   cp .env.example .env.local
   ```
   Default development passcode:
   ```env
   ADMIN_PASSCODE=Rangin@123
   JWT_SECRET=super_secret_jwt_key_rangin_2026_dev_min_32_chars
   PORT=3000
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the site, or [http://localhost:3000/admin](http://localhost:3000/admin) to access the CMS.

---

## Admin Panel Access

- **Login URL**: `/admin/login`
- **Default Passcode**: `Rangin@123`
- Session: 7-day signed JWT stored in a secure, `httpOnly` cookie `admin_token`.
- Protection: Handled by Next.js `middleware.ts` across all `/admin/*` routes.

---

## Deploying to Cloudflare Pages & GitHub

### Option 1: Automatic Deployment via Cloudflare Pages Dashboard

1. Push your code to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of RanginGfx"
   git branch -M main
   git remote add origin https://github.com/<your-username>/rangingfx.git
   git push -u origin main
   ```

2. Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your `rangingfx` repository.
4. Set the Build settings:
   - **Framework preset**: None / Next.js
   - **Build command**: `npx @cloudflare/next-on-pages`
   - **Build output directory**: `.vercel/output/static`
   - **Node.js version**: In Environment Variables, set `NODE_VERSION` to `20` or higher.
5. In Environment Variables:
   - `ADMIN_PASSCODE`: Your custom secret passcode
   - `JWT_SECRET`: A secure random string (at least 32 characters)
6. *(Optional)* To enable dynamic CMS saves in edge runtime:
   - Go to **Workers & Pages** > **KV** and create a namespace named `SITE_CONTENT`.
   - In your Pages project settings > **Functions** > **KV namespace bindings**, bind `SITE_CONTENT` to the created KV namespace.

### Option 2: GitHub Actions CI/CD

A preconfigured workflow is included in `.github/workflows/deploy.yml`. Add the following GitHub repository secrets:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Deployments will trigger automatically on each push to `main`.
