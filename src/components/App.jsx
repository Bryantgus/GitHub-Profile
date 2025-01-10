import "./App.css"
import { useState, useEffect } from "react"
import Info from "./Info";
import Repositories from "./Repositories";

export default function App() {
    
    const [profile, setProfile] = useState("");
    const [userData, setUserData] = useState({});
    const [updatePage, setUpdatePage] = useState({
        avatar_url: "/github-mark.png",
    });

    useEffect(() => {
        if (profile !== "") {
            fetch(`https://api.github.com/users/${profile}`)
                .then(response => response.json())
                .then(data => {
                    if (data.message == "Not Found"){
                        setUserData({
                            login: "Username Not Found",
                            avatar_url: "/github-mark.png"
                            
                    })
                    } else {
                        fetch(data.followers_url)
                          .then(response => response.json())
                          .then(followers => { 
                              setUserData({
                                  login: data.login,
                                  avatar_url: data.avatar_url,
                                  bio: data.bio,
                                  followers: followers.length,

                                })
                          })
                    }
                })
            
                .catch(error => {
                    console.log("Error fetching data:", error);
                });
        }
    }, [profile]);

    // const apiRequest = ((link) => {
    //     fetch(link)
    //       .then(response => response.json())
    //       .then(data => data)
    // })


    return (
        <div className="appContainer">
            <div className="header">
                <div className="searchContainer">
                    <input 
                    type="text" 
                    placeholder="username" 
                    value={profile}
                    onChange={(e) => {
                        if (profile === "") {
                            setUserData({});
                            setProfile(e.target.value);
                        } else {
                            setProfile(e.target.value);
                        }
                    }}/>

                    <div className="search" onClick={() => setUpdatePage(userData)}>
                        <div className="profileImg"
                             style={{backgroundImage: `url(${userData.avatar_url})`}}></div>
                        
                        <div className="name"><span>{userData.login}</span></div>
                        <div className="bio"><span>{userData.bio}</span></div>
                    </div>
                </div>
            </div>

            <div className="InfoContainer">
                <div className="mainData">
                    <div className="infoProfileImg" 
                         style={{backgroundImage: `url(${updatePage.avatar_url})`}}></div>
                    <Info left={"Followers"} right={updatePage.followers}/>
                    <Info left={"Following"} right={updatePage.following}/>
                    <Info left={"Location"} right={"Usa"}/>
                </div>

                <h1>{updatePage.login}</h1>
                <p>{updatePage.bio}</p>
                
                <div className="repositories">
                    <Repositories
                    title={".github"} 
                    content={"asdsa"}
                    nest={'2440'}
                    star={400}
                    update={"3 days ago"}
                    />
                </div>

                <label className="extend">View all repositories</label>
                    
            </div>
                    
                
        </div>
    )
}