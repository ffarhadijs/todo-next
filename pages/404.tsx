import Layout from "@/components/layout/Layout";
import { Center, Text } from "@mantine/core";
import React from "react";

export default function Custom404() {

  return (
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
  );
}
