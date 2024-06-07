import { Outlet } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';

function App() {
  return (
    <h1 className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <main className="mt-2 mb-auto px-2">
        <Outlet />
      </main>
      <Footer />
    </h1>
  );
}

export default App;
