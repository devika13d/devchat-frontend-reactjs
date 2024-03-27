import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './chat.css';
import { conversationAPI } from '../services/allAPI';
import toast from 'react-hot-toast';
import { addCnversationsContext } from '../context/AuthContext';

function ChatCon({ searchInput }) {
  const [contacts, setContacts] = useState([]);
  const { addConversations } = useContext(addCnversationsContext);


  useEffect(() => {
    getCoversations();
  }, [addConversations]);

  const getCoversations = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const reqHeader = {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      };
      const result = await conversationAPI(reqHeader);
      console.log('conversations', result.data);
      setContacts(result.data);
    } catch (err) {
      toast.error('Error fetching conversations:', err);
    }
  };


  const handleFavorite = (id) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.includes(id)) {
      const updatedFavorites = favorites.filter(favoriteId => favoriteId !== id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = [...favorites, id];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
    getCoversations();
  };

  const filteredContacts = contacts.filter(contact => {
    return typeof contact.username === 'string' && contact.username.toLowerCase().includes(searchInput.toLowerCase());
  });

  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const pinnedContacts = filteredContacts.filter(contact => favorites.includes(contact._id));
  const remainingContacts = filteredContacts.filter(contact => !favorites.includes(contact._id));
  const sortedContacts = [...pinnedContacts, ...remainingContacts];

  return (
    <>
      <ul className="chat-list">
        {sortedContacts.length > 0 ? (
          sortedContacts.map((item, index) => (
            <li key={item._id}>
              <Link to={`/conversation/${item._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                <div className="profile-wrapper">
                  <img src={item.profilePicture} alt={`Profile Pic ${index + 1}`} className="profile-pic" />
                </div>
                {item.fullname}
              </Link>
              <Button className='bg-light text-secondary' id='e' onClick={() => handleFavorite(item._id)}>
                {favorites.includes(item._id) ? (
                  <i className="fa-solid fa-thumbtack"></i>
                ) : (
                  <i className="fa-solid fa-thumbtack" style={{ visibility: 'hidden' }}></i>
                )}
              </Button>
            </li>
          ))
        ) : (
          <p>No contacts found</p>
        )}
      </ul>


    </>
  );
}

export default ChatCon;
