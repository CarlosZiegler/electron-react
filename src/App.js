import React, { useState, useEffect } from 'react';
import Unsplash from 'unsplash-js';

import Lottie from 'react-lottie';
import loadingData from './assets/loading.json'
import './App.css';

const { app } = window.require('electron').remote;


function App() {
  const [search, setSearch] = useState([])
  const [result, setResult] = useState({})
  const [gallery, setGallery] = useState([])
  const [error, setError] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const unsplash = new Unsplash({ accessKey: "-8jKJyWNbSd67bE-ReI7FM5xxz0mXPNu2YPg2IXzY30" });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingData,

  };

  const handleSearch = (e) => {
    e.preventDefault()
    setGallery([])
    setIsLoading(true)
    setTimeout(async () => {
      try {
        const response = await unsplash.search.photos(search, 1, 10, { orientation: "portrait" })
        setResult(await response.json())
      } catch (e) {
        setError(e)
        console.log(error)
      }

      setIsLoading(false)
    }, 2000);
  }

  useEffect(() => {
    function dislayGallery() {
      setGallery(result.results)
    }
    dislayGallery()
  }, [result])

  return (
    < div className="App" >
      <h1>Unsplash</h1>
      <form onSubmit={handleSearch}>
        <input type="text" className="search" placeholder="Search" onChange={e => { setSearch(e.target.value) }} />
        <button type="submit" className="btn-submit">Search</button>
      </form>
      <section>
        <h2>Result</h2>
        {
          isLoading && <div className="loading">
            <Lottie className="lottieFile" options={defaultOptions}
              height={"50%"}
              width={"50%"}
            />
          </div>
        }
        {gallery && gallery.map((element) => (
          <a href={element.urls.raw} key={element.id} target="_blank" rel="noopener noreferrer"><img className="gallery-img" src={element.urls.small} alt="" /></a>
        ))}
      </section>
    </div >
  );
}

export default App;
