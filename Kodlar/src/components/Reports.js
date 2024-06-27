import { useState, useEffect } from "react";
import { LoadingOutlined} from '@ant-design/icons';
import { FloatButton, Space, Spin, Button, Result, Form, DatePicker, Input } from "antd";
import FormModal from "./Form";
import dayjs from 'dayjs';


const Reports = () => {

    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState(false);


    const { RangePicker } = DatePicker;

    const onRangeChange = (dates, dateStrings) => {
      if (dates) {
        console.log('From: ', dates[0], ', to: ', dates[1]);
        console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
      } else {
        console.log('Clear');
      }
    };

    const rangePresets = [
      {
        label: 'Last 7 Days',
        value: [dayjs().add(-7, 'd'), dayjs()],
      },
      {
        label: 'Last 14 Days',
        value: [dayjs().add(-14, 'd'), dayjs()],
      },
      {
        label: 'Last 30 Days',
        value: [dayjs().add(-30, 'd'), dayjs()],
      },
      {
        label: 'Last 90 Days',
        value: [dayjs().add(-90, 'd'), dayjs()],
      },
    ];

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 500);
    }, []);


    

    return (
      <div>
      {loading ? 
      
      (<Spin className='center' tip='Loading' size="large">Loading...</Spin>) : 
      
      (<div>
        {}
        <FloatButton onClick={() => setAlert(true)}></FloatButton>
      {alert ? <Result
    status="success"
    title="The Report is Sent to Your E-mail Successfully!"
    subTitle="report/27-06-2024.pdf"
    extra={[
      <Button href='homepage' type="primary" key="homepage">
        Go Expenses
      </Button>,
      <Button key="sent" onClick={()=> setAlert(false)}>Sent Again</Button>
    ]}
  /> : <div style={{fontSize: '15px', marginTop: '20px'}}>
    <Form.Item label="Type"
      name="type"
      rules={[
        {
          required: true,
          message: 'Please input the type!',
        },
      ]}>
        <Input/>
    </Form.Item>
    <Form.Item label="Price Range"
      name="Price"
      rules={[
        {
          required: true,
          message: 'Please input the price range!',
        },
      ]}>
        <Input/>
    </Form.Item>
    <Form.Item label="Date Range"
      name="date"
      rules={[
        {
          required: true,
          message: 'Please input the date range',
        },
      ]}>
        <RangePicker presets={rangePresets} onChange={onRangeChange} />
    </Form.Item>
    <div>** After picking, please press that button on bottom-right for report</div>
    <div>If you left blank some boxes, it will make a report with all matching records without filter</div>
    </div>}</div>)
  
  
  }
  </div>
    )
}

export default Reports;