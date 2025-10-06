import { use, useEffect, useState, type FunctionComponent } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";

const DashBoard: FunctionComponent = () => {
    const navigate = useNavigate();
    const [user,setUser] = useState([]);

    const getData = (() => {
        debugger;
        const token: string | null = sessionStorage.getItem("token");
        axios.get("http://localhost:9999/emps", { headers: { Authorization: "bearer " + token } })
            .then((res) => {
                debugger
               setUser(res.data)
            })
    })
    useEffect(() => {
        getData()
    },[])
    
    return (
        <>
        <h1>DashBoard</h1>
        <hr></hr>
        <hr></hr>
        <tr><td>
        {
            user.map( user =>{
                return(
                    <div key={user.No} onClick={() => { navigate("details/" + user.No) }}>
                        <h1>{user.No} || {user.Name} || {user.Address}</h1>
                        <hr></hr>
                    </div>
                )
            })
        }
        </td></tr>
        <td style={{textAlign:"center", verticalAlign:"top"}}>
            Details Here
            <Outlet></Outlet>
        </td>
        </>
    );
}

export default DashBoard;