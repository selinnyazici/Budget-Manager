import { useState } from "react";
import { Button, Flex, FloatButton, Space, Progress, Image, Text } from "antd";
import { useNavigate, Route, Router } from "react-router-dom";
import "./WPGraphic.css";


const WelcomePage = () => {

    


    return(
        <div>
            <Space className="center-page" direction="vertical">
            <Flex direction="horizontal" className="header">
            <Progress className="progress" type="circle" percent={100} />
            <div className="header-style">
            <h1>Budget</h1>
            <h1>Manager</h1>
            </div>
            </Flex>
            <Button className="buttons" type='primary' href='login'> Login Here </Button>
            <Button className="buttons" type='primary' href='signin'> Sign In Here </Button>
            </Space>
        </div>
    )

}

export default WelcomePage;