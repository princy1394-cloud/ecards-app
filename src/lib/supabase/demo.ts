import { cookies } from 'next/headers'
import { randomUUID } from 'crypto'

interface DemoUser {
  id: string
  email: string
  password: string
}

interface DemoCard {
  id: string
  title: string
  occasion: string
  theme: string
  status: string
  creator_id: string
  created_at: string
  scheduled_at: string | null
}

interface DemoSignature {
  id: string
  card_id: string
  contributor_name: string
  message: string
  emoji: string
  created_at: string
}

const demoUsers: DemoUser[] = [
  {
    id: 'demo-user',
    email: 'demo@ecards.local',
    password: 'password123',
  },
]

const demoCards: DemoCard[] = [
  {
    id: 'demo-card-1',
    title: 'Happy Birthday Sarah!',
    occasion: 'birthday',
    theme: 'default',
    status: 'active',
    creator_id: 'demo-user',
    created_at: new Date().toISOString(),
    scheduled_at: null,
  },
]

const demoSignatures: DemoSignature[] = [
  {
    id: 'demo-signature-1',
    card_id: 'demo-card-1',
    contributor_name: 'Alice',
    message: "Wishing you the best day ever, Sarah!",
    emoji: '🎉',
    created_at: new Date().toISOString(),
  },
]

function getCookieValue(cookieStore: any, name: string) {
  const cookie = cookieStore.get(name)
  return cookie?.value || null
}

function getCurrentDemoUser(cookieStore: any) {
  const value = getCookieValue(cookieStore, 'demo-user')
  if (!value) return null
  try {
    return JSON.parse(value) as { id: string; email: string }
  } catch {
    return null
  }
}

function setDemoUserCookie(cookieStore: any, user: { id: string; email: string }) {
  cookieStore.set('demo-user', JSON.stringify({ id: user.id, email: user.email }), {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
  })
}

function clearDemoUserCookie(cookieStore: any) {
  cookieStore.set('demo-user', '', {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 0,
  })
}

function filterItems<T extends Record<string, unknown>>(items: T[], filters: Array<{ col: string; value: unknown }>) {
  return items.filter((item) =>
    filters.every((filter) => item[filter.col] === filter.value)
  )
}

function createQuery<T extends { [key: string]: unknown } = Record<string, unknown>>(items: T[]) {
  const queryState = {
    filters: [] as Array<{ col: string; value: unknown }>,
    order: null as null | { col: string; ascending: boolean },
    inserted: null as T[] | null,
  }

  return {
    select() {
      return this
    },
    eq(col: string, value: unknown) {
      queryState.filters.push({ col, value })
      return this
    },
    order(col: string, { ascending }: { ascending: boolean }) {
      queryState.order = { col, ascending }
      return this
    },
    async single() {
      let result = filterItems(items, queryState.filters)
      if (queryState.order) {
        result = result.sort((a, b) => {
          const left = a[queryState.order!.col] as string | number | null
          const right = b[queryState.order!.col] as string | number | null
          if (left === right) return 0
          if (left === null || left === undefined) return 1
          if (right === null || right === undefined) return -1
          if (left < right) return queryState.order!.ascending ? -1 : 1
          return queryState.order!.ascending ? 1 : -1
        })
      }
      return { data: result[0] ?? null, error: null }
    },
    async then(onfulfilled: any) {
      return this.single().then(onfulfilled)
    },
    insert(rows: T | T[]) {
      const normalized = Array.isArray(rows) ? rows : [rows]
      const inserted = normalized.map((row) => ({
        ...row,
        id: (row as any).id || randomUUID(),
        created_at: new Date().toISOString(),
      })) as T[]
      ;(items as T[]).push(...inserted)
      queryState.inserted = inserted
      return {
        data: inserted,
        error: null,
        select() {
          return this
        },
        async single() {
          return { data: inserted[0] ?? null, error: null }
        },
      }
    },
  }
}

export function createDemoClient(cookieStore: any) {
  return {
    isDemo: true,
    auth: {
      async getUser() {
        const user = getCurrentDemoUser(cookieStore)
        return { data: { user }, error: null }
      },
      async signInWithPassword({ email, password }: { email: string; password: string }) {
        const user = demoUsers.find((existing) => existing.email === email && existing.password === password)
        if (!user) {
          return { data: { user: null }, error: { message: 'Invalid email or password' } }
        }
        setDemoUserCookie(cookieStore, user)
        return { data: { user }, error: null }
      },
      async signUp({ email, password }: { email: string; password: string }) {
        const existing = demoUsers.find((existing) => existing.email === email)
        if (existing) {
          return { data: { user: null }, error: { message: 'User already exists' } }
        }
        const newUser = { id: randomUUID(), email, password }
        demoUsers.push(newUser)
        setDemoUserCookie(cookieStore, newUser)
        return { data: { user: newUser }, error: null }
      },
      async signOut() {
        clearDemoUserCookie(cookieStore)
        return { data: null, error: null }
      },
    },
    from(table: string) {
      if (table === 'cards') {
        return createQuery<any>(demoCards)
      }
      if (table === 'signatures') {
        return createQuery<any>(demoSignatures)
      }
      return createQuery<any>([])
    },
  }
}
