import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  CloseButton,
  Flex,
  Heading,
  Select,
  Textarea,
} from "@chakra-ui/react";
import Container from "../../components/container";
import { useParams } from "react-router-dom";
import CustomEditor from "../../components/editor";

function Guides() {
  const defaultSection = {
    type: "",
    order: 0,
    text: "",
  };
  
  const { id } = useParams();
  const [sections, _setSections] = useState([defaultSection]);
  const sectionsRef = useRef(sections);

  const setSections = (data) => {
    sectionsRef.current = data;
    _setSections(data);
  };

  const addSection = () => {
    setSections([...sections, { ...defaultSection, order: sections.length }]);
  };

  const onChangeSectionContent = (contentHtml, sectionIndex) => {
    const newSections = sectionsRef.current.map((section, index) =>
      index === sectionIndex ? { ...section, text: contentHtml } : section
    );
    setSections(newSections);
  };

  const onChangeSectionOrder = (newOrder, sectionIndex) => {
    const section = sections[sectionIndex];
    const sectionsOrderChanged = sections.slice(
      newOrder,
      0,
      sections.slice(section.order, 1)[0]
    );
    setSections(sectionsOrderChanged);
  };

  const onChangeSectionType = (sectionType, sectionIndex) => {
    const sectionsUpdated = sections.map((section, index) =>
      index === sectionIndex ? { ...section, type: sectionType } : section
    );
    setSections(sectionsUpdated);
  };

  const removeSection = (sectionIndex) => {
    setSections(sections.filter((section, index) => index !== sectionIndex));
  };

  return (
    <Container>
      <Heading fontSize="lg" mb="4">
        Novo guia - Tremenda graça
      </Heading>
      <Button colorScheme="blue" onClick={() => console.log(sections)}>Preview</Button>
      {sections.map((section, index) => (
        <Flex
          key={index}
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
                placeholder="Seção"
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
                {Array.from(Array(sections.length).keys()).map(
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
          </Box>
          <CloseButton size="lg" onClick={() => removeSection(index)} />
        </Flex>
      ))}
      <Flex justifyContent={"center"}>
        <Button
          variant={"outline"}
          colorScheme="blue"
          size="sm"
          onClick={() => addSection()}
        >
          Adicionar seção
        </Button>
      </Flex>
    </Container>
  );
}

export default Guides;
