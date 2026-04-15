'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function addSignature(formData: FormData) {
  const supabase = await createClient()
  
  const card_id = formData.get('card_id') as string
  const contributor_name = formData.get('contributor_name') as string
  const message = formData.get('message') as string
  const emoji = formData.get('emoji') as string || '✨'

  const { error } = await supabase
    .from('signatures')
    .insert({
      card_id,
      contributor_name,
      message,
      emoji
    })

  if (error) {
    console.error('Error adding signature:', error)
    throw new Error('Could not add signature')
  }

  // Redirect to view the card
  redirect(`/card/${card_id}`)
}
