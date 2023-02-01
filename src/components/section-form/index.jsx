import { Box, CloseButton, Flex, Input, Select } from "@chakra-ui/react";
import CustomEditor from "../editor";

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

  const onChangeSectionOrder = (newOrder, sectionIndex) => {
    // const section = sections[sectionIndex];
    // const sectionsOrderChanged = sections.slice(
    //   newOrder,
    //   0,
    //   sections.slice(section.order, 1)[0]
    // );
    // onChangeSection(sectionsOrderChanged);
  };

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
      <Box w="2xl" bg={"white"} borderRadius="6" p="4" mb="4">
        <Flex justifyContent={"space-between"} mb="2">
          <Select
            w="fit-content"
            variant="outline"
            placeholder="Tipo"
            value={section.type}
            onChange={(ev) => onChangeSectionType(ev.target.value, index)}
          >
            <option value="intro">Intro</option>
            <option value="chorus">Refrão</option>
            <option value="verse">Verso</option>
            <option value="bridge">Ponte</option>
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
        {/* <Textarea
                onChange={(ev) => onChangeSectionContent(ev.target.value, index)}
              /> */}
        <CustomEditor
          name={index}
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
      <CloseButton size="lg" onClick={() => removeSection(index)} />
    </Flex>
  );
};

export default SectionForm;
