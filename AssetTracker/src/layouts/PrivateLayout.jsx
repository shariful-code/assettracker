import React from "react";
import {
  AppShell,
  Burger,
  Group,
  ScrollArea,
  Flex,
  Box,
  Text,
  Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet, useNavigate } from "react-router-dom";
import SidebarLinks from "../layouts/SidebarLinks";
import NavbarLink from "../layouts/SidebarLink";
import { IconLogout } from "@tabler/icons-react";
import COLORS from "../constants/Colors";

const PrivateLayout = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/signin");
  };

  return (
    <AppShell
      padding={0}
      navbar={{
        width: 260,
        breakpoint: "md",
        collapsed: { mobile: !opened },
      }}
      header={{ height: 70 }}
      styles={{
        main: {
          background: COLORS.mainBg || "#f8f9fa",
          margin: "20px",
        },
      }}
    >
      {/* HEADER */}
      <AppShell.Header
        style={{
          backgroundColor: COLORS.primary,
          color: COLORS.secondary,
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        }}
      >
        <Group h="100%" px="lg" position="apart">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="md"
              size="sm"
              color={COLORS.secondary}
            />
            <Box
              component="img"
              src="/orbit_logo_dark.png"
              alt="Logo"
              style={{ width: 70 }}
            />
          </Group>

          <Flex align="center" gap={12}>
            <Text fw={600} color={COLORS.secondary} size="lg">
              Dashboard
            </Text>
          </Flex>
        </Group>
      </AppShell.Header>

      {/* SIDEBAR */}
      <AppShell.Navbar
        p="md"
        style={{
          backgroundColor: COLORS.secondary,
          borderRight: "1px solid rgba(0,0,0,0.05)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <ScrollArea style={{ flex: 1, marginBottom: 10 }}>
          <SidebarLinks onClickMobile={close} />
        </ScrollArea>

        <Button
          leftIcon={<IconLogout size={16} />}
          onClick={handleLogout}
          fullWidth
          variant="light"
          color="red"
          style={{
            padding: "10px 12px",
            borderRadius: 12,
            fontWeight: 600,
            justifyContent: "center",
          }}
        >
          Logout
        </Button>
      </AppShell.Navbar>

      {/* MAIN CONTENT */}
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default PrivateLayout;
