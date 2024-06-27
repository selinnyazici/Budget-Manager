/*<Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>*/

import { Button, DatePicker, Flex, Progress, Select, Space, Modal, Form, Input, Table, message } from "antd";
import { useState } from "react";
import FormModal from "./Form";


const Dump = () => {

  const {Option} = Select;

  const [totalincome, setTotalincome] = useState(500);
  const [totalexpense, setTotalexpense] = useState(300);
  const pert_income = (totalincome*100) / (totalexpense + totalincome);
  const pert_expense = (totalexpense*100) / (totalexpense + totalincome);
  const [modalopen, setModalopen] = useState(false);
  const [exmodalopen, setexModalopen] = useState(false);
  const [inputinfos, setInputinfos] = useState({type: '', price: '', amount: '', date: ''});
  const [incomeSource, setIncomeSource] = useState([{
    type: 'Cash',
    price: 200,
    amount: 1,
    date: '22-06-2024',
  }])


  
  const modalClick = () => {
    setModalopen(true)
  }

  const handleOk = (inputinfos) => {
    setModalopen(false);
    setIncomeSource([...incomeSource, inputinfos]);
  };

  const handleCancel = () => {
    setModalopen(false);
  };

  const modalClickex = () => {
    setexModalopen(true)
  }

  const handleOkex = () => {
    setexModalopen(false);
  };

  const handleCancelex = () => {
    setexModalopen(false);
  };


  const expenseSource = [
    {
      key: '1',
      type: 'Food',
      price: 80,
      amount: 1,
      date: '22-06-2024',
    },
  ];


  
  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Price($)',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      render: () => <a onClick={editRow}>Edit</a>
    }
  ];

  const editRow = () =>{
    message.success('çalisiyo')
  }


  return (
    <div>
      <Space direction="vertical">
      <div className="income-welcome">Welcome to Your Budget Manager</div>
      <div className="income-summary-text">Monthly Summary:</div>
    </Space>





    <Space style={{marginTop: '10px'}} direction="horizontal">
      <div style={{marginLeft: '200px'}}className='expenses-total'>
        Total Income: <span className="green-word"> {totalincome}$</span> </div>
        <div className='expenses-total' style={{marginLeft: '80px'}}>
          Net Cost: {totalincome - totalexpense}$
        </div>
      <div style={{marginLeft: '80px'}} className='expenses-total'>
        Total Expense: <span className="red-word"> {totalexpense}$ </span></div>
    </Space>




    <Flex style={{marginTop: '30px'}} horizontal gap={250}>

      <Flex style={{marginLeft: '90px'}} className="border-container" vertical>

      <Space style={{padding: '20px'}}direction="horizontal">
        <div className="incomes-header">Incomes</div>
        <Button onClick={modalClick}>Add Income</Button>
        <Modal title="Add Income" open={modalopen} onOk={handleOk} onCancel={handleCancel}>
        <FormModal setInputinfos={setInputinfos} > </FormModal>
      </Modal>
      </Space>

      <Space direction="vertical">
      <div style={{margin: '30px', marginLeft: '100px'}}>
      <Progress type="circle" strokeColor='green' percent={parseFloat(pert_income.toFixed(2))} />
      </div>

      <Space direction="horizontal">
      <div>
        <div>Filter by month: </div>
      <DatePicker  picker="month" />
      </div>
      <div>
        <div>Filter by day: </div>
      <DatePicker  picker="date"></DatePicker>
      </div>
      </Space>

      </Space>

      </Flex>



      <Flex className="border-container" vertical>

      <Space style={{padding: '20px'}}direction="horizontal">
        <div className="incomes-header">Expenses</div>
        <Button onClick={modalClickex}>Add Expense</Button>
        <Modal title="Add Expense" open={exmodalopen} onOk={handleOkex} onCancel={handleCancelex}>
        <FormModal></FormModal>
      </Modal>
      </Space>

      <Space direction="vertical">
      <div style={{margin: '30px', marginLeft: '100px'}}>
      <Progress type="circle" strokeColor='red' percent={parseFloat(pert_expense.toFixed(2))} />
      </div>
      <Space direction="horizontal">
      <div>
        <div>Filter by month: </div>
      <DatePicker picker="month" />
      </div>
      <div>
        <div>Filter by day: </div>
      <DatePicker  picker="date"></DatePicker>
      </div>
      </Space>
      </Space>

      </Flex>

    </Flex>








    <Flex horizontal gap={200}>

      <Flex style={{marginTop: '20px'}} vertical>

        <Space style={{marginLeft: '130px'}}direction="horizontal">
        <div>
        <Select placeholder="Filter By Type" allowClear={true}>
          <Option value="salary">Salary</Option>
          <Option value="cash">Cash</Option>
          <Option value="payback">Payback</Option>
          <Option value="others">Others</Option>
        </Select>
        </div>
        <div>
          <Button>Edit Incomes</Button>
        </div>
        </Space>
        <Space style={{margin: '30px', marginLeft: '100px'}} direction="vertical">
        <Table style={{width: '60vh'}}dataSource={incomeSource} columns={columns} />
        </Space>

        
         
      </Flex>


      <Flex style={{marginTop: '20px'}} vertical>

      <Space  style={{marginLeft: '5vh'}}direction="horizontal">
        <div>
        <Select placeholder="Filter By Type" allowClear={true}>
          <Option value="rent">Rent</Option>
          <Option value="food">Food</Option>
          <Option value="shopping">Shopping</Option>
          <Option value="creditcard">Credit Card</Option>
          <Option value="others">Others</Option>
        </Select>
        </div>
        <div>
          <Button>Edit Expenses</Button>
        </div>
        </Space>
        <Space style={{margin: '30px', marginLeft: '1vh'}} direction="vertical">
        <Table style={{width: '60vh'}} dataSource={expenseSource} columns={columns} />
        </Space>

      </Flex>

    </Flex>

    </div>
  )
}


export default Dump;