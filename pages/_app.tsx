import Layout from "@/components/layout/Layout";
import type { AppProps } from "next/app";
import { useState } from "react";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { Notifications } from "@mantine/notifications";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  const [queryClient] = useState(() => new QueryClient());

  const notFound = router.pathname === "/404";
  const signin = router.pathname === "/signin";
  const signup = router.pathname === "/signup";
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Notifications/>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            {notFound || signin || signup ? (
              <Component {...pageProps} />
            ) : (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            )}
          </Hydrate>
        </QueryClientProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
