import React, { useState } from 'react';

const Content = ({ results }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!results) {
    return null;
  }

  const { word, phonetics, meanings } = results;

  const phoneticText = phonetics && phonetics.length > 0 ? phonetics[0].text : '';
  const audioUrl = phonetics && phonetics.length > 0 ? phonetics[0].audio : '';

  const toggleAudio = () => {
    const audio = new Audio(`${audioUrl}`); 
    console.log(audio);
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="featured-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-12">
            <div className="custom-block custom-block-overlay">
              <div className="d-flex flex-column h-100">
                <img
                  src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="custom-block-image img-fluid"
                />
                <div className="custom-block-overlay-text">
                  <div>
                    <h1 className="text-white mb-5">{word}</h1>
                    <p className="text-white">Phonetics: {phoneticText}</p>
                    <p className="text-white">Pronunciation : {audioUrl && (
                      <button className="btn btn-light" onClick={toggleAudio}>
                        {isPlaying ? 'Pause' : 'Play'} 
                      </button>
                    )}</p>
                    <div className="text-left mt-4">
                      {meanings.map((meaning, index) => (
                        <div key={index}>
                          <h2 className="text-white mt-5 mb-3"><strong>{meaning.partOfSpeech}</strong></h2>
                          {meaning.definitions.map((definition, idx) => (
                            <div key={idx}>
                              <p className="text-white"><strong>Definition:</strong> {definition.definition}</p>
                              {definition.example && <p className="text-white"><strong>Example:</strong> {definition.example}</p>}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="section-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
