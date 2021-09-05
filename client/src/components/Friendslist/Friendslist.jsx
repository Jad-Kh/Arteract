import "./Friendslist.css"
import { DataGrid } from "@material-ui/data-grid";
import { format } from "timeago.js"
import { useState, useEffect } from 'react'
import axios from "axios";
export default function Friendslist() {

  let array = [];
  let counter = 1;
  const [ rows, setRows ] = useState([]);
  const [ friends, setFriends ] = useState([]);
  useEffect(() => { /*
      const fetchFriends = async() => {
          const response = await axios.get("users/612f91749c6548039c771b25/friends");
          const loop = await Promise.all(
             friends.map( async(friend) => {
                const posts = await axios.get("posts/posts/" + friend._id);
                let row = { id: counter, username: friend.username, posts: posts.length, addedDate: format(friend.createdAt) } 
                counter++;
                array.push(row);  
              })
          )
          setFriends(response.data);
          setRows(array);
      }
      fetchFriends(); */
  },[])

    const columns = [
        { 
            field: 'id', 
            headerName: '#', 
            width: 10,
            sortable: false,
        },
        { 
          field: 'pfp', 
          headerName: ' ', 
          width: 30,
          sortable: false,
          renderCell: (params) => {
              return (
                  <div className="friendslistImage">
                      <img src={params.row.pfp} alt=""/>
                  </div>
              )
          } 
        },
        {
          field: 'username',
          headerName: 'Username',
          width: 150,
        },
        {
          field: 'posts',
          headerName: 'Posts',
          width: 150,
        },
        {
          field: 'addedDate',
          headerName: 'Added on',
          width: 200,
        },
      ];

    return (
        <div className="friendslist">
            <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection/>
        </div>
    )
}