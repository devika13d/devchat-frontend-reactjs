import React, { useState, useEffect, useRef, useContext } from 'react';
import './conversation.css';
import { useParams } from 'react-router-dom';
import { getAPI, senderAPI } from '../services/allAPI';
import toast from 'react-hot-toast';
import { useSocketContext } from '../context/Socket';
import { messageContext } from '../context/AuthContext';
import EmojiPicker from 'emoji-picker-react';
import { emojify } from 'react-emoji';
import notification from '../assets/happy-pop-2-185287.mp3'


function Conversation() {
  const { onlineUsers } = useSocketContext();
  const { contactId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const lastMsgRef = useRef(null);
  const inputRef = useRef(null);
  const messageContainerRef = useRef(null);
  const { socket } = useSocketContext();
  const { setAddMessages } = useContext(messageContext);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showScrollUpArrow, setShowScrollUpArrow] = useState(false);

  const [messageShakeMap, setMessageShakeMap] = useState({});
  const audioRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage) {
      toast.error('Message cannot be empty');
      return;
    }

    await sendMessage(newMessage);
    setNewMessage('');
  };

  const handleEmojiClick = (emojiObject, event) => {
    setNewMessage(prevMessage => prevMessage + emojiObject.emoji);
  };

  useEffect(() => {
    const handleMessage = (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);


      setMessageShakeMap((prevShakeMap) => {
        return { ...prevShakeMap, [newMessage.id]: true };
      });
      audioRef.current.play();

    };

    if (socket) {
      socket.on('newMessage', handleMessage);
    }

    return () => {
      if (socket) {
        socket.off('newMessage', handleMessage);
      }
    };
  }, [socket, setAddMessages]);

  useEffect(() => {
    if (lastMsgRef.current) {
      lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const reqHeader = {
          "Authorization": `Bearer ${token}`
        };

        const response = await getAPI(contactId, reqHeader);

        const deletedMessages = JSON.parse(localStorage.getItem('deletedMessages')) || [];
        const filteredMessages = response.data.filter(message => !deletedMessages.includes(message._id));
        setMessages(filteredMessages.map(message => ({
          ...message,
          message: emojify(message.message)
        })));

        console.log(response.data);
      } catch (err) {
        toast.error('Error fetching messages', err);
      }
    };

    if (contactId) fetchMessages();
  }, [contactId]);

  const sendMessage = async (message) => {
    try {
      const token = sessionStorage.getItem('token');
      const reqHeader = {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      };

      const response = await senderAPI(contactId, { message }, reqHeader);
      setMessages(prevMessages => [...prevMessages, response.data]);
    } catch (err) {
      toast.error('Error sending message:', err);
    }
  };

  const isOnline = onlineUsers.includes(contactId);

  const handleScroll = () => {
    if (messageContainerRef.current.scrollTop > 0) {
      setShowScrollUpArrow(true);
    } else {
      setShowScrollUpArrow(false);
    }
  };

  const scrollToTop = () => {
    messageContainerRef.current.scrollTop = 0;
    setShowScrollUpArrow(false);
  };

  return (
    <div className="main-content align-items-center justify-content-center mt-4">
      <div className="chat-header align-items-center justify-content-center d-flex mt-3 w-100">
        <h2>Messages</h2>
        {isOnline ? <span className="online-status ms-3">Online</span> : <span className="offline-status ms-3">Offline</span>}
      </div>
      {messages.length === 0 && <h6 className='text-center' style={{ color: "grey" }}>Start new conversation</h6>}
      <div className="chat-messages" ref={messageContainerRef} onScroll={handleScroll}>
        {messages.map((message, index) => (
          <div key={index} ref={index === messages.length - 1 ? lastMsgRef : null} className={`message ${message.senderId === contactId ? 'outgoing' : 'incoming'}`}>
            <div className={`message-content ${message.senderId === contactId ? 'outgoing-content' : 'incoming-content'} ${messageShakeMap[message.id] ? 'shake' : ''}`} >
              <span className="username">{message.senderId === contactId ? "" : "You:"}</span> {message.message}
            </div>
            <div className={`message-time ${message.senderId === contactId ? 'outgoing-time' : 'incoming-time'}`}>{formatMessageTime(new Date(message.createdAt))}</div>
          </div>
        ))}
        <div ref={lastMsgRef}></div>
      </div>
      {showScrollUpArrow && (
        <button className="scroll-up-arrow" onClick={scrollToTop}>
          ▲
        </button>
      )}
      <div className="chat-input">
        <input type="text" ref={inputRef} placeholder="Type your message here" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😀</button>
        <button onClick={handleSubmit}><i className="fa-solid fa-paper-plane"></i></button>
      </div>
      {showEmojiPicker && (
        <EmojiPicker onEmojiClick={handleEmojiClick} />
      )}
      <audio ref={audioRef} src={notification} preload="auto" />
    </div>
  );
}

function formatMessageTime(date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

export default Conversation;
