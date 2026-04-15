'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function createCard(formData: FormData) {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/login')
  }

  const title = formData.get('title') as string
  const occasion = formData.get('occasion') as string
  const scheduled_at = formData.get('scheduled_at') as string || null

  const { data, error } = await supabase
    .from('cards')
    .insert({
      creator_id: user.id,
      title,
      occasion,
      scheduled_at: scheduled_at ? new Date(scheduled_at).toISOString() : null,
      status: 'draft',
      theme: 'default'
    })
    .select('id')
    .single()

  if (error || !data) {
    console.error(error)
    throw new Error('Could not create card')
  }

  // Redirect to the editor view
  redirect(`/card/${data.id}/edit`)
}
