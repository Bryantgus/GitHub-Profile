import "./App.css"
import { useState, useEffect } from "react"
import gitData from "../../public/gitData.json"
import Info from "./Info";
import Repositories from "./Repositories";

export default function App() {
    
    const [profile, setProfile] = useState("");
    const [userData, setUserData] = useState({});
    useEffect(() => {
        if (profile !== "") {
            fetch("https://api.github.com/users/NVIDIA")
              .then(response => response.json())
              .then(data => {
                setUserData(data)
                console.log(userData);
                
              })
              .catch(error => {
                console.log(error)
              })
        }
    }, [profile, userData]);


    return (
        <div className="appContainer">
            <div className="header">
                <div className="searchContainer">
                    <input 
                    type="text" 
                    placeholder="username" 
                    value={profile}
                    onChange={(e) => setProfile(e.target.value)} />
                   
                    <div className="search">
                        <div className="profileImg"
                             style={{backgroundImage: `url(${gitData.avatar_url})`}}></div>
                        
                        <div className="name"><span>{gitData.login}</span></div>
                        <div className="bio"><span>{gitData.bio}</span></div>
                    </div>
                </div>
            </div>

            <div className="InfoContainer">
                <div className="mainData">
                    <div className="infoProfileImg" 
                         style={{backgroundImage: `url(${gitData.avatar_url})`}}></div>
                    <Info left={"Followers"} right={"1232131"}/>
                    <Info left={"Following"} right={"12330"}/>
                    <Info left={"Location"} right={"Usa"}/>
                </div>

                <h1>{gitData.login}</h1>
                <p>{gitData.bio}</p>
                
                <div className="repositories">
                    <Repositories
                    title={".github"} 
                    content={"asdsa"}
                    nest={2440}
                    star={400}
                    update={"3 days ago"}
                    />
                    <Repositories
                    title={".github"} 
                    content={"asdsa"}
                    nest={2440}
                    star={400}
                    update={"3 days ago"}
                    />
                    <Repositories
                    title={".github"} 
                    content={"asdsa"}
                    nest={2440}
                    star={400}
                    update={"3 days ago"}
                    />
                    <Repositories
                    title={".github"} 
                    content={"asdsa"}
                    nest={2440}
                    star={400}
                    update={"3 days ago"}
                    />
                </div>

                <label className="extend">View all repositories</label>
                    
            </div>
                    
                
        </div>
    )
}