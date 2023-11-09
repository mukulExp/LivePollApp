import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import Polls from './Polls';
import Chat from './Chat';
import Nav from './Nav';
import config from './../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const socket = io('https://h53wk2-3001.csb.app/');

function Home() {
  const [pollOptions, setPollOptions] = useState({});
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');
  const history = useNavigate();
  const [isTyping,setIsTyping] = useState('');
  const [poll,setPoll] = useState([]);
  useEffect(()=>{
   getPolls();
   getChatHistory();
  },[]);

  const axiosInstance = axios.create({
    baseURL: config.apiUrl,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('uToken')}`
    }
  });

  const getPolls =async ()=>{
   try{ 
   let pollData = await axiosInstance.get(`${config.apiUrl}api/polls`,{});
   setPoll(pollData.data);
  }catch(error)
  {
    console.log(error)
  }
  }
  const getChatHistory = async ()=>{
   try{
   let chats = await axiosInstance.get(`${config.apiUrl}api/chats`,{});
   if(chats.data.status)
   {
    setChatMessages(chats.data?.data);      
   }
   }catch(error)
   {
      console.log(error)
   }
  }
  useEffect(()=>{
    if(!message)
    setIsTyping('')
    checkAuth()
  })

  const checkAuth = ()=>{
    let token = localStorage.getItem('uToken');
    if(!token && token !== 'undefined')
    {
       history('/signup');  
    }
  }
  useEffect(() => {
    socket.on('pollOptions', (options) => {
      if(options[0])
      setPoll(options);
    },[]);

    socket.on('chatMessages', (messages) => {
      setChatMessages(messages);
    });

    socket.on('onType', (username) => {
        console.log("onType",username)
        setIsTyping(username);
      });
  }, []);

  const handleTyping = (username)=>{
    console.log("type",username)

    socket.emit('type',username);
  }

  const handleVote = (pollId,optionId) => {
    console.log("vote >>>>", pollId,optionId)
    socket.emit('vote', pollId,optionId);
  };

  const handleSend = (event) => {
    console.log("cscxcx",message)
    event.preventDefault();
    socket.emit('chatMessage', {message,username: localStorage.getItem('username') });
    setMessage('');
    handleTyping('')
  };

  return (
    <>
    <Nav/>
    <Container>
      <Row>
        <Col>
          <Polls pollOptions={poll} handleVote={handleVote}/>
        </Col>
        <Chat chatMessages={chatMessages} isTyping={isTyping} handleTyping={handleTyping} message={message} setMessage={setMessage} handleSend={handleSend}/>  
      </Row>
    </Container>
    </>
  );
}

export default Home;
