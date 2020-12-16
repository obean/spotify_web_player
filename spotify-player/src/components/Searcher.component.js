import React, {useEffect, useState, useRef} from "react";
import ReactDOM from 'react-dom';

const Searcher = ({ searcherShowing, hide, token,}) => {
  const [searchValue, setSearchValue] = useState("");
  const [resultToDisplay, setResultToDisplay] = useState()
  const [artistSearchResults, setArtistSearchResults] = useState()
  const [albumSearchResults, setAlbumSearchResults] = useState()
  const [trackSearchResults, setTrackSearchResults] = useState()



  useEffect(() => {
    let timeout = setTimeout(() => {
      console.log("making search") 
      makeSearch()
    }, 500 )
    return () => clearTimeout(timeout)
  }, [searchValue])

  
  const makeSearch = async () => {
    if(searchValue.length > 0){
      const data = await fetch(`https://api.spotify.com/v1/search?q=${searchValue}&type=album,track,artist`, {
        headers: {
          "Authorization": "Bearer " + token
        }
      }).then(async data => {
        let parsedData = await data.json();
        setAlbumSearchResults(parsedData.albums.items)
        setArtistSearchResults(parsedData.artists.items)
        setTrackSearchResults(parsedData.tracks.items)
        setResultToDisplay("tracks")
        console.log(parsedData.artists)
        console.log(artistSearchResults)
      })
    }
  }

  if(searcherShowing) { 
    return (
      ReactDOM.createPortal(
        <React.Fragment>
            <div className="modal-overlay"/>
              <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
                <div className="modal">
                  <div className="modal-header">
                      {resultToDisplay == "tracks" && (
                        <div classNAme="filterSearch">
                        <button onClick={() => setResultToDisplay("albums")}>albums</button>
                        <button onClick={() => setResultToDisplay("artists")}>Artists</button>
                      </div>
                      )}
                      {resultToDisplay === "artists" && (
                        <div classNAme="filterSearch">
                        <button onClick={() => setResultToDisplay("albums")}>albums</button>
                        <button onClick={() => setResultToDisplay("tracks")}>tracks</button>
                      </div>
                      )}
                      {resultToDisplay === "albums" && (
                        <div classNAme="filterSearch">
                        <button onClick={() => setResultToDisplay("artists")}>Artists</button>
                        <button onClick={() => setResultToDisplay("tracks")}>tracks</button>
                      </div>
                      )}
                   
                   <form >
                     <input type="text" value={searchValue} placeholder="Search Spotify..." onChange={e => {setSearchValue(e.target.value)}}/>
                   </form>
                    <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={() => {hide()}}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div>
                  {resultToDisplay == "tracks" && (
                    <div className="search-result">
                      <div className="result-type">
                        <h2>{resultToDisplay}</h2>
                      </div>
                      <div className="track-search-results">
                        {trackSearchResults.map(song => 
                            <p className="song">
                              <span>{song.name} by {song.artists[0].name}</span>
                            </p>
                        )}
                      </div>
                    </div>  
                  )}
                  {resultToDisplay == "artists" && (
                    <div className="search-result">
                      <div className="result-type">
                        <h2>{resultToDisplay}</h2>
                      </div>
                      <div className="track-search-results">
                        {artistSearchResults.map(artist => 
                          <p className="song">
                            <span>{artist.name}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  {resultToDisplay == "albums" && (
                    <div className="search-result">
                      <div className="result-type">
                        <h2>{resultToDisplay}</h2>
                      </div>
                      <div className="search-results">
                        {albumSearchResults.map(album => 
                          <p className="song">
                            <span>{album.name} by {album.artists[0].name}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                  </div>
                </div>
              </div>
          </React.Fragment>, document.body)

    )
  }else {
    return null
  }
};

export default Searcher;