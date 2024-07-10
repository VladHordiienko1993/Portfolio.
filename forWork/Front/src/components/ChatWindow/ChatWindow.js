import React, { useEffect, useState, useRef  } from "react";
import { useDispatch, useSelector } from "react-redux";
import {sessionUserRequest} from "../../slices/userSlices";
import {requestCreateChat, requestAddMessages,requestGetMessages} from "../../slices/chatSlices";
import cx from "classnames";
import styles from "./ChatWindow.module.scss";
import { Formik } from 'formik';
import { Form } from 'formik';
import { Field } from 'formik';
import LogoRobot1 from '../../logo/LogoRobot1.jpg';
import LogoRobot2 from '../../logo/LogoRobot2.png';


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
    // console.log(userId)
    SetActiveUserId(userId);
  };
  
  const onSubmit = (values, formikBag) => {
    dispatch(requestAddMessages({text: values.text, userId: activeUserid, chatId: chat}));
    formikBag.resetForm();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  
  return (
    <div className={styles.container}> 
      <h2 className={styles.textPage} >Choose who you want to be</h2>
      <div className={styles.wrapperButtons}>
        <button className={styles.button} onClick={() => switchUser(user.id)}> <img className={styles.imgUser} src={user.imgPath} /> {user.name}</button>
        <button className={styles.button} onClick={() => switchUser(2)}><img className={styles.imgUser} src={LogoRobot2} /> {bot1.name}</button>
        <button className={styles.button} onClick={() => switchUser(3)}><img className={styles.imgUser} src={LogoRobot1} /> {bot2.name}</button>
      </div>
  
 
  
      <div className={styles.divDiv}>
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
              
             <h2 className={styles.textMessage} ><img  className={styles.imgUser} src={user.userId === message.userId ? user.imgPath: bot} />{message.text}</h2> 
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
            <Field type="text" name="text" placeholder="TEXT" className={styles.input} />
            <Field name="submit" type="submit" value="Send" className={styles.button} />
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default ChatWindow;
