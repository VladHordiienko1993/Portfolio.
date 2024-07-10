import React from "react";
import { useSelector } from "react-redux";

const useAuth = () => {
  const { id, token, email, name } = useSelector((state) => state.users.users);
  return {
    isAuth: !!email,
    id,
    token,
    email,
    name,
  };
};

export default useAuth;
