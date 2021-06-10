import { resetServerContext } from "react-beautiful-dnd";
import Phases from "../components/Phases/Phases";
import DayProgress from "../components/DayProgress/DayProgress";
import { Box } from "@chakra-ui/layout";
import Navbar from "../components/Navbar/Navbar";
import { useAuth } from "../logic/useAuth/useAuth";
import { getUserData } from "../firebase/firestore";
import { useEffect } from "react";
import { useTodos } from "../logic/useTodos/useTodos";
import { usePhases } from "../logic/usePhases/usePhases";

const Home = () => {
  const { currentUser } = useAuth();
  const { setIsFollowPrayers } = usePhases();
  const { setTodos, setTags, setTrayLength } = useTodos();

  useEffect(() => {
    const getData = async (uid) => {
      const userData = await getUserData(uid);
      setTodos(userData.todos);
      setTrayLength(userData.todos[0].length);
      setTags(userData.tags);
      setIsFollowPrayers(userData.followPrayers);
    };

    if (currentUser?.uid) {
      getData(currentUser?.uid);
    }
  }, []);

  return (
    <Box maxWidth="100vw" overflow="hidden">
      <Navbar />
      <DayProgress />
      <Phases />
    </Box>
  );
};

export default Home;

export const getServerSideProps = async () => {
  resetServerContext(); // <-- CALL RESET SERVER CONTEXT, SERVER SIDE

  return { props: { data: [] } };
};
