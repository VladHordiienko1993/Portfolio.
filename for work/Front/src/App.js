import React from 'react';
import { lazy, Suspense } from "react";
import {BrowserRouter, NavLink, Routes, Route} from "react-router-dom";
import TopOfSite from "./components/TopOfSite";

const HomePage = lazy(()=>import('./pages/HomePage'));
const UserPage = lazy(()=>import('./pages/UserPage'));
const App = ()=> {
  return (
<BrowserRouter>
<TopOfSite/> 

<Suspense fallback={<div>Loading...</div>}>
  <Routes>
  <Route path="/" element={<HomePage/>} />
  <Route path="/userRegistration" element={ <UserPage/>} />
</Routes>
</Suspense>
</BrowserRouter>


  );
}

export default App;
