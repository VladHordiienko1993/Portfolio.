import { useEffect } from "react";

 const useClickOutside = (ref,callBack)=>{
  const handleClick = (e)=>{
    if(ref.current.contains(e.target) ||  !ref.current.contains(e.target)){
      callBack();
    }
  };
  useEffect(()=>{
      window.addEventListener('mousedown',handleClick);
      return ()=> window.removeEventListener('mousedown',handleClick);
    });
};
export default useClickOutside;