import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  // console.log('Cookies:', cookieStore.getAll());

  // console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
  // console.log('SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY);


  const client = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            
          }
        },
      },
    }
  )

  return client;
}


export async function getUser() {
  const { auth } = await createClient()
   const userObject = await auth.getUser()

   if (userObject.error) {
    console.log(userObject.error);
    return
   }

   return userObject.data.user;
}


