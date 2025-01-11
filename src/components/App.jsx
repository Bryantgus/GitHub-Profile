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
                .then(profileData => {
                    if (profileData.message === "Not Found") {
                        setUserData({
                            login: "Username Not Found",
                            avatar_url: "/github-mark.png",
                            bio: "",
                            followers: 0,
                            following: 0,
                            repositories: [],
                        });
                    } else {
                        setUserData(() => ({
                            login: profileData.login,
                            avatar_url: profileData.avatar_url,
                            bio: profileData.bio || "No bio available",
                            followers: profileData.followers.toString(2),
                            following: profileData.following.toString(2),
                            location: profileData.location || "No Available",
                        }));
                        fetch(profileData.repos_url)
                          .then(response => response.json())
                          .then(repositories => {
                            repositories.map((item) => {
                                setUserData((prev) => ({
                                ...prev,
                                ...prev.repositories,
                                repositories: {
                                    index: {
                                        name: repositories.name,
                                        description: repositories.description,
                                        star: repositories.stargazers_count,
                                        license: false,
                                    }
                                    
                                }    
                            }))
                            if (repositories.license.key) {
                                if(repositories.license.key === "mit")
                                    setUserData((prev) => ({
                                    ...prev,
                                    repositories: {
                                        ...prev.repositories,
                                        license: true,
                                }   }));
                            }

                        });
                        })
                    }
                      
                })
                .catch(error => console.error("Error fetching user data:", error));
        }
    }, [profile]);
    


    return (
        <div className="appContainer">
            <input type="text" onClick={() => console.log(userData)
            } />
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
                    <Info left={"Location"} right={updatePage.location}/>
                </div>

                <h1>{updatePage.login}</h1>
                <p>{updatePage.bio}</p>
                
                <div className="repositories">
                    {updatePage[repositories].map((item, index) => {
                        return (
                            <Repositories
                                key={index}
                                title={item.name} 
                                content={item.description}
                                nest={'2440'}
                                star={400}
                                update={"3 days ago"}
                            />
                        )
                    })}
                    
                </div>

                <label className="extend">View all repositories</label>
                    
            </div>
                    
                
        </div>
    )
}