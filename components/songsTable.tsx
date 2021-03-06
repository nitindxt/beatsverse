import { Box } from "@chakra-ui/layout";
import { IconButton, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { GrPlayFill } from "react-icons/gr";
import { formatDate, formatTime } from "../lib/formatters";
import { useStore } from "../lib/store";

const SongsTable = ({ songs }: any) => {
  const playSongs = useStore((state: any) => state.changeActiveSongs);
  const setActiveSong = useStore((state: any) => state.changeActiveSong);

  const handlePlay = (activeSong?: any) => {
    setActiveSong(activeSong || songs[0]);
    playSongs(songs);
  };

  return (
    <Box bg="transparent" color="white" paddingX="40px">
      <Box padding="10px" mb="20px">
        <IconButton
          icon={<GrPlayFill fontSize="18px" />}
          aria-label="play-button"
          bgColor="Green"
          _hover={{
            bgColor: "#1df068",
          }}
          size="lg"
          isRound
          onClick={() => handlePlay()}
        />
      </Box>
      <Table variant="unstyled">
        <Thead borderBottom="1px solid" borderColor="rgba(255,255,255,0.2)">
          <Tr>
            <Th>#</Th>
            <Th>Title</Th>
            <Th>Date Added</Th>
            <Th>
              <AiOutlineClockCircle />
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {songs.map((song: any, i: number) => (
            <Tr
              sx={{
                transition: "all .3s ",
                "&:hover": {
                  bg: "rgba(255,255,255, 0.1)",
                },
              }}
              key={song.id}
              cursor="pointer"
              onClick={() => handlePlay(song)}
            >
              <Td>{i + 1}</Td>
              <Td>{song.name}</Td>
              <Td>{formatDate(song.createdAt)}</Td>
              <Td>{formatTime(song.duration)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default SongsTable;
