import "./App.css"
import { useState, useEffect } from "react"
import gitData from "../../public/gitData.json"

export default function App() {
    

    useEffect(() => {
        fetch(gitData.followers_url)
            .then(response => response.json())
            .then(data => {
              console.log(data.length)
        })
        .catch(error => {
          console.log(error)
        })
    }, []);

    return (
        <div className="appContainer">
            <div className="header">
                <div className="searchContainer">
                    <input type="text" placeholder="username" />
                    <div className="search">
                        <div className="profileImg"
                             style={{backgroundImage: `url(${gitData.avatar_url})`}}></div>
                        <div className="name"><span>{gitData.login}</span></div>
                        <div className="bio"><span>{gitData.bio}</span></div>
                    </div>

                    <div className="InfoContainer">
                        <div className="mainData">
                            <div className="infoProfileImg"></div>
                            {/* <Info left={"Followers"}} right={`{}`}/>
                            <Info left={} right={}/>
                            <Info left={} right={}/> */}
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}