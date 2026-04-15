'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Download } from 'lucide-react'

export default function DownloadPdfButton({ targetId, fileName }: { targetId: string, fileName: string }) {
  const [isDownloading, setIsDownloading] = useState(false)

  const downloadPDF = async () => {
    setIsDownloading(true)
    try {
      const html2canvas = (await import('html2canvas')).default
      const jsPDF = (await import('jspdf')).default

      const element = document.getElementById(targetId)
      if (!element) return

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: null
      })
      
      const imgData = canvas.toDataURL('image/png')
      // A4 dimensions in px approx at 72dpi
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      })
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
      pdf.save(`${fileName}.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <Button 
      onClick={downloadPDF} 
      isLoading={isDownloading} 
      variant="glass" 
      size="sm"
      className="gap-2 backdrop-blur-xl bg-white/30 dark:bg-black/30 border border-white/40 dark:border-black/40 text-current hover:bg-white/50 dark:hover:bg-black/50 rounded-full"
    >
      <Download className="h-4 w-4" /> Download PDF
    </Button>
  )
}
