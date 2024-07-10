import React, { useContext } from 'react';
import { ThemeContext } from '../context';
import ChatWindow from '../components/ChatWindow/ChatWindow';



const ChatPage = () => {
 
  const {useSetClassName} = useContext(ThemeContext);
  const {classNamePage} = useSetClassName();
  

  return (
    <div className={classNamePage()}>
  <ChatWindow/>
    </div>
   
  );
}

export default ChatPage;
