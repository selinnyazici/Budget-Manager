import { DatePicker, Form, Input, message, Button } from "antd";
import { useEffect, useState } from "react";

const FormModal = ({setInputinfos, setIncomeSource, incomeSource}) => {

    const [intype, setIntype] = useState('');
    const [inprice, setInprice] = useState('');
    const [inamount, setInamount] = useState(0);
    const [indate, setIndate] = useState('');
    

    const updateInfos = () => {
      if (inamount){
        setInputinfos({
          type: intype,
          price: parseFloat(inprice),
          amount: parseFloat(inamount),
          date: indate,
        })
      }
    }
    const setDate = (date) => {
      const formattedDate = date.toISOString().split('T')[0];
      const [year, month, day] = formattedDate.split('-');
      const newday = parseInt(day, 10) + 1;
      setIndate(`${newday}-${month}-${year}`);
    }
  
    

    return(
        <div>
            <Form.Item
      label="Type"
      name="type"
      rules={[
        {
          required: true,
          message: 'Please input the type',
        },
      ]}
    >
      <Input onChange={(e) => {setIntype(e.target.value)}}></Input>
    </Form.Item>
    <Form.Item 
      label="Price ($)"
      name="price"
      rules={[
        {
          required: true,
          message: 'Please input the price!',
        },
      ]}
    >
      <Input onChange={(e) => {setInprice(e.target.value)}} />
    </Form.Item>
    <Form.Item
    label="Amount"
      name="amount"
      rules={[
        {
          required: true,
          message: 'Please input the amount!',
        },
      ]}>
      <Input onChange={(e) => {setInamount(e.target.value)}}/>
    </Form.Item>
    <Form.Item
    label="Date"
    name="date"
    rules={[
      {
        required: true,
        message: 'Please input the date!',
      },
    ]}>
      
      <DatePicker onChange={setDate} format="DD-MM-YYYY"  picker='date'></DatePicker>
      <div>
      <Button onClick={updateInfos}> Add </Button>
      </div>
    </Form.Item>
        </div>
    )

}
export default FormModal;