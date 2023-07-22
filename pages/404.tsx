import Layout from "@/components/layout/Layout";
import { Center, Text } from "@mantine/core";
import Head from "next/head";
import React from "react";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Task-Next|404</title>
        <meta name="description" content="Page not found!" />
      </Head>
      <Layout>
        <Center
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text fz={60} fw={700}>
            404
          </Text>
          <Text fz={32} fw={600}>
            Page Not Found!
          </Text>
        </Center>
      </Layout>
    </>
  );
}
