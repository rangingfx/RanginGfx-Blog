import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

const CONTENT_FILE_PATH = path.join(process.cwd(), 'content', 'site.json');

// Helper to read content
function readLocalContent() {
  try {
    const raw = fs.readFileSync(CONTENT_FILE_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed reading site.json:', err);
    return null;
  }
}

// GET /api/content - public
export async function GET() {
  try {
    // 1. Try Cloudflare KV binding if present
    const envObj = (process.env as Record<string, unknown>) || {};
    const globalObj = globalThis as unknown as { SITE_CONTENT?: { get: (key: string) => Promise<string | null> } };
    const kv = (envObj.SITE_CONTENT as { get: (key: string) => Promise<string | null> } | undefined) || globalObj.SITE_CONTENT;

    if (kv && typeof kv.get === 'function') {
      try {
        const kvContent = await kv.get('site_content');
        if (kvContent) {
          return NextResponse.json(JSON.parse(kvContent));
        }
      } catch (kvErr) {
        console.warn('KV read failed, falling back to local file:', kvErr);
      }
    }

    // 2. Read from content/site.json
    const localContent = readLocalContent();
    if (!localContent) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }

    return NextResponse.json(localContent);
  } catch (error) {
    console.error('GET /api/content error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/content - protected
export async function POST(request: NextRequest) {
  try {
    // 1. Verify authentication
    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: Missing authentication token' }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized: Invalid or expired token' }, { status: 401 });
    }

    // 2. Parse new content payload
    const updatedContent = await request.json();
    if (!updatedContent || typeof updatedContent !== 'object') {
      return NextResponse.json({ error: 'Invalid content payload' }, { status: 400 });
    }

    const jsonString = JSON.stringify(updatedContent, null, 2);

    // 3. Save to local file system (works in standard Node.js server and dev mode)
    try {
      const dir = path.dirname(CONTENT_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(CONTENT_FILE_PATH, jsonString, 'utf-8');
    } catch (fsErr) {
      console.warn('Filesystem write warning (expected in read-only edge runtimes):', fsErr);
    }

    // 4. Save to Cloudflare KV binding if present
    const envObj = (process.env as Record<string, unknown>) || {};
    const globalObj = globalThis as unknown as { SITE_CONTENT?: { put: (key: string, val: string) => Promise<void> } };
    const kv = (envObj.SITE_CONTENT as { put: (key: string, val: string) => Promise<void> } | undefined) || globalObj.SITE_CONTENT;

    if (kv && typeof kv.put === 'function') {
      try {
        await kv.put('site_content', jsonString);
      } catch (kvErr) {
        console.error('KV write failed:', kvErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Site content updated successfully',
      data: updatedContent,
    });
  } catch (error) {
    console.error('POST /api/content error:', error);
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}
