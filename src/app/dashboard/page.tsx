import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Plus, Edit2, Share, Trash2 } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    redirect('/login')
  }

  const { data: cards, error: cardsError } = await supabase
    .from('cards')
    .select('*')
    .eq('creator_id', user.id)
    .order('created_at', { ascending: false }) as {
      data: Array<{
        id: string
        title: string
        occasion: string
        status: string
      }>
      error: unknown
    }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Your Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage your digital greeting cards.</p>
        </div>
        <Link href="/create">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create New Card
          </Button>
        </Link>
      </div>

      {!cards || cards.length === 0 ? (
        <div className="glass-card p-12 text-center max-w-2xl mx-auto flex flex-col items-center">
          <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
            <Plus className="h-10 w-10 text-slate-400" />
          </div>
          <h2 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">No cards yet</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md">
            You haven't created any greeting cards. Start creating one now to collect messages!
          </p>
          <Link href="/create">
            <Button size="lg">Create Your First Card</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div key={card.id} className="glass-card p-6 flex flex-col gap-4 group hover:-translate-y-1 transition-transform">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{card.title}</h3>
                  <span className="inline-block px-2 py-1 mt-2 text-xs font-semibold uppercase tracking-wider text-brand-700 bg-brand-100 dark:text-brand-300 dark:bg-brand-900/50 rounded-md">
                    {card.occasion}
                  </span>
                </div>
                <div className="px-2 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  {card.status}
                </div>
              </div>
              
              <div className="mt-auto pt-4 border-t border-slate-200/50 dark:border-slate-800/50 flex justify-between">
                <Link href={`/card/${card.id}/edit`}>
                  <Button variant="ghost" size="sm" className="gap-2 text-slate-600 dark:text-slate-400">
                    <Edit2 className="h-4 w-4" /> Edit
                  </Button>
                </Link>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="text-slate-600 dark:text-slate-400" title="Share Link">
                    <Share className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30" title="Delete">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
