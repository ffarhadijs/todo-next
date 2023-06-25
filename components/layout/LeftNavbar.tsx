import {
  Navbar,
  Text,
  useMantineTheme,
  Flex,
  Divider,
  Box,
  UnstyledButton,
} from "@mantine/core";
import { UserCircle, ArrowRight } from "tabler-icons-react";

const LeftNavbar = ({ opened }: { opened: boolean }) => {
  const theme = useMantineTheme();
  return (
    <Navbar
      p={"md"}
      hiddenBreakpoint="xs"
      hidden={!opened}
      width={{ xs: 200, lg: 300 }}
      style={{
        width: opened ? "200px" : "0",
      }}
    >
      <Navbar.Section grow>Navbar</Navbar.Section>
      <Divider my="md" />
      <Navbar.Section>
        <UnstyledButton
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
          <Flex direction={"row"} align={"center"} justify={"space-between"}>
            <UserCircle size={"1.8rem"} />
            <Box>
              <Text fw="600" fz="sm">
                {" "}
                User Name
              </Text>
              <Text
                fw={600}
                fz="xs"
                c={theme.colorScheme === "dark" ? "gray.6" : "gray.7"}
              >
                User Email
              </Text>
            </Box>
            <ArrowRight />
          </Flex>
        </UnstyledButton>
      </Navbar.Section>
    </Navbar>
  );
};

export default LeftNavbar;
