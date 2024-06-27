import { Button, Space, Spin, Avatar, Modal, Input, Form, message } from "antd"
import './Layout.css';
import { useState, useEffect } from "react";
import { UserOutlined } from '@ant-design/icons';

const UserPanel = ({userinfo, email, getnames, loginkey}) => {

    
    const [name, surname, username, e_mail] = [userinfo.name, userinfo.surname, userinfo.username, email]
    const [loading, setLoading] = useState(true);
    const [loginusername, loginpassword, loginname, loginsurname, loginemail] = [getnames.username, getnames.password, getnames.name, getnames.surname, getnames.email]
    const [isModalOpen, setIsModalOpen] = useState(false);

    
    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 500);
    }, []);

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
      message.success('Password Changed!')
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };


  

    return (
        <div>
            {loading ? 
            
            (<Spin className='center'tip='Loading' size="large">Loading...</Spin>) : 
            
            (<Space className="profile-page-container" direction="vertical">
              <Avatar style={{margin: '20px'}} size={80} icon={<UserOutlined />} />
            <div>Name: {loginkey ? loginname : name}</div>
            <div>Surname: {loginkey ? loginsurname: surname}</div>
            <div>E-mail: {loginkey ? loginemail : e_mail}</div>
            <div>Username: {loginkey ? loginusername : username } </div>
            <div>Password: ******</div>
            <Space className="profile-page-button" direction="horizontal">
            <Button onClick={showModal}>Change Password</Button>
            <Modal title='Change Password' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Form.Item style={{marginTop: '20px'}}label="Current Password"
          name="current"
          rules={[
        {
          required: true,
          message: 'Please input the current password',
        },
      ]}>
        <Input.Password allowClear={true}/>
          </Form.Item>
          <Form.Item label="New Password"
      name="new"
      rules={[
        {
          required: true,
          message: 'Please input the new password',
        },
      ]}>
        <Input.Password allowClear={true}/>
        </Form.Item>
        <Form.Item label="Confirm Password"
      name="confirm"
      rules={[
        {
          required: true,
          message: 'Please write again the password',
        },
      ]}>
        <Input.Password allowClear={true}/>
        </Form.Item>
        </Modal>

            <Button href='/'>Log Out</Button>
            </Space>
        </Space>)
        
        
        }
        </div>
    )
}

export default UserPanel;