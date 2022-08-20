import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Link from "react-scroll/modules/components/Link";

const HeaderBar = ({
  songTitle,
  songKey,
  bpm,
  timeSig,
  songBlocks = [],
  handleClickMap,
}) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/playlist/2");
  };

  return (
    <Flex direction={"column"} width="full">
      <Flex justifyContent={"space-between"} alignItems="baseline">
        <Flex width="30%">
          <IconButton
            icon={<MdKeyboardBackspace />}
            colorScheme="blackAlpha"
            variant="outline"
            mb="4"
            size={"lg"}
            onClick={() => goBack()}
          />
        </Flex>
        <Flex width="full" justifyContent={"center"}>
          <Heading size="md">{songTitle}</Heading>
        </Flex>
        <Flex width="30%" justifyContent={"flex-end"}>
          <HStack divider={<>&bull;</>} gap="2">
            <Text fontSize={"sm"} pt="0.5">
              Tom: {songKey}
            </Text>

            <Text fontSize={"sm"} pt="0.5">
              BPM: {bpm}
            </Text>

            <Text fontSize={"sm"} pt="0.5">
              Assinatura de tempo: {timeSig}
            </Text>
          </HStack>
        </Flex>
      </Flex>
      <Box
        width="full"
        borderRadius={"6"}
        p="4"
        mt="4"
        border="2px solid"
        borderColor="whiteAlpha.400"
        overflowX={"scroll"}
      >
        <HStack spacing={"5"}>
          {songBlocks.map((songBlock, index) => (
            <Link
              key={index}
              to={`${songBlock.id}`}
              spy={true}
              smooth={true}
              duration={300}
              offset={-200}
            >
              <Avatar
                name={songBlock.name}
                onClick={() => handleClickMap(songBlock)}
                cursor="pointer"
                bg={"green.400"}
                color={"white"}
              />
            </Link>
          ))}
        </HStack>
      </Box>
    </Flex>
  );
};

export default HeaderBar;
