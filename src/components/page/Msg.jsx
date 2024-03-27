import React from 'react';
import Sidebar from './Sidebar';
import './msg.css'; 
import DoubHome from './DoubHome';


function MessageHomePage() {
    return (
        <div className="message-homepage">
            <Sidebar />
          <DoubHome/>
          
        </div>
    );
}

export default MessageHomePage;
