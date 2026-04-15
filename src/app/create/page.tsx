import { createCard } from './actions'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function CreateCardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?next=/create')
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="glass-card p-8 md:p-12 border-t-4 border-brand-500">
        <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">Create a New Card</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">Set up the details for your group greeting card.</p>
        
        <form action={createCard} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Card Title
            </label>
            <Input 
              id="title" 
              name="title" 
              placeholder="e.g., Happy Birthday Sarah!" 
              required 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="occasion" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Occasion
            </label>
            <select 
              id="occasion" 
              name="occasion" 
              className="flex h-11 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-900/50 dark:focus-visible:ring-brand-400 transition-colors"
              required
            >
              <option value="birthday">Birthday</option>
              <option value="farewell">Farewell</option>
              <option value="anniversary">Anniversary</option>
              <option value="appreciation">Appreciation</option>
              <option value="wedding">Wedding / Engagement</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="scheduled_at" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Schedule Delivery (Optional)
            </label>
            <Input 
              id="scheduled_at" 
              name="scheduled_at" 
              type="datetime-local" 
            />
            <p className="text-xs text-slate-500 dark:text-slate-400">Leave blank to send manually.</p>
          </div>

          <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800">
            <Button type="submit" size="lg" className="w-full">
              Continue to Editor
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
