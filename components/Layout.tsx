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
            <link rel='preconnect' href='https://fonts.gstatic.com' />
            <link
              href='https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap'
              rel='stylesheet'
            />
          </Head>
          {children}
        </TodosProvider>
      </PhasesProvider>
    </AuthProvider>
  );
};

export default Layout;
