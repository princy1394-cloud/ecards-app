import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Sparkles, Users, Palette, CalendarHeart } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-6rem)]">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-100/50 via-slate-50 to-slate-50 dark:from-brand-950/30 dark:via-slate-950 dark:to-slate-950">
        <div className="animate-float mb-8">
          <div className="bg-white/40 dark:bg-slate-900/40 p-5 rounded-3xl backdrop-blur-md border border-white/60 dark:border-slate-800/60 shadow-xl">
            <Sparkles className="h-12 w-12 text-brand-500" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl text-slate-900 dark:text-white">
          Celebrate together, <br className="hidden md:block" />
          <span className="gradient-text">no matter the distance.</span>
        </h1>
        
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl leading-relaxed">
          Create beautiful, collaborative digital greeting cards for birthdays, farewells, and special occasions. Collect messages and memories in one magical place.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/create" className="w-full sm:w-auto">
            <Button size="lg" className="w-full text-lg shadow-brand-500/25">
              Create a Card — It's Free
            </Button>
          </Link>
          <Link href="/login" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full text-lg">
              Sign In
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16 text-slate-900 dark:text-white">Why choose Ecards Platform?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-card p-8 group hover:-translate-y-2 transition-transform duration-300">
            <div className="h-14 w-14 bg-brand-100 dark:bg-brand-900/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Users className="h-7 w-7 text-brand-600 dark:text-brand-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Collaborative</h3>
            <p className="text-slate-600 dark:text-slate-400">Share a single link and watch messages from friends and family pour in instantly.</p>
          </div>
          
          <div className="glass-card p-8 group hover:-translate-y-2 transition-transform duration-300">
            <div className="h-14 w-14 bg-accent-100 dark:bg-accent-900/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Palette className="h-7 w-7 text-accent-600 dark:text-accent-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Customizable</h3>
            <p className="text-slate-600 dark:text-slate-400">Personalize with beautiful themes, drag-and-drop elements, and custom backgrounds.</p>
          </div>
          
          <div className="glass-card p-8 group hover:-translate-y-2 transition-transform duration-300">
            <div className="h-14 w-14 bg-emerald-100 dark:bg-emerald-900/50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <CalendarHeart className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Schedule & Send</h3>
            <p className="text-slate-600 dark:text-slate-400">Plan ahead. Pick the exact date and time the recipient will receive their surprise.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
