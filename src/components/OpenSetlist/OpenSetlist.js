import React, {useContext} from 'react'
import {Button} from "../Button/Button";
import {UserContext} from "../../context/UserContext";
import "./OpenSetlist.scss"

function OpenSetlist({index, toggleOpenSetlist}){
    const {setlists} = useContext(UserContext)

    return(
        <div className="open-setlist--div">
          <header className="open-setlist--header">
            <span></span><h1>
                {setlists[index].setlistName}
            </h1>
            <Button
                className="open-setlist--close-button"
                buttonText="X"
                onClick={() => toggleOpenSetlist({open: false, index: null})}
            />
          </header>
          <main className="open-setlist--main">
              <ol>
                {setlists[index].setlistArray.map((songs) => {
                    return <li>{songs}</li>
                })
                }
              </ol>
          </main>
          <footer className="open-setlist--footer">
              <div>
                  <Button
                    className="open-setlist--pdf-button"
                    buttonText=".pdf"
                  />
              </div>
              <div>
                  <Button
                    className="open-setlist--playlist-button"
                    buttonText="Create playlist"
                  />
              </div>
          </footer>
        </div>
    )
}

export default OpenSetlist