import { useState, type BaseSyntheticEvent, type FunctionComponent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface IUser{
    username: string,
    password: string
}

const Login: FunctionComponent = () => {
    const navigate = useNavigate();

    const [user,setUser] = useState<IUser>({username:"", password: ""})

    const onTextChange = (e:BaseSyntheticEvent) => {
        const replicaUser = {...user}
        replicaUser[e.target.name] = e.target.value
        setUser(replicaUser)
    }
const SignIn = () => {
    console.log(JSON.stringify(user));
    axios.post("http://localhost:9999/signin", user).then((response)=>{
        console.log(response.data);
        if(response.data.jwtoken != undefined){
            sessionStorage.setItem("token", response.data.jwtoken)
            sessionStorage.setItem("isloggedIn", "true")
            navigate("/db",{replace:true})
        }
        debugger

    })}

    return (
        <>
        <h1>Login</h1>
        <h2>User Name</h2>
        <input type="text" name="username" value={user.username} onChange={onTextChange} />
        <hr></hr>
        <h2>Password</h2>
        <input type="password" name="password" value={user.password} onChange={onTextChange} />
        <hr></hr>
        <button  onClick={SignIn}>Login</button>
        </>
    );
}

export default Login;