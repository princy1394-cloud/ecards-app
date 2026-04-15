import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { addSignature } from './actions'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Sparkles, PenLine } from 'lucide-react'

export default async function SignCardPage(props: {
  params: Promise<{ id: string }>
}) {
  const params = await props.params
  const id = params.id
  
  const supabase = await createClient()

  const { data: card } = await supabase
    .from('cards')
    .select('*')
    .eq('id', id)
    .single()

  if (!card) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
      <div className="max-w-xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 bg-brand-100 dark:bg-brand-900/50 rounded-3xl items-center justify-center mb-6 text-brand-600 dark:text-brand-400 shadow-xl shadow-brand-500/20 transform hover:scale-110 transition-transform">
            <Sparkles className="h-8 w-8" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-3">You're invited to sign!</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Leave a message for <strong className="text-brand-600 dark:text-brand-400">{card.title}</strong>
          </p>
        </div>

        <div className="glass-card p-6 md:p-10 shadow-2xl border-t-4 border-brand-500">
          <form action={addSignature} className="flex flex-col gap-6">
             <input type="hidden" name="card_id" value={card.id} />
             
             <div className="flex flex-col gap-2">
               <label htmlFor="contributor_name" className="text-sm font-semibold text-slate-700 dark:text-slate-300 mx-1">
                 Your Name
               </label>
               <Input 
                 id="contributor_name" 
                 name="contributor_name" 
                 placeholder="How should we call you?"
                 required 
               />
             </div>

             <div className="flex flex-col gap-2">
               <label htmlFor="message" className="text-sm font-semibold text-slate-700 dark:text-slate-300 mx-1">
                 Your Message
               </label>
               <textarea 
                 id="message" 
                 name="message" 
                 rows={5}
                 placeholder="Write something nice..."
                 className="flex w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-900/50 dark:focus-visible:ring-brand-400 custom-scrollbar resize-y min-h-[120px] transition-colors"
                 required
               />
             </div>

             <div className="flex flex-col gap-2">
               <label htmlFor="emoji" className="text-sm font-semibold text-slate-700 dark:text-slate-300 mx-1">
                 Pick an Emoji (Optional)
               </label>
               <Input 
                 id="emoji" 
                 name="emoji" 
                 placeholder="🎉"
                 maxLength={2}
               />
             </div>

             <Button type="submit" size="lg" className="w-full gap-2 mt-4 shadow-xl">
               <PenLine className="h-5 w-5" /> Sign Card
             </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
