import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Button,
  Flex,
  Heading,
  HStack,
  Input,
  useToast,
} from "@chakra-ui/react";
import Container from "../../components/container";
import { useParams } from "react-router-dom";
import SectionForm from "../../components/section-form";
import api from "../../services/api";

function Guides() {
  const toast = useToast();
  const { id } = useParams();
  const defaultSection = {
    name: "",
    order: 0,
    text: "",
    comments: "",
  };

  const [song, setSong] = useState({
    name: "",
    key: "",
    bpm: 0,
    timeSig: ""
  });
  // const [songEditableData, setSongEditableData] = useState({
  //   key: "",
  //   bpm: 0,
  //   timeSig: ""
  // })
  const [sections, _setSections] = useState([defaultSection]);
  const [saveLoading, setSaveLoading] = useState(false);
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

  const handleSave = async () => {
    try {
      setSaveLoading(true);
      await api.put("/songs", {
        song_id: id,
        name: "Guia",
        key: song.key,
        bpm: song.bpm,
        time_sig: song.timeSig,
        song_blocks: sections,
      });
      toast({
        title: "Aeeew",
        description: "Mapa salvo com sucesso!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Oops",
        description: "Ocorreu um erro ao salvar o mapa.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    setSaveLoading(false);
  };

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const { data } = await api.get(`/songs/${id}`);
        
        const guide = data.guide;
        if (guide) {
          setSections(guide.songBlocks);
        }
        setSong(data);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    };

    fetchSong();
  }, []);

  return (
    <Container>
      <Flex justifyContent={"space-between"} alignItems="baseline">
        <Heading fontSize="xl" mb="4">
          {song.name}
        </Heading>
        <HStack
          mb="2"
          bgColor={"white"}
          p="4"
          borderRadius={"8"}
          w="fit-content"
        >
          <Input placeholder="Tom" w="3xs" value={song.key} onChange={(ev) => setSong({ ...song, key: ev.target.value })} />
          <Input placeholder="Assinatura de tempo" w="3xs" value={song.timeSig} onChange={(ev) => setSong({ ...song, timeSig: ev.target.value })} />
          <Input placeholder="BPM" w="3xs" value={song.bpm} onChange={(ev) => setSong({ ...song, bpm: ev.target.value })} />
        </HStack>
      </Flex>
      <HStack>
        <Button
          colorScheme="blue"
          size="sm"
          onClick={() => handleSave()}
          isLoading={saveLoading}
        >
          Salvar
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
