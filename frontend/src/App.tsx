import { Outlet } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <h1 className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <div className="container mx-auto">
        <SearchBar />
      </div>
      <main className="mt-2 mb-auto px-2">
        <Outlet />
      </main>
      <Footer />
    </h1>
  );
}

export default App;
