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
import { useLocalStorage } from "@mantine/hooks";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

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
        <Notifications />
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            {notFound || signin || signup ? (
              <Component {...pageProps} />
            ) : (
              <Layout
                colorScheme={colorScheme}
                toggleColorScheme={toggleColorScheme}
              >
                <Component {...pageProps} />
              </Layout>
            )}
          </Hydrate>
        </QueryClientProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
