import React, { useEffect, useState } from "react";
import { 
  Badge, 
  Box, 
  Button, 
  Flex, 
  Heading, 
  HStack, 
  Skeleton, 
  Stack, 
  Text, 
  useDisclosure, 
  VStack, 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Input,
  TagLabel,
  FormLabel,
  Switch,
  Checkbox
} from "@chakra-ui/react";

import { Link, useParams } from "react-router-dom";
import { MdKeyboardTab } from "react-icons/md";
import Container from "../../components/container";
import api from "../../services/api";

function Playlist() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loading, setLoading] = useState(false)
  const [playlist, setPlaylist] = useState({
    name: "",
    songs: []
  });
  const { id } = useParams();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true)
        const { data: { playlist_name, songs } } = await api.get(`/playlists/${id}/songs`)
        setPlaylist({
          songs: songs.map(row => ({
            id: row.id,
            name: row.name,
            key: row.key,
            bpm: row.bpm,
            sigTime: row.sigTime,
            hasGuide: row.hasGuide
          })),
          name: playlist_name,
        })
      } catch (error) {
        alert("ERROR!")
        console.log(error)
      }

      setLoading(false)
    }

    fetchSongs()
  }, [id]);

  const chooseLinkTo = (song) => {
    return song.hasGuide 
    ? `/song/${song.id}`
    : `/song/create-guide/${song.id}`
  }

  return (
    <Container>
      <Flex alignItems="baseline">
        <Heading fontSize={"lg"} mb="4">
          {loading ? (
            <Skeleton height='7' width='28' />
          ) : playlist?.name}
        </Heading>
        <Button ml="2" colorScheme="blue" size="xs" onClick={onOpen}>
          Editar
        </Button>
      </Flex>
      <VStack width={"full"} spacing="2" align={"stretch"}>
        {
          loading ? (
            <VStack width={"full"} spacing="2" align={"stretch"}>
              <Skeleton height='16' borderRadius="8" />
              <Skeleton height='16' borderRadius="8" />
              <Skeleton height='16' borderRadius="8" />
            </VStack>
          ) : playlist.songs.length > 0 ? (
                playlist.songs.map((song, index) => (
                  <Song song={song} key={index} chooseLinkTo={chooseLinkTo} />
                ))
              ) : null
        }
      </VStack>
      <EditPlaylist
        isOpen={isOpen}
        onClose={onClose}
        playlist={playlist}
      />
    </Container>
  );
}

function Song({ song, chooseLinkTo }) {
  return ( 
    <Link to={chooseLinkTo(song)}>
      <Box
        bgColor="white"
        borderRadius="8"
        padding="4"
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        transition={".2s ease"}
        _hover={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        <Flex direction={"column"}>
          <Heading fontSize={"md"}>{song.name}</Heading>
          <HStack divider={<>&bull;</>} gap="2">
            <Text fontSize={"xs"} pt="0.5">
              Tom: {song.key}
            </Text>

            <Text fontSize={"xs"} pt="0.5">
              BPM: {song.bpm}
            </Text>

            <Text fontSize={"xs"} pt="0.5">
              Assinatura de tempo: {song.sigTime}
            </Text>
          </HStack>
        </Flex>
        <Flex>
          {
            !song.hasGuide ? (<Badge colorScheme={"red"} mr="2">Sem guia</Badge>) : null
          }
          
          <MdKeyboardTab size={"20px"} />
        </Flex>
      </Box>
    </Link>
  )
}

function EditPlaylist({ playlist, isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar - {playlist.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>
                Nome:
              </FormLabel>
              <Input value={playlist.name} />
            </FormControl>
            <FormControl mt="2">
              <FormLabel>
                Músicas:
              </FormLabel>
              <Input placeholder="Buscar" mb="2"/>
              <VStack align={"stretch"} maxHeight="48" overflowX={"auto"} p="2">
                {
                   playlist.songs.map((song, index) => (
                    <Checkbox defaultChecked key={index}>
                      <Text p="0" m="0">{song.name}</Text>
                    </Checkbox>
                  ))
                }
              </VStack>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button variant='ghost'>Salvar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default Playlist;
