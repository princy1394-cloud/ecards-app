import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { PenTool, ArrowLeft } from 'lucide-react'
import DownloadPdfButton from '@/components/card/DownloadPdfButton'

interface Signature {
  id: string
  emoji: string
  message: string
  contributor_name: string
}

// Add standard Theme class mapping
const themeClasses: Record<string, string> = {
  'default': 'bg-white text-slate-900',
  'dark-elegance': 'bg-slate-900 text-white',
  'birthday-pop': 'bg-gradient-to-br from-pink-200 to-yellow-200 text-pink-900',
  'nature': 'bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-900',
  'ocean': 'bg-gradient-to-br from-cyan-100 to-blue-200 text-blue-950',
  'sunset': 'bg-gradient-to-br from-orange-200 to-rose-200 text-rose-950',
}

export default async function ViewCardPage(props: {
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

  const { data: signatures } = await supabase
    .from('signatures')
    .select('*')
    .eq('card_id', id)
    .order('created_at', { ascending: true }) as { data: Signature[] }

  const themeClass = themeClasses[card.theme] || themeClasses['default']

  return (
    <div className={`min-h-[calc(100vh-6rem)] relative overflow-hidden bg-[url('https://grainy-gradients.vercel.app/noise.svg')] ${themeClass} transition-colors duration-700`}>
       {/* Go back helper and PDF Download */}
       <div className="absolute top-4 left-4 z-10 flex gap-4">
         <Link href="/dashboard">
           <Button variant="glass" size="sm" className="hidden md:flex gap-2 backdrop-blur-xl bg-white/30 dark:bg-black/30 border border-white/40 dark:border-black/40 text-current hover:bg-white/50 dark:hover:bg-black/50 rounded-full">
             <ArrowLeft className="h-4 w-4" /> Exit
           </Button>
         </Link>
         <DownloadPdfButton targetId="card-container" fileName={card.title} />
       </div>

       <div id="card-container" className="max-w-6xl mx-auto px-4 py-16 md:py-32 flex flex-col items-center relative z-0">
         
         <div className="text-center mb-24 animate-in fade-in zoom-in duration-1000">
           <span className="inline-block px-5 py-2 mb-8 text-sm md:text-base font-bold uppercase tracking-widest bg-black/10 dark:bg-white/10 rounded-full backdrop-blur-sm">
             {card.occasion}
           </span>
           <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.1] mb-6">
             {card.title}
           </h1>
           <div className="h-1.5 w-32 bg-current opacity-20 mx-auto rounded-full" />
         </div>

         {/* Signature Wall Grid */}
         <div className="w-full mt-12 animate-in fade-in slide-in-from-bottom-24 duration-1000 delay-300 relative">
           
           <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-6 p-6 rounded-3xl bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-black/5 dark:border-white/5">
             <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-current opacity-10 flex items-center justify-center">
                  <span className="text-xl font-bold opacity-100">{signatures?.length || 0}</span>
                </div>
                <h2 className="text-2xl font-bold">
                  Messages
                </h2>
             </div>
             
             <Link href={`/card/${card.id}/sign`}>
               <Button variant="glass" size="lg" className="gap-2 backdrop-blur-xl bg-white/30 dark:bg-black/30 border border-white/40 dark:border-black/40 text-current hover:bg-white/50 dark:hover:bg-black/50 shadow-xl rounded-2xl">
                 <PenTool className="h-5 w-5" /> Add Yours
               </Button>
             </Link>
           </div>
           
           {!signatures || signatures.length === 0 ? (
             <div className="text-center py-32 opacity-60 bg-black/5 dark:bg-white/5 rounded-[3rem] border-2 border-dashed border-current/20">
               <p className="text-2xl font-medium">No messages yet. Be the first to sign!</p>
             </div>
           ) : (
             <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 pb-32">
               {signatures.map((sig, index) => (
                 <div 
                   key={sig.id} 
                   className="break-inside-avoid bg-white/50 dark:bg-black/40 backdrop-blur-xl border border-white/60 dark:border-white/10 p-8 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                 >
                   <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform origin-left">{sig.emoji}</div>
                   <p className="text-lg lg:text-xl font-medium leading-relaxed mb-8 whitespace-pre-wrap opacity-90">
                     "{sig.message}"
                   </p>
                   <div className="flex items-center justify-end gap-3 opacity-80">
                      <div className="h-px flex-1 bg-current opacity-20" />
                      <p className="font-bold text-lg">
                        {sig.contributor_name}
                      </p>
                   </div>
                 </div>
               ))}
             </div>
           )}
         </div>

       </div>
    </div>
  )
}
