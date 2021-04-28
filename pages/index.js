// import Head from 'next/head';
// import styles from '../styles/Home.module.css';
// import Image from 'next/image';

import { GetServerSideProps } from 'next';
import { resetServerContext } from 'react-beautiful-dnd';

import Phases from '../components/Phases/Phases';
import TryingDnd from '../components/TryingDnd';

export default function Home() {
  return (
    <>
      <Phases />
    </>
  );
}

export const getServerSideProps = async ({ query }) => {
  resetServerContext(); // <-- CALL RESET SERVER CONTEXT, SERVER SIDE

  return { props: { data: [] } };
};
