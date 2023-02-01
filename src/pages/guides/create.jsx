import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Flex,
  Heading,
  HStack,
} from "@chakra-ui/react";
import Container from "../../components/container";
import { useParams } from "react-router-dom";
import SectionForm from "../../components/section-form";

function Guides() {
  const { id } = useParams();
  const defaultSection = {
    name: "",
    order: 0,
    text: "",
    comments: ""
  };

  const [sections, _setSections] = useState([defaultSection]);
  const sectionsRef = useRef(sections);

  const setSections = (data) => {
    sectionsRef.current = data;
    _setSections(data);
  };

  const addSection = () => {
    setSections([...sections, { ...defaultSection, order: sections.length }]);
  };

  const removeSection = (sectionIndex) => {
    setSections(sections.filter((section, index) => index !== sectionIndex));
  };

  return (
    <Container>
      <Heading fontSize="lg" mb="4">
        Novo guia - Tremenda graça
      </Heading>
      <HStack>
        <Button colorScheme="blue" size="sm" onClick={() => console.log(sections)}>
          Salvar
        </Button>
        <Button colorScheme="blue" variant="outline" size="sm" onClick={() => console.log(sections)}>
          Preview
        </Button>
      </HStack>
      {sections.map((section, index) => (
        <SectionForm
          key={index}
          section={section}
          index={index}
          onChangeSection={setSections}
          sectionsRef={sectionsRef}
          removeSection={removeSection}
        />
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
