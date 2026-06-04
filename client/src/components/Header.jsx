import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="hero-header">
      <img 
        src="https://project-orion-production.s3.amazonaws.com/uploads/content/21900/Demopolisframe1.gif" 
        alt="City background" 
        className="background-gif"
      />
    </header>
  );
}
