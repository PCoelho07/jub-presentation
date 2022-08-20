import {
  Box,
  CloseButton,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import NavItem from "../nav-item";

import { BsMusicNoteList } from "react-icons/bs";
import { MdLibraryMusic } from "react-icons/md";

const LinkItems = [
  { name: "Playlists", icon: BsMusicNoteList, to: "/" },
  { name: "Biblioteca", icon: MdLibraryMusic, to: "/library" },
];

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Guia
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} to={link.to}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

export default SidebarContent;
