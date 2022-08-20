import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";

import { Link, useParams } from "react-router-dom";
import { MdKeyboardTab } from "react-icons/md";
import Container from "../../components/container";

function Playlist() {
  const [songs, setSongs] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    setSongs([
      {
        id: 1,
        name: "Tremenda graça",
        key: "C",
        bpm: 130,
        sigTime: "4/4",
      },
    ]);
  }, []);

  return (
    <Container>
      <Heading fontSize={"md"} mb="4">
        Músicas - 16/06/2022
      </Heading>
      <VStack width={"full"} spacing="2" align={"stretch"}>
        {songs.map((song, index) => (
          <Link to={`/song/${song.id}`} key={index}>
            <Box
              bgColor="white"
              borderRadius="8"
              padding="4"
              display={"flex"}
              justifyContent="space-between"
              alignItems="center"
              transition={".2s ease"}
              _hover={{
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
            >
              <Flex direction={"column"}>
                <Heading fontSize={"md"}>Tremenda graça</Heading>
                <HStack divider={<>&bull;</>} gap="2">
                  <Text fontSize={"xs"} pt="0.5">
                    Tom: C
                  </Text>

                  <Text fontSize={"xs"} pt="0.5">
                    BPM: 130
                  </Text>

                  <Text fontSize={"xs"} pt="0.5">
                    Assinatura de tempo: 4/4
                  </Text>
                </HStack>
              </Flex>
              <MdKeyboardTab size={"20px"} />
            </Box>
          </Link>
        ))}
      </VStack>
    </Container>
  );
}

export default Playlist;
