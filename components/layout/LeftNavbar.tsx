import { QueryKey } from "@/enums/queryKey.enum";
import {
  Navbar,
  Text,
  useMantineTheme,
  Flex,
  Divider,
  Box,
  UnstyledButton,
  Loader,
  Center,
} from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { UserCircle, ArrowRight } from "tabler-icons-react";

const LeftNavbar = ({ opened }: { opened: boolean }) => {
  const { push } = useRouter();
  const theme = useMantineTheme();
  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.GetUser],
    queryFn: () => axios.get("/api/auth/getUser"),
    refetchOnMount: "always",
  });

  return (
    <Navbar
      p={"md"}
      hiddenBreakpoint="xs"
      hidden={!opened}
      width={{ xs: 200, lg: 250 }}
      style={{
        width: opened ? "200px" : "0",
      }}
    >
      <Navbar.Section grow>Navbar</Navbar.Section>
      <Divider my="md" />
      <Navbar.Section>
        <UnstyledButton
          onClick={() => push("/profile")}
          w="100%"
          p="sm"
          sx={{
            "&:hover": {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0],
            },
          }}
        >
          {isLoading ? (
            <Center>
              <Loader />
            </Center>
          ) : (
            <Flex direction={"row"} align={"center"} justify={"space-between"}>
              <UserCircle size={"1.8rem"} />
              <Box>
                <Text fw="600" fz="sm">
                  {data?.data?.data?.firstName
                    ? data?.data?.data?.firstName
                    : "User Name"}
                </Text>
                <Text
                  fw={600}
                  fz="xs"
                  c={theme.colorScheme === "dark" ? "gray.6" : "gray.7"}
                >
                  {data?.data?.data.email}
                </Text>
              </Box>
              <ArrowRight />
            </Flex>
          )}
        </UnstyledButton>
      </Navbar.Section>
    </Navbar>
  );
};

export default LeftNavbar;
