import { TodosProvider } from '../logic/useTodos/useTodos';
import { AuthProvider } from '../logic/useAuth/useAuth';
import Head from 'next/head';
import PhasesProvider from '../logic/usePhases/usePhases';

const Layout: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <PhasesProvider>
        <TodosProvider>
          <Head>
            <title>Starling</title>
            <link rel='shortcut icon' href='/logo.svg' />
          </Head>
          {children}
        </TodosProvider>
      </PhasesProvider>
    </AuthProvider>
  );
};

export default Layout;
