import React from "react";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeContext, UserContext } from "./context";
import { useSetClassName, useAuth } from "./hooks";
import Header from "./components/Header";
import Footer from './components/Footer/index';
const HomePage = lazy(() => import("./pages/HomePage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const SignUpWithEmail = lazy(()=>import('./pages/SignUpWithEmailPage'));
const SignInPage = lazy(()=>import('./pages/SignInPage'));

const App = () => {
  return (
    <UserContext.Provider value={{useAuth}}>
    <ThemeContext.Provider value={{ useSetClassName }}>
      <BrowserRouter>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signUpPage" element={<SignUpPage />} />
            <Route path='/signUpWithEmail' element={<SignUpWithEmail/>} />
            <Route path='/signIn' element={<SignInPage/>} />
          </Routes>
        </Suspense>
        <Footer/>
      </BrowserRouter>
    </ThemeContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
