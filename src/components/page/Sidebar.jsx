import React, { useEffect, useState } from 'react';
import ChatCon from './ChatCon';

function Sidebar() {
  const [searchInput, setSearchInput] = useState('');
  const [username, Setusername] = useState('')
  const [profilePic, setProfilePic] = useState('')
  

  useEffect(() => {
    if (sessionStorage.getItem('user')) {
      const data = (JSON.parse(sessionStorage.getItem('user')))
      Setusername(data.username)
      setProfilePic(data.profilePicture)
    }
  }, [])

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="sidebar">
      <div className="profile">
        <img src={profilePic} alt="Profile" />
        <h2>{username}</h2>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search" value={searchInput} onChange={handleSearch} />
        <button><i className="fa-solid fa-magnifying-glass"></i></button>
      </div>
      <ChatCon searchInput={searchInput} />
    </div>
  );
}

export default Sidebar;
