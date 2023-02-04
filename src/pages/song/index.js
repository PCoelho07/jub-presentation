import { Flex, VStack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Element from "react-scroll/modules/components/Element";

import HeaderBar from "../../components/header-bar";
import SongBlock from "../../components/song-block";
import api from "./../../services/api";

function Song() {
  const { id } = useParams();
  const [song, setSong] = useState({
    name: "",
    timeSig: "",
    key: "",
    bpm: "",
    guide: {
      songBlocks: [],
    },
  });
  const [songBlockHighlighted, setSongBlockHighlighted] = useState(null);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const { data } = await api.get(`/songs/${id}`);
        setSong({ ...data, timeSig: data.time_sig });
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };
    fetchSong()
  }, []);

  const isHighlighted = (songblock) => {
    if (songBlockHighlighted === null) {
      return false;
    }

    return songblock === songBlockHighlighted;
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
          songTitle={song.name}
          songKey={song.key}
          bpm={song.bpm}
          timeSig={song.timeSig}
          songBlocks={song.guide.songBlocks}
          handleClickMap={handleClickMap}
        />
      </Flex>
      <Flex w="full" direction="column" mt="48">
        <VStack spacing={"6"} width="full" align={"stretch"}>
          {song.guide.songBlocks.length > 0
            ? song.guide.songBlocks.map((songBlock, index) => (
                <Element id={`${index}`} key={index}>
                  <SongBlock
                    highlight={isHighlighted(index)}
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
