import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';

import { supabase } from '@/lib/db';
import { jsonSocialSupabaseError } from '@/lib/social-supabase-errors';

export const dynamic = 'force-dynamic';

const BUCKET = 'social-media';

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Expected multipart form data' }, { status: 400 });
  }

  const file = form.get('file');
  if (!file || !(file instanceof Blob)) {
    return NextResponse.json({ error: 'Missing file field' }, { status: 400 });
  }

  const name = (file as File).name || 'upload';
  const ext = name.includes('.') ? name.split('.').pop() : 'bin';
  const safeExt = ext && /^[a-zA-Z0-9]+$/.test(ext) ? ext : 'bin';
  const path = `uploads/${Date.now()}-${randomUUID()}.${safeExt}`;
  const buf = Buffer.from(await file.arrayBuffer());
  const contentType = file.type || 'application/octet-stream';

  const { error } = await supabase.storage.from(BUCKET).upload(path, buf, {
    contentType,
    upsert: false,
  });

  if (error) return jsonSocialSupabaseError(error);

  const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);

  return NextResponse.json({
    url: pub.publicUrl,
    path,
  });
}
