// import Head from 'next/head';
// import styles from '../styles/Home.module.css';
// import Image from 'next/image';

import { resetServerContext } from 'react-beautiful-dnd';
import Phases from '@/components/phases/Phases';
import DayProgress from '@/components/DayProgress/DayProgress';

const Home = () => {
  return (
    <>
      <DayProgress />
      <Phases />
    </>
  );
};

export default Home;

export const getServerSideProps = async ({ query }) => {
  resetServerContext(); // <-- CALL RESET SERVER CONTEXT, SERVER SIDE

  return { props: { data: [] } };
};
