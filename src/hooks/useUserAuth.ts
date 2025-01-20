import { createClient, Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { API_KEY, API_URL } from "../api/auth";

const supabase = createClient(API_URL, API_KEY);

export const useUserAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return {
    session,
    isLoading,
    supabase,
  };
};
