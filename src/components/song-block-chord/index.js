import { Box } from "@chakra-ui/react";
import React from "react";

function SongBlockChord({ chord, notAbsolute = false }) {
  if (notAbsolute) {
    return (
      <Box as="span" fontSize={"md"} top="-22px" fontWeight={"bold"}>
        {chord}
      </Box>
    );
  }

  return (
    <Box
      as="span"
      fontSize={"md"}
      position={"absolute"}
      top="-22px"
      fontWeight={"bold"}
    >
      {chord}
    </Box>
  );
}

export default SongBlockChord;
