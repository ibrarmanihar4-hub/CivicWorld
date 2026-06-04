import React from 'react';
import { Link } from 'react-router-dom';
import heroGif from '../assets/Demopolisframe1.gif';
import './Header.css';

export default function Header() {
  return (
    <header className="hero-header">
      <img 
        src={heroGif} 
        alt="City background" 
        className="background-gif"
      />
    </header>
  );
}
