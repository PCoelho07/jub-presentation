import { Box, Text } from "@chakra-ui/react";
import React from "react";

function SongBlockComment({ text }) {
  return (
    <Box position={"absolute"} right="5" top="5" fontSize="md" color="gray.400" fontWeight={"bold"}>
      <Text>{text}</Text>
    </Box>
  );
}

export default SongBlockComment;
