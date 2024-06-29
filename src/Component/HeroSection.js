import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Content from '../Component/Content';

const HeroSection = ({ defaultKeyword }) => {
  const [keyword, setKeyword] = useState(defaultKeyword);
  const [results, setResults] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [resultsFound, setResultsFound] = useState(true);

  const handleDictionaryResponse = (response) => {
    if (response.data && response.data.length > 0) {
      setResults(response.data[0]);
      setResultsFound(true);
    } else {
      setResults(null);
      setResultsFound(false);
    }
  };

  useEffect(() => {
    const search = () => {
      const dictionaryApiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;

      axios
        .get(dictionaryApiUrl)
        .then(handleDictionaryResponse)
        .catch((error) => {
          console.error("Error fetching dictionary data:", error);
          setResults(null);
          setResultsFound(false);
        })
        .finally(() => {
          setSearchPerformed(true);
        });
    };

    if (loaded && keyword.trim().length > 0) {
      search();
      setLoaded(false);
    }
  }, [keyword, loaded]);

  const handleKeywordChange = (event) => {
    const { value } = event.target;
    setKeyword(value);
    setSearchPerformed(false); 
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (keyword.trim().length > 0) {
      setLoaded(true);
    }
  };

  return (
    <>
      <section className="hero-section d-flex justify-content-center align-items-center" id="section_1">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-12 mx-auto">
              <h2 className="text-white text-center">Discover & Learn.</h2>
              <form onSubmit={handleSubmit} className="custom-form mt-4 pt-2 mb-lg-0 mb-5" role="search">
                <div className="input-group input-group-lg">
                  <input
                    onChange={handleKeywordChange}
                    value={keyword}
                    name="keyword"
                    type="search"
                    className="form-control"
                    id="keyword"
                    aria-label="Search"
                    placeholder="Enter a word..."
                  />
                  <button type="submit" className="btn btn-primary">Search</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {searchPerformed && !resultsFound && (
        <div className="container mt-4">
          <p className="text-center text-dark">No results found for "{keyword}". Please try another word.</p>
        </div>
      )}
      {resultsFound && <Content results={results} />}
    </>
  );
};

HeroSection.propTypes = {
  defaultKeyword: PropTypes.string.isRequired,
};

export default HeroSection;
