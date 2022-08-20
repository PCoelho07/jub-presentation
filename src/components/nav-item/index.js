import { Flex, Icon, Link } from "@chakra-ui/react";
import { NavLink as RouterLink } from "react-router-dom";

const NavItem = ({ icon, children, to, ...rest }) => {
  return (
    <Link as={RouterLink} to={to}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        fontWeight={"bold"}
        {...rest}
      >
        {icon && <Icon mr="4" fontSize="16" as={icon} />}
        {children}
      </Flex>
    </Link>
  );
};

export default NavItem;
