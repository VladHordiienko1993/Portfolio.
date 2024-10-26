import React from "react";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeContext, UserContext } from "./context";
import { useSetClassName, useAuth } from "./hooks";
import Header from "./components/Header";
import Footer from './components/Footer/index';
import Spinner from './components/Spinner/Spinner';
const HomePage = lazy(() => import("./pages/HomePage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const SignUpWithEmail = lazy(()=>import('./pages/SignUpWithEmailPage'));
const LogInPage = lazy(()=>import('./pages/LogInPage'));
const ChatPage = lazy(()=>import('./pages/ChatPage'));

const App = () => {
  return (
    <UserContext.Provider value={{useAuth}}>
    <ThemeContext.Provider value={{ useSetClassName }}>
      <BrowserRouter> <Suspense fallback={<Spinner/>}>
        <Header />
       
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signUpPage" element={<SignUpPage />} />
            <Route path='/signUpWithEmail' element={<SignUpWithEmail/>} />
            <Route path='/logIn' element={<LogInPage/>} />
            <Route path='/chat' element={<ChatPage/>} />
          </Routes>
       
        <Footer/> </Suspense>
      </BrowserRouter>
    </ThemeContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
