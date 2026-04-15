import dns from 'dns'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { createDemoClient } from './demo'

const hostResolutionCache = new Map<string, boolean>()

async function isHostResolvable(url: string) {
  try {
    const hostname = new URL(url).hostname
    if (hostResolutionCache.has(hostname)) {
      return hostResolutionCache.get(hostname)!
    }
    await dns.promises.lookup(hostname)
    hostResolutionCache.set(hostname, true)
    return true
  } catch {
    hostResolutionCache.set(url, false)
    return false
  }
}

export async function createClient(): Promise<any> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const cookieStore = await cookies()

  if (!supabaseUrl || !supabaseAnonKey || !(await isHostResolvable(supabaseUrl))) {
    return createDemoClient(cookieStore)
  }

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
