import { Box, Button, Flex, Grid, Heading, HStack, Input, Link, Skeleton, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import { format } from "date-fns";
import React, { useCallback, useEffect, useState } from "react";
import Container from "../../components/container";
import { Link as RouterLink } from "react-router-dom";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

import api from "../../services/api";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loading, setLoading] = useState(false)
  const [playlists, setPlaylists] = useState([]);

  const fetchPlaylists = useCallback(async () => {
    try {
      setLoading(true)
      const { data } = await api.get('/playlists')
      setPlaylists(playlistMapper(data));
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    fetchPlaylists()
  }, []);


  const playlistMapper = (data) => data.map(row => ({
    id: row.id,
    name: row.name,
    date: new Date(row.date),
    music_qtt: row.songs.length ?? 0,
  }))

  return (
    <Container>
      <Button colorScheme={"blue"} size="sm" mb="4" onClick={onOpen}>
        Nova playlist 
      </Button>
      <Grid templateColumns='repeat(4, 1fr)' gap={4}>
        {
          loading ? (
            <>
              <Skeleton width="sm" height="28" borderRadius="8"/>
              <Skeleton width="sm" height="28" borderRadius="8"/>
              <Skeleton width="sm" height="28" borderRadius="8"/>
              <Skeleton width="sm" height="28" borderRadius="8"/>
              
            </>
          ) : playlists.map((playlist, index) => (
            <Playlist data={playlist} key={index} />
          ))
        }
      </Grid>
      <NewPlaylist
        isOpen={isOpen}
        onClose={onClose}
        onFetchPlaylists={fetchPlaylists}
      />
    </Container>
  );
}

const Playlist = ({ data, outdated = false }) => {
  const title = `${data.name ?? "[sem nome]"}`;

  return (
    <RouterLink to={`/playlist/${data.id}`}>
      <Box
        m="0"
        bgColor={"white"}
        w="sm"
        p="4"
        borderRadius={"8"}
        cursor="pointer"
        transition={".2s ease"}
        textDecoration="none"
        _hover={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        <Heading size="sm" mb="1">
          {title}
        </Heading>
        <Text fontSize={"xs"} color="gray.400">
          {data.music_qtt ?? 0} músicas
        </Text>
        <Text fontSize="sm" color="gray.700" mt="2">
          {format(data.date, "dd/MM/yy")}
        </Text>
      </Box>
    </RouterLink>
  );
};


const NewPlaylist = ({ isOpen, onClose, fetchPlaylists }) => {
  const [url, setUrl] = useState("")
  const [playlist, setPlaylist] = useState({
    name: "",
    channelTitle: ""
  })
  const [loadingPreview, setLoadingPreview] = useState(false)
  const [loadingImport, setLoadingImport] = useState(false)

  useEffect(() => {
    const getPlaylistFromYoutube = setTimeout(async () => {
      try {
        if (url === "") {
          return;
        }
        setLoadingPreview(true)
        const { data } = await api.post('/playlists/preview', {
          url
        })
        setPlaylist({
          name: data.name ?? "",
          channelTitle: data.channel_title ?? "",
          externalId: data.external_playlist_id ?? "",
        })
      } catch (error) {
        console.log(error)
      }
      setLoadingPreview(false)
      return () => clearTimeout(getPlaylistFromYoutube)
    }, 1000)
  }, [url])

  const handleImport = async () => {
    setLoadingImport(true)
    const { externalId } = playlist
    try {
      await api.post('/playlists/import/youtube', {
        external_id: externalId
      })
      onClose()
      await fetchPlaylists()
    } catch (error) {
      console.log(error)
    }

    setLoadingImport(false)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Importar playlist</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Cole a URL da playlist no youtube"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Flex mt="2" justifyContent={"center"} borderRadius={"8"}>
            {loadingPreview ? (
              <Spinner size="xl" textAlign={"center"} />
            ) : playlist.name ? (
                  <Box
                    bgColor={"white"}
                    w="full"
                    p="4"
                    borderRadius={"8"}
                    transition={".2s ease"}
                    textDecoration="none"
                    border="1px"
                    borderColor={"gray.100"}
                  >
                    <Heading size="sm" fontWeight={"bold"}>{playlist.name}</Heading>
                    <Text mt="2" color={"gray.400"} size="2xs">{playlist.channelTitle}</Text>
                  </Box>
                ) : null
            }
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button size="sm" colorScheme={"blue"} mr={3} onClick={() => handleImport()} isLoading={loadingImport}>Importar</Button>
          <Button variant="ghost" onClick={onClose} size="sm">
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}