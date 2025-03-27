// utils/supabase.ts

import { createClient } from "@supabase/supabase-js"
import { Profile } from "../types/profile"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

class SupabaseClientSingleton {
  private static instance: ReturnType<typeof createClient> | null = null

  public static getInstance(): ReturnType<typeof createClient> {
    if (!SupabaseClientSingleton.instance) {
      SupabaseClientSingleton.instance = createClient(supabaseUrl, supabaseAnonKey)
    }
    return SupabaseClientSingleton.instance
  }
}

export const supabase = SupabaseClientSingleton.getInstance()

// Creates or updates a user profile in the profiles table
export async function upsertProfile(profile: Partial<Profile> & { id: string }) {
  const { error } = await supabase
    .from('profiles')
    .upsert(profile, { onConflict: 'id' })
    .select()
  
  if (error) {
    console.error('Error upserting profile:', error)
    throw error
  }
}