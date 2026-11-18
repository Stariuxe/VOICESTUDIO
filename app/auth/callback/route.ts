import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const tokenHash = requestUrl.searchParams.get('token_hash');
  const type = requestUrl.searchParams.get('type');
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll(values) {
          values.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        },
      },
    },
  );

  let authError: Error | null = null;
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    authError = error;
  } else if (tokenHash && type === 'email') {
    const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type: 'email' });
    authError = error;
  } else {
    authError = new Error('Missing sign-in confirmation.');
  }

  if (authError) return NextResponse.redirect(new URL('/login?auth=failed', requestUrl.origin));

  const { data: { user } } = await supabase.auth.getUser();
  const allowed = (process.env.JARVIS_ALLOWED_EMAILS || '').split(',').map((value) => value.trim().toLowerCase()).filter(Boolean);
  if (!user?.email || !allowed.includes(user.email.toLowerCase())) {
    await supabase.auth.signOut();
    return NextResponse.redirect(new URL('/login?auth=unauthorized', requestUrl.origin));
  }

  return NextResponse.redirect(new URL('/', requestUrl.origin));
}
