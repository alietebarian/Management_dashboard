import React from 'react'
import Home from './component/Home'
import Header from './component/Header'
import { SearchProvider } from './context/SearchContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NewUser from './component/NewUser';
import UserDetails from './component/UserDetails';

export default function App() {

  //api های پروژه به خاطر غیر واقعی بودن کار نمیکند و متود های حذف و اضافه کردن کار نمیکند

  return (
    <SearchProvider>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="users/:id" element={<UserDetails />} />
          <Route path="/newUser" element={<NewUser />} />
        </Routes>
      </BrowserRouter>
    </SearchProvider>
  );
}
