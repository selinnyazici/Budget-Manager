import { Button, Input, Space, message } from "antd";
import { useEffect, useState } from "react";
import { PoweroffOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';


const Verification = ({email}) =>{

    const [loadings, setLoadings] = useState(false)
    const navigate = useNavigate()

    


    const handleKeyPress = (event) => {
        const charCode = event.charCode;
        if (charCode < 48 || charCode > 57) {
          event.preventDefault();
        }
      };

      const messageSuccess = () =>{
        message.success('Verify Successful');
        setLoadings(true)
        buttonfunc({loadings})
        navigateWithDelay("/homepage")
      }

      const navigateWithDelay = (path) => {
        setTimeout(() => {
          navigate(path);
        }, 2000);
      }

      const buttonfunc = ({loadings}) => {
        if (loadings){
            return(
                <Button className="verify-button" icon={<PoweroffOutlined />}loading={loadings} type="primary">Verify</Button>
            )}
        else {
            return(
                
                <Button className="verify-button" type="primary" onClick={messageSuccess}>Verify</Button>

            )
        }}
        

    return(
        <Space className="center-page" direction="vertical">
            <h3>Enter the code we sent to {email}</h3>
            <Input.OTP onKeyPress={handleKeyPress}></Input.OTP>
            {buttonfunc({loadings})}
        </Space>
    )

}

export default Verification;