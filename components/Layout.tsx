import Navbar from './Navbar/Navbar';
import { TodosProvider } from '../logic/useTodos/useTodos';
import { AuthProvider } from '../logic/useAuth/useAuth';

interface IProps {
  children: JSX.Element;
}

const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <AuthProvider>
      <TodosProvider>{children}</TodosProvider>
    </AuthProvider>
  );
};

export default Layout;
