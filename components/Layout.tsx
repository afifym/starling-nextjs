import Navbar from './Navbar/Navbar';
import { TodosProvider } from '../logic/useTodos/useTodos';

interface IProps {
  children: JSX.Element;
}

const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <TodosProvider>
      <Navbar />
      {children}
    </TodosProvider>
  );
};

export default Layout;
