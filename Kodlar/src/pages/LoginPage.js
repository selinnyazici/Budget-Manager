import { Input, Space, Button, message } from "antd";
import { useEffect, useState } from "react";
import "./WPGraphic.css";
import axios from "axios";
import { PoweroffOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";



const LoginPage = ({setGetnames, setLoginkey}) =>{

    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loadings, setLoadings] = useState(false);
    

    const navigate = useNavigate()

    
   useEffect (()=> {
    const fetchData = async () => {
        try {
            const response = await axios.get("https://v1.nocodeapi.com/selin_yazici/google_sheets/SjMXVPYAePdSPcke?tabId=Sheet1");
            setUsers(response.data.data)
        } catch (error) {
            console.error(error);
        }
        }


fetchData();
}, []);



const navigateWithDelay = (path) => {
    setTimeout(() => {
      navigate(path);
    }, 2000);
  }

  const buttonfunc = ({loadings}) => {
    if (loadings){
        return(
            <Button className="login-buttons" icon={<PoweroffOutlined />}loading={loadings} type="primary">Log In</Button>
        )}
    else {
        return(
            
            <Button className="login-buttons" type="primary" onClick={foundResponse}>Log In</Button>

        )
    }}
    
   

    const isUserHere = () => {
        let found = false
        users.map(user =>
            {
                if (user.Username === username && user.Password === password) {
                    found = true;
                  }
            }
        )
        return found;
    }

    const getNames = () => {
        users.map(user =>
            {
                if (user.Username === username && user.Password === password) {
                    setGetnames({
                        username: user.Username,
                        password: user.Password,
                        name: user.Name,
                        surname: user.Surname,
                        email: user.Email,
                        })
                    setLoginkey(true);
                  }
            }
        )
        return true;
    }
   

    const foundResponse = () => {
        const found = isUserHere();
        if (found){
            message.success('Successful Login')
            getNames();
            setLoadings(true)
            buttonfunc({loadings})
            navigateWithDelay("/homepage")
            

        }
        else{
            message.error('Incorrect Username or Password')
        }
    }

    
    return(
        <div>
            <Space className="login-center-page" align="center" direction="vertical">
            <div><h1>Log In</h1></div>
            <Input className="login-inputs" placeholder="@username" value={username} onChange={(e) => setUsername(e.target.value)} ></Input>
            <Input.Password onPressEnter={foundResponse} className="login-inputs" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}></Input.Password>
            {buttonfunc({loadings})}
            
            </Space>
        </div>
        )
}

export default LoginPage;