import "./App.css";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import { Game } from "./components/Game/Game";
import { Heading } from "./components/Heading/Heading";
import { useUserAuth } from "./hooks/useUserAuth";
import { authComponentConfig } from "./constans/authConfig";

function App() {
  const { supabase, session, isLoading } = useUserAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Heading />
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
          localization={authComponentConfig}
        />
      ) : (
        <Game />
      )}
    </>
  );
}

export default App;
