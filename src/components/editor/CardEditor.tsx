'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Settings, Palette, Share, Eye } from 'lucide-react'
import Link from 'next/link'

interface Card {
  id: string
  title: string
  occasion: string
  theme: string
  status: string
}

export function CardEditor({ initialCard }: { initialCard: Card }) {
  const [card, setCard] = useState<Card>(initialCard)
  const [activeTab, setActiveTab] = useState<'themes' | 'settings'>('themes')

  const themes = [
    { id: 'default', name: 'Default Light', class: 'bg-white text-slate-900 border-slate-200' },
    { id: 'dark-elegance', name: 'Dark Elegance', class: 'bg-slate-900 text-white border-slate-700' },
    { id: 'birthday-pop', name: 'Birthday Pop', class: 'bg-gradient-to-br from-pink-200 to-yellow-200 text-pink-900 border-pink-300' },
    { id: 'nature', name: 'Nature Relax', class: 'bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-900 border-emerald-300' },
    { id: 'ocean', name: 'Ocean Breeze', class: 'bg-gradient-to-br from-cyan-100 to-blue-200 text-blue-950 border-blue-300' },
    { id: 'sunset', name: 'Warm Sunset', class: 'bg-gradient-to-br from-orange-200 to-rose-200 text-rose-950 border-orange-300' },
  ]

  const updateTheme = async (themeId: string) => {
    setCard({ ...card, theme: themeId })
    // In a real app, send to Supabase here
  }

  const activeThemeObj = themes.find(t => t.id === card.theme) || themes[0]

  return (
    <div className="flex flex-col md:flex-row h-full bg-slate-50 dark:bg-slate-950">
      
      {/* Sidebar Controls */}
      <div className="w-full md:w-80 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full shrink-0">
        <div className="flex border-b border-slate-200 dark:border-slate-800 p-2 gap-1">
          <button 
            onClick={() => setActiveTab('themes')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'themes' ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
          >
            <Palette className="h-4 w-4" /> Themes
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'settings' ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
          >
            <Settings className="h-4 w-4" /> Settings
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {activeTab === 'themes' && (
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-2">Select a Theme</h3>
              <div className="grid grid-cols-2 gap-3">
                {themes.map(theme => (
                  <button
                    key={theme.id}
                    onClick={() => updateTheme(theme.id)}
                    className={`h-24 rounded-xl border flex flex-col items-center justify-center p-2 text-xs font-medium transition-all ${card.theme === theme.id ? 'ring-2 ring-brand-500 ring-offset-2 dark:ring-offset-slate-900 scale-95 shadow-inner' : 'hover:scale-105 hover:shadow-md'} ${theme.class}`}
                  >
                    <span className="text-center">{theme.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="flex flex-col gap-4">
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white">Card Settings</h3>
              <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                <p className="font-medium text-slate-900 dark:text-white mb-1">Background Music</p>
                <p className="text-xs mb-3">Upload audio coming soon.</p>
                
                <p className="font-medium text-slate-900 dark:text-white mb-1 mt-4">Security</p>
                <div className="flex items-center gap-2 mt-2">
                  <input type="checkbox" id="public" className="rounded" defaultChecked />
                  <label htmlFor="public" className="text-xs">Anyone with link can sign</label>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
           <Link href={`/card/${card.id}/sign`}>
              <Button variant="outline" className="w-full gap-2 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-950/30">
                <Share className="h-4 w-4" /> Get Share Link
              </Button>
           </Link>
           <Link href={`/card/${card.id}`}>
             <Button className="w-full gap-2">
               <Eye className="h-4 w-4" /> Preview
             </Button>
           </Link>
        </div>
      </div>

      {/* Editor Main Area (Preview) */}
      <div className="flex-1 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-slate-100/80 dark:bg-slate-950/80 p-4 md:p-8 overflow-y-auto custom-scrollbar flex flex-col items-center">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4 bg-white/50 dark:bg-slate-800/50 px-4 py-1.5 rounded-full backdrop-blur-sm shadow-sm border border-black/5 dark:border-white/5">
          Live Preview
        </p>
        
        <motion.div 
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className={`w-full max-w-3xl min-h-[700px] rounded-[2rem] shadow-2xl overflow-hidden relative border-8 border-white/20 dark:border-white/5 backdrop-blur-sm flex flex-col ${activeThemeObj.class}`}
        >
          {/* Card Content Preview */}
          <div className="p-10 md:p-16 flex flex-col items-center text-center flex-1">
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="px-4 py-1.5 mb-8 text-xs font-bold uppercase tracking-widest bg-black/5 rounded-full"
            >
              {card.occasion}
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-extrabold tracking-tight mb-12 leading-tight"
            >
              {card.title}
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex-1 w-full border-2 border-dashed border-current opacity-30 rounded-3xl flex flex-col gap-3 items-center justify-center p-8"
            >
              <div className="h-12 w-12 rounded-full bg-current opacity-20 animate-pulse" />
              <p className="font-semibold text-lg">Signatures Wall</p>
              <p className="text-sm opacity-80 max-w-xs">When friends sign the card, their messages will appear here in a beautiful masonry grid.</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

    </div>
  )
}
