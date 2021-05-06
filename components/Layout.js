import Navbar from './Navbar/Navbar';
import { TodosProvider } from '../contexts/TodosContext';

const Layout = ({ children }) => {
  return (
    <>
      <TodosProvider>
        <Navbar />
        {children}
      </TodosProvider>
    </>
  );
};

export default Layout;
