import { Flex, VStack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

import Element from "react-scroll/modules/components/Element";

import HeaderBar from "../../components/header-bar";
import SongBlock from "../../components/song-block";

function Song() {
  const [songBlocks, setSongBlocks] = useState([]);
  const [songBlockHighlighted, setSongBlockHighlighted] = useState(null);

  useEffect(() => {
    setSongBlocks([
      {
        id: 1,
        name: "Introdução",
        text: "[A] [D] [A] [D]",
        comments: "Solo guitarra.",
        shouldRepeat: 2,
      },
      {
        id: 2,
        name: "Verso 1",
        text: "[A]Que quebra o jugo do meu pecado<br> [D]Tão mais forte é o meu amado<br> [F#m7]O rei da glória, [E]o grande rei dos reis [D7M]<br>",
        comments: "Solo guitarra.",
      },
      {
        id: 3,
        name: "Refrão",
        text: "[A]Oh que tremenda graça<br> [D]Oh que infalível amor<br> [F#m7]Tomou o meu lugar<br> [E]A minha cruz levou",
      },
    ]);
  }, []);

  const isHighlighted = (songblock) => {
    if (!songBlockHighlighted) {
      return false;
    }

    return songblock.id === songBlockHighlighted.id;
  };

  const handleClickMap = (songBlock) => {
    setSongBlockHighlighted(songBlock);
  };

  return (
    <Flex
      direction={"column"}
      padding="4"
      width={"full"}
      alignItems="center"
      color="#101820"
    >
      <Flex
        direction={"column"}
        position="fixed"
        top="0"
        background="#FAFAFB"
        zIndex={2}
        width="full"
        alignItems={"center"}
        pt="4"
        px="4"
      >
        <HeaderBar
          songTitle={"Tremenda graça"}
          songKey="A"
          bpm="130"
          timeSig="4/4"
          songBlocks={songBlocks}
          handleClickMap={handleClickMap}
        />
      </Flex>
      <Flex w="full" direction="column" mt="48">
        <VStack spacing={"6"} width="full" align={"stretch"}>
          {songBlocks.length > 0
            ? songBlocks.map((songBlock, index) => (
                <Element id={`${songBlock.id}`} key={index}>
                  <SongBlock
                    highlight={isHighlighted(songBlock)}
                    title={songBlock.name}
                    text={songBlock.text}
                    comments={songBlock.comments ?? ""}
                    repeat={songBlock.shouldRepeat}
                  />
                </Element>
              ))
            : null}
        </VStack>
      </Flex>
    </Flex>
  );
}

export default Song;
