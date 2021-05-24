import { TodosProvider } from '../logic/useTodos/useTodos';
import { AuthProvider } from '../logic/useAuth/useAuth';
import Head from 'next/head';

const Layout: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <Head>
        <title>Starling</title>
        <link rel='shortcut icon' href='/logo.svg' />
      </Head>
      <TodosProvider>{children}</TodosProvider>
    </AuthProvider>
  );
};

export default Layout;
