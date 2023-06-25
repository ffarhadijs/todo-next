import {
  Text,
  MediaQuery,
  Burger,
  ActionIcon,
  Flex,
  Box,
  Header as MantineHeader,
  useMantineTheme,
  ColorScheme,
} from "@mantine/core";
import { Dispatch, SetStateAction } from "react";
import { Sun, MoonStars } from "tabler-icons-react";

const Header = ({
  dark,
  opened,
  setOpened,
  toggleColorScheme,
}: {
  dark: boolean;
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  toggleColorScheme: (colorScheme?: ColorScheme | undefined) => void;
}) => {
  const theme = useMantineTheme();
  return (
    <MantineHeader height={{ base: 50, md: 70 }} p="md">
      <Flex
        direction={"row"}
        justify={"right"}
        align={"center"}
        h={"100%"}
        w="100%"
      >
        <Box w={{ base: 180, lg: 280 }} mr="auto">
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="sm"
              color={theme.colors.gray[6]}
            />
          </MediaQuery>
        </Box>
        <Flex
          direction={"row"}
          align={"center"}
          justify={"space-between"}
          style={{ flex: "1" }}
        >
          <Text component="h1" fz={"xl"} fw={700}>
            {" "}
            Todo-Next{" "}
          </Text>
          <ActionIcon
            variant="outline"
            color={dark ? "yellow" : "blue"}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? <Sun size="1.1rem" /> : <MoonStars size="1.1rem" />}
          </ActionIcon>
        </Flex>
      </Flex>
    </MantineHeader>
  );
};

export default Header;
