import "./Friendslist.css"
import { DataGrid } from "@material-ui/data-grid";

export default function Friendslist() {

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
      
      const rows = [
        { id: 1, pfp: "", username: 'William Connor', posts: 12, addedDate: "July 2, 2020" },
      ];

    return (
        <div className="friendslist">
            <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection/>
        </div>
    )
}