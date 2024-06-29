import React from 'react';
import './App.css';

import PropTypes from 'prop-types';

import Navbar from './Component/Navbar';
import HeroSection from './Component/HeroSection';
import Footer from './Component/Footer';

import './bootstrap.min.css';

function App() {
  const defaultKeyword = "serendipity"; 

  return (
    <div className="App">
      <main>
        <Navbar />
        <HeroSection defaultKeyword={defaultKeyword} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
