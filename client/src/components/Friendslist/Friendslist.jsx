import "./Friendslist.css"
import { useState, useEffect, useContext, useParams } from 'react'
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios";

export default function Friendslist({user}) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  const [ selectedFriend, setSelectedFriend ] = useState(0);
  const [ friends, setFriends ] = useState([]); 
  
  useEffect(() => {
      const fetchFriends = async() => {
          const response = await axios.get("/users/" + user._id + "/friends");
          setFriends(response.data);
      };      
      fetchFriends(); 
  }, [user, friends]);

  const handleRemove = async() => {
    try {
        await axios.put("/users/" + selectedFriend + "/removefriend", { userId: currentUser._id });  
    } catch(error) {
        console.log(error)
    }
}

  const Button = ({type}) => {
    return <button className={"friendslistTableButton " + type}>{type}</button>
  }

    return (
      <div className="friendslist">
          <div className="friendslistContainer">
              <span className="friendslistTitle">{"Friends: "}</span>
              <table className="friendslistTable">
                  <tr className="friendslistTableRow">
                      <th className="friendslistTableHeader"> </th>
                      <th className="friendslistTableHeader">Friends</th>
                      <th className="friendslistTableHeader">Followers</th>
                      <th className="friendslistTableHeader">Exchanges</th>
                      <th className="friendslistTableHeader">Status</th>
                      {
                        user._id === currentUser._id && <th className="friendslistTableHeader"> </th>
                      }
                  </tr>
                  {friends.map(friend => (
                      <tr className="friendslistTableRow">
                        <td className="friendslistTableUser">
                          <img className="friendslistTableUserImage" src={
                                                                            friend.profilePicture
                                                                            ? PF + "/avatar/" + friend.profilePicture
                                                                            : PF + "/avatar/default.jpg"
                                                                         } alt=""/>
                          <span className="friendslistTableUsername">{friend.username}</span>
                        </td>
                        <td className="friendslistTableDate">{friend.friends.length}</td>
                        <td className="friendslistTableAmount">{friend.followers.length}</td>
                        <td className="friendslistTableAmount">10</td>
                        <td className="friendslistTableStatus">
                          {
                            currentUser.friends.includes(friend._id)
                            ? <Button type="Friends"/>
                            : <Button type="NotFriends"/>
                          }
                        </td>
                          {
                            user._id === currentUser._id && 
                            <td className="friendsListTableStatus">
                                <button className="friendslistTableRemoveButton" onMouseEnter={() => setSelectedFriend(friend._id)} 
                                                                                 onMouseLeave={() => setSelectedFriend(0)}
                                                                                 onClick={handleRemove}>
                                    Remove
                                </button>
                            </td>
                          }
                      </tr>
                  ))}
              </table>
          </div>
      </div>
  )
}