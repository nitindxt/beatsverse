import { GradientLayout } from "../../components/gradientLayout";
import SongsTable from "../../components/songsTable";
import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";

const getBGColor = (id: number) => {
  const colors = [
    "red",
    "green",
    "gray",
    "cyan",
    "purple",
    "teal",
    "blue",
    "orange",
    "yellow",
    "pink",
  ];
  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};

const Playlist = ({ playList }: any) => {
  const id = playList.name.split(" ")[1];
  const color = getBGColor(id);
  return (
    <GradientLayout
      color={color}
      title={playList.name}
      image={`https://picsum.photos/200/?random=${id}`}
      subtitle="playlist"
      desc={`${playList.songs.length} songs`}
      roundImage={false}
      isLoaded
    >
      <SongsTable songs={playList.songs} />
    </GradientLayout>
  );
};

export const getServerSideProps = async ({ query, req }: any) => {
  let user;
  try {
    user = validateToken(req.cookies.BEATSVERSE_ACCESS_TOKEN);
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }
  const [playList] = await prisma.playlist.findMany({
    where: {
      id: query.id,
      userId: user.id,
    },

    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  }); // get the playlist where the id = id on url, userId = id of current logged in user and then include(join in sql) songs with artist of that song by selecting only his/her name and id.

  return {
    props: { playList },
  };
};

export default Playlist;
