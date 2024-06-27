import { Space, Input, Button } from "antd";
import "./WPGraphic.css";
import { useState, useEffect } from "react";
import { Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SigninPage = ({setUserinfo, setEmail}) => {

    useEffect (()=> {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://jsonplaceholder.typicode.com/users");
                setUsers(response.data)
                console.log(response.data)
            } catch (error) {
                console.error(error);
            }
            }
    
    
    fetchData();
    }, []);

    const [newusers, setNewusers] = useState([])
    const [users, setUsers] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [telno, setTelno] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [e_mail, setE_mail] = useState('');

    const navigate = useNavigate();
    

    useEffect(()=> {
        setUserinfo((previnfo) => ({
            ...previnfo,
            name: name,
        }))
    }, [name])

    useEffect(()=> {
        setUserinfo((previnfo) => ({
            ...previnfo,
            surname: surname,
            username: username,
        }))
    }, [surname, username])

    useEffect(() => {
        setEmail(e_mail)
    }, [e_mail]);

    
    return(
       
        <div>
            <Space className="signin-center-page" align="center" direction="vertical">
            <h2>Create an account</h2>

            <Input className="signin-inputs" placeholder="Enter your name" allowClear={true} 
            onChange={(e) => setName(e.target.value)}></Input>
            
            <Input className="signin-inputs" placeholder="Enter your surname" allowClear={true} 
            onChange={(e) => setSurname(e.target.value)}></Input>

            <Input className="signin-email" placeholder="@e-mail"  allowClear={true} 
            onChange={(e) => setE_mail(e.target.value)}></Input>

            <Input className="telephone-input" spellCheck={false} allowClear={true} 
            addonBefore="+90" placeholder="XXX XXX XX XX" 
            onChange={(e) => setTelno(e.target.value)}></Input>

            <div className="signin-inputs">
            <Typography.Title  level={5}></Typography.Title>
            <Input placeholder="Select Username"onChange={(e) => setUsername(e.target.value)} 
            allowClear={true} spellCheck={false} count={{show: true, max: 15,}}/>
            </div>

            <Input.Password className="signin-inputs" allowClear={true} spellCheck={false} placeholder="Select Password" 
            onChange={(e) => setPassword(e.target.value)}></Input.Password>

            <Button className="signin-buttons" type="primary" onClick={() => navigate('verification')}>Sign In</Button>
            </Space>
        </div>
    )
}

export default SigninPage;