import { Avatar, Box, Heading, Text, VStack } from "@chakra-ui/react";
import { useMemo } from "react";
import SongBlockChord from "../song-block-chord";
import SongBlockComment from "../song-block-comment";
import reactStringReplace from "react-string-replace";
import { typeMapping } from "../../types/song-block";

const SongBlock = ({
  title,
  text,
  comments,
  highlight = false,
  repeat = 0,
}) => {
  const colorHighLight = () => {
    return highlight ? "gray.300" : "gray.100";
  };

  const parseBlock = (text) => {
    let parsedTextList = [];
    const splitedText = text
      .replaceAll("</p>", "")
      .split("<p>")
      .filter((el) => el !== "" && el !== " " && el !== undefined);

    const isOnlyChords =
      text
        .split(/\[.*?\]/)
        .map(el => el.replace(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g, ""))
        .map(el => el.replace(/\(([^\)]+)\)/g, ""))
        .filter((el) => !["<br>", "<p>", "</p>"].includes(el.trim()))
        .filter((el) => el !== "" && el !== " ").length === 0;

    if (!isOnlyChords) {
      parsedTextList = splitedText.map((el) =>
        reactStringReplace(el, /\[(.*?)\]/, (match, i) => (
          <SongBlockChord key={i} chord={match} />
        ))
      );
    } else {
      parsedTextList = splitedText.map((el) =>
        reactStringReplace(el, /\[(.*?)\]/, (match, i) => (
          <SongBlockChord key={i} chord={match} notAbsolute={true} />
        ))
      );
    }

    parsedTextList = parsedTextList.map((parsedText) =>
      reactStringReplace(parsedText, /\(([^\)]+)\)/, (match, i) => (
        <CommentBlock key={i} text={match} />
      ))
    );

    return (
      <VStack align={"start"} spacing="8" pt="4">
        {parsedTextList.map((parsed, index) => (
          <Box position={"relative"} key={index}>
            {parsed}
          </Box>
        ))}
      </VStack>
    );
  };

  const textParsed = useMemo(() => parseBlock(text), [text]);

  return (
    <Box
      position={"relative"}
      padding="8"
      borderRadius={6}
      border="3px solid"
      borderColor={colorHighLight()}
      background="transparent"
      fontSize="lg"
    >
      <Heading
        size="sm"
        position="absolute"
        top="-10px"
        background={"#FAFAFB"}
        px="2"
        display={"flex"}
        alignItems="center"
      >
        <Avatar name={typeMapping(title)} size={"xs"} mr="2" bg="green.400" />
        <Text textTransform={"uppercase"} fontWeight="normal">
          {typeMapping(title)}
        </Text>
        <Text ml="2" fontSize="larger" fontWeight={"bold"}>
          {repeat !== 0 ? `${repeat}x` : null}
        </Text>
      </Heading>
      {comments && <SongBlockComment text={comments} />}
      {textParsed}
    </Box>
  );
};

const CommentBlock = ({ text }) => (
  <Text
    color={"orange.400"}
    fontStyle="italic"
    fontWeight={"bold"}
    fontSize="md"
  >
    {text}
  </Text>
);

export default SongBlock;
