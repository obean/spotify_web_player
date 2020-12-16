import React, {useEffect, useState, useRef} from "react";
import ReactDOM from 'react-dom';

const Searcher = ({ searcherShowing, hide, token,}) => {
  const [searchValue, setSearchValue] = useState("")

  const handleSubmit = () => {

  }

  useEffect(() => {
    let timeout = setTimeout(() => {
      console.log("make search")
      
    }, 1000 )

    return () => clearTimeout(timeout)
  }, [searchValue])
  
  const prepareSearch = () => {
    
    
    let timeout = setTimeout(() => {
      console.log("make search")
      
    }, 1000 )

    return () => clearTimeout(timeout)
  }

  if(searcherShowing) { 
    return (
      ReactDOM.createPortal(
        <React.Fragment>
            <div className="modal-overlay"/>
              <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
                <div className="modal">
                  <div className="modal-header">
                   <form >
                     <input type="text" value={searchValue} placeholder="Search Spotify..." onChange={e => {setSearchValue(e.target.value)}}/>
                   </form>
                    <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={() => {hide()}}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div>
                  HELLO WORLD 
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