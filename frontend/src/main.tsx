import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Hero from './pages/Hero.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppContextProvider } from './context/AppContext.tsx';
import AddHotel from './pages/AddHotel.tsx';
import MyHotels from './pages/MyHotels.tsx';
import EditHotel from './pages/EditHotel.tsx';
import Search from './pages/Search.tsx';
import { SearchContextProvider } from './context/SearchContext.tsx';
import 'react-datepicker/dist/react-datepicker.css';
import Details from './pages/Details.tsx';
import Booking from './pages/Booking.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Hero />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="add-hotel" element={<AddHotel />} />
      <Route path="my-hotels" element={<MyHotels />} />
      <Route path="edit-hotel/:id" element={<EditHotel />} />
      <Route path="/search" element={<Search />} />
      <Route path="/details/:id" element={<Details />} />
      <Route path="/hotel/:id/booking" element={<Booking />} />
    </Route>
  )
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <SearchContextProvider>
          <RouterProvider router={router} />
        </SearchContextProvider>
      </AppContextProvider>
    </QueryClientProvider>
    <Toaster />
  </React.StrictMode>
);
