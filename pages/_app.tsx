import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { supabase } from "../utils/supabase";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";
import Layout from "../components/Layout";
import { useEffect } from "react";

export const theme = extendTheme({});
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const setAuthSession = useAuthStore((state) => state.setAuthSession);

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      const session = supabase.auth.session();

      if (mounted) {
        if (session) {
          setAuthSession(session);
        }
      }
    }

    getInitialSession();

    const sub = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthSession(session);
      fetch("/api/auth", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        credentials: "same-origin",
        body: JSON.stringify({ event, session }),
      });
    });

    return () => {
      mounted = false;

      sub.data?.unsubscribe();
    };
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
