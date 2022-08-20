import { Box, Heading, HStack, Link, Text } from "@chakra-ui/react";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import Container from "../../components/container";
import { Link as RouterLink } from "react-router-dom";

export default function Home() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    setPlaylists([
      {
        id: 1,
        name: "Salvacão",
        date: new Date(2022, 5, 23),
        music_qtt: 10,
      },
      {
        id: 2,
        name: "Ceia",
        date: new Date(2022, 5, 25),
        music_qtt: 10,
      },
    ]);
  }, []);

  return (
    <Container>
      <HStack gap={"2"}>
        {playlists.map((playlist, index) => (
          <Playlist data={playlist} key={index} />
        ))}
      </HStack>
    </Container>
  );
}

const Playlist = ({ data, outdated = false }) => {
  const title = `${data.name ?? "[sem nome]"} - ${format(
    data.date,
    "dd/MM/yy"
  )}`;

  return (
    <RouterLink to={`/playlist/${data.id}`}>
      <Box
        bgColor={"white"}
        w="sm"
        p="4"
        borderRadius={"8"}
        cursor="pointer"
        transition={".2s ease"}
        textDecoration="none"
        _hover={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        <Heading size="sm" mb="1">
          {title}
        </Heading>
        <Text fontSize={"sm"} color="gray.500">
          {data.music_qtt ?? 0} músicas
        </Text>
      </Box>
    </RouterLink>
  );
};
