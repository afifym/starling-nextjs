import { resetServerContext } from 'react-beautiful-dnd';
import Phases from '../components/Phases/Phases';
import DayProgress from '../components/DayProgress/DayProgress';
import { Box } from '@chakra-ui/layout';
import Navbar from '../components/Navbar/Navbar';
// import { useAuth } from '../logic/useAuth/useAuth';
// import { getUserData } from '../firebase/firestore';
// import { useEffect } from 'react';
// import { useTodos } from '../logic/useTodos/useTodos';

const Home = () => {
  // const { currentUser } = useAuth();
  // const { setTodos } = useTodos();

  // useEffect(() => {
  //   const getData = async (uid) => {
  //     const userData = await getUserData(uid);
  //     console.log('data coming: ', userData);
  //     setTodos(userData.todos);
  //   };

  //   if (currentUser?.uid) {
  //     getData(currentUser?.uid);
  //   }
  // }, []);

  return (
    <Box>
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
