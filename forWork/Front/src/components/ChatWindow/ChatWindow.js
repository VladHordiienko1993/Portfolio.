import React, { useEffect, useState, useRef  } from "react";
import { useDispatch, useSelector } from "react-redux";
import {sessionUserRequest} from "../../slices/userSlices";
import {requestCreateChat, requestAddMessages,requestGetMessages} from "../../slices/chatSlices";
import cx from "classnames";
import styles from "./ChatWindow.module.scss";
import { Formik, Form, Field } from 'formik';
import LogoRobot1 from '../../logo/LogoRobot1.jpg';
import LogoRobot2 from '../../logo/LogoRobot2.png';
import LogoUser from '../../logo/LogoUser.png';


const ChatWindow = () => {

  const dispatch = useDispatch();
  const user = useSelector((state)=>state.users.users);
  const chat = useSelector((state)=>state.chats.chat);
  const messages = useSelector((state)=>state.chats.messages);
  const bot1 = useSelector((state)=>state.chats.bot1);
  const bot2 = useSelector((state)=>state.chats.bot2);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    dispatch(sessionUserRequest());
    dispatch(requestCreateChat());
  }, [dispatch]);
  
  useEffect(() => {
    if (chat) {
      dispatch(requestGetMessages({ chatId: chat }));
    }
  }, [dispatch, chat]); 
  useEffect(() => {
    if (user.id) {
      SetActiveUserId(user.id);
  
    }
  }, [user.id]);

  const [activeUserid, SetActiveUserId] = useState(user.id);
 
  const switchUser = (userId) => {
  
    SetActiveUserId(userId);
  };
  
  const onSubmit = (values, formikBag) => {
    dispatch(requestAddMessages({text: values.text, userId: activeUserid, chatId: chat}));
    formikBag.resetForm();
  };

  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  // const scrollToBottom = () => {
  //   setTimeout(() => {
  //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  //   }, 100); 
  // };


  // const scrollToBottom = () => {
  //   const chatContainer = document.getElementById("windowForChat");
  //   if (chatContainer) {
  //     chatContainer.scrollTop = chatContainer.scrollHeight;
  //   }
  // };
  
  // useEffect(() => {
  //   scrollToBottom();
  
  //   // Прокрутка при изменении размеров
  //   const handleResize = () => scrollToBottom();
  //   window.addEventListener("resize", handleResize);
  //   window.addEventListener("load", scrollToBottom);
  
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //     window.removeEventListener("load", scrollToBottom);
  //   };
  // }, [messages]);
  
  
  return (
    <div className={styles.container}> 
      <h2 className={styles.textPage} >Choose who you want to be</h2>
      <div className={styles.wrapperButtons}>
        <button className={styles.buttonUser} onClick={() => switchUser(user.id)}> <img className={styles.imgUser} src={user.imgPath || LogoUser} /> {user.name}</button>
        <button className={styles.buttonUser} onClick={() => switchUser(2)}><img className={styles.imgUser} src={LogoRobot2} /> {bot1.name}</button>
        <button className={styles.buttonUser} onClick={() => switchUser(3)}><img className={styles.imgUser} src={LogoRobot1} /> {bot2.name}</button>
      </div>
  
 
  
      <div className={styles.windowForChat} id="windowForChat">
        {messages.map((message) => {
          const isCurrentUser = message.userId === activeUserid;
          
          const messageClass = cx(styles.message, {
            [styles.currentUser]: isCurrentUser,
            [styles.otherUser]: !isCurrentUser
          });
let bot;
          if(message.userId === 2){
             bot = LogoRobot2;
          };
          if(message.userId === 3){
             bot = LogoRobot1;
          }

          return (

<div key={message.id} className={messageClass}>
  {console.log(activeUserid)}
  <div className={styles.messageContainer}>
    <h2 className={styles.textMessage}>
      <img
        className={styles.imgUser}
        src={
          message.userId === user.id ? (user.imgPath || LogoUser) :
          message.userId === 2 ? LogoRobot2 :
          message.userId === 3 ? LogoRobot1 : null
        }
        alt="User Avatar"
      />
      {message.text}
    </h2>
    <span className={styles.timestamp}>
      {new Date(message.createdAt).toLocaleTimeString()} 
    </span>
  </div>
</div>




          );
        })}
           <div ref={messagesEndRef} />
      </div>
           <Formik
        enableReinitialize
        onSubmit={onSubmit}
        initialValues={{text: ''}}
      >
        {(formikProps) => (
          <Form className={styles.form}>
            <div className={styles.inputWrapper}>
              <img className={styles.imgUser} src={ activeUserid === user.id ? (user.imgPath || LogoUser) :
                 activeUserid === 2 ? LogoRobot2 :
                 activeUserid === 3 ? LogoRobot1 : null} />
               <Field type="text" name="text" placeholder="TEXT" className={styles.input} />
            </div>
           
            <Field name="submit" type="submit" value="Send" className={styles.button} />
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default ChatWindow;
