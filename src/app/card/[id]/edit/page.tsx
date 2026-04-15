import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CardEditor } from '@/components/editor/CardEditor'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function EditCardPage(props: {
  params: Promise<{ id: string }>
}) {
  const params = await props.params
  const id = params.id
  
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  const { data: card } = await supabase
    .from('cards')
    .select('*')
    .eq('id', id)
    .single()

  if (!card) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl">Card not found</p>
      </div>
    )
  }

  if (card.creator_id !== user.id) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-xl">You don't have permission to edit this card.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-3 md:px-6 shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 flex items-center gap-1.5 font-medium transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
          <div className="h-6 w-px bg-slate-200 dark:bg-slate-800"></div>
          <h1 className="font-bold text-base md:text-lg text-slate-900 dark:text-white truncate max-w-[150px] sm:max-w-md">
            {card.title}
          </h1>
        </div>
        
        <div className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          Editable
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <CardEditor initialCard={card} />
      </div>
    </div>
  )
}
