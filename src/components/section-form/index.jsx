import {
  Box,
  CloseButton,
  Flex,
  Input,
  Select,
} from "@chakra-ui/react";
import CustomEditor from "../editor";
import SongBlock from "../song-block";
import { typeMapping, TYPES } from "../../types/song-block";

const SectionForm = ({
  section,
  index,
  onChangeSection,
  sectionsRef,
  removeSection,
}) => {
  const onChangeSectionContent = (contentHtml, sectionIndex) => {
    onChangeSection(
      updateSectionByIndex({ field: "text", value: contentHtml }, sectionIndex)
    );
  };

  const onChangeSectionOrder = (newOrder, sectionIndex) => {};

  const onChangeSectionType = (sectionType, sectionIndex) => {
    onChangeSection(
      updateSectionByIndex({ field: "name", value: sectionType }, sectionIndex)
    );
  };

  const onChangeComment = (comment, sectionIndex) => {
    onChangeSection(
      updateSectionByIndex({ field: "comments", value: comment }, sectionIndex)
    );
  };

  const updateSectionByIndex = ({ field, value }, sectionIndex) => {
    return sectionsRef.current.map((section, index) =>
      index === sectionIndex ? { ...section, [field]: value } : section
    );
  };

  return (
    <Flex
      mt="4"
      borderTop={"1px"}
      borderTopColor="gray.300"
      pt="4"
      justifyContent={"space-between"}
    >
      <Box w="2xl" bg={"white"} borderRadius="6" p="4" mb="4" h="fit-content">
        <Flex justifyContent={"space-between"} mb="2">
          <Select
            w="fit-content"
            variant="outline"
            placeholder="Tipo"
            value={section.name}
            onChange={(ev) => onChangeSectionType(ev.target.value, index)}
          >
            {Object.keys(TYPES).map((property, index) => (
              <option value={property} key={index}>{typeMapping(property)}</option>
            ))}
          </Select>
          <Select
            w="fit-content"
            placeholder="Ordem"
            value={section.order}
            onChange={(ev) => onChangeSectionOrder(ev.target.value, index)}
          >
            {Array.from(Array(sectionsRef.length).keys()).map(
              (order, index) => (
                <option key={index} value={order}>
                  {order + 1}
                </option>
              )
            )}
          </Select>
        </Flex>
        <CustomEditor
          name={index}
          content={section.text}
          onChange={(contentHtml) => {
            onChangeSectionContent(contentHtml, index);
          }}
        />
        <Input
          placeholder="Comentários"
          mt="2"
          value={section.comments}
          onChange={(ev) => onChangeComment(ev.target.value, index)}
        />
      </Box>
      <Box bgColor="whiteAlpha.800" w="2xl" p="4" borderRadius={"8"} mb="4" ml="2">
        <SongBlock
          title={section.name}
          text={section.text}
          comments={section.comments ?? ""}
          repeat={section.shouldRepeat}
        />
      </Box>
      <CloseButton size="lg" mt="2" onClick={() => removeSection(index)} />
    </Flex>
  );
};

export default SectionForm;
