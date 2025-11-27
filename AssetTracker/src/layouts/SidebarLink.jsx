// SidebarLink.jsx
import { UnstyledButton, Flex, Tooltip, rem } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import COLORS from "../constants/Colors";

const SidebarLink = ({ icon: Icon, label, link, onClickMobile }) => {
  const { hovered, ref } = useHover();
  const location = useLocation();

  const active = location.pathname === link;

  const handleClick = () => {
    if (onClickMobile) onClickMobile(); // Close sidebar on mobile
  };

  return (
    <Link to={link} style={{ textDecoration: "none" }} onClick={handleClick}>
      <Tooltip label={label} position="right">
        <UnstyledButton
          ref={ref}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: rem(50),
            padding: rem(10),
            borderRadius: rem(5),
            backgroundColor: active
              ? COLORS.primary
              : hovered
              ? COLORS.secondaryShades[3]
              : "transparent",
            transition: "all 0.25s ease",
            cursor: "pointer",
          }}
        >
          <Flex gap={5} align="center">
            <Icon
              size="1.5rem"
              stroke={1.5}
              color={active ? COLORS.secondary : COLORS.white}
            />
            {/* Uncomment if you want label next to icon */}
            {/* <Text size="sm" color={active ? COLORS.secondary : COLORS.white}>
              {label}
            </Text> */}
          </Flex>
        </UnstyledButton>
      </Tooltip>
    </Link>
  );
};

export default SidebarLink;
