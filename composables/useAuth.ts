import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";

const useAuth = () => {
  const user = useState('user', () => null);
  const {supabase} = useSupabase();
  const router = useRouter();

  supabase.auth.onAuthStateChange((e, session) => {
    user.value = session?.user || null;
  })

  const signup = async ({email, password, ...metadata}) => {
    const { user: u, error} = await supabase.auth.signUp({
      email,
      password
    }, {
      data: metadata,
      redirectTo: `${window.location.origin}/profile?source=email`
    })
    if(error) throw error;
    return u;
  }

  const signin = async ({email, password}) => {
    const {user:u, error} = await supabase.auth.signIn({
      email,
      password
    })

    if (error) throw error;
    return u;
  }

  const signout = async () => {
    const {error} = await supabase.auth.signOut();
    if(error) throw error;
    router.push('/');
  }

  const isLoggedIn = () => {
    return !!user.value;
  }

  return {
    user,
    signup,
    signin,
    signout,
    isLoggedIn
  }
}

export default useAuth;