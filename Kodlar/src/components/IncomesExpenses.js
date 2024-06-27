import { Button, Layout, Space, Spin, Form, Input, Table, Flex, Select, DatePicker, Modal, Progress, message } from "antd";
import { useState, useEffect } from "react";
import FormModal from "./Form";

const IncomesExpenses = ({setGetincomes, addincomes, totalincome, totalexpense, setGetexpenses, addexpenses, setTotalincome, holdincome, setTotalexpense, holdexpense}) =>{

  const {Option} = Select;
  

  const [loading, setLoading] = useState(true);
  const pert_income = (holdincome*100) / (holdexpense + holdincome);
  const pert_expense = (holdexpense*100) / (holdexpense + holdincome);
  const [modalopen, setModalopen] = useState(false);
  const [exmodalopen, setexModalopen] = useState(false);
  const [inputinfos, setInputinfos] = useState({type: '', price: '', amount: '', date: ''});
  const [incomeSource, setIncomeSource] = useState([]);
  const [expenseSource, setExpensesource] = useState([]);
  const [filterlist, setFilterlist] = useState([]);
  const [exfilterlist, setexFilterlist] = useState([]);
  const [editmodalopen, seteditModalopen] = useState(false);
  const [currentedit, setCurrentedit] = useState([]);
  const [edit, setEdit] = useState([]);
  const [newtype, setNewtype] = useState('');
  const [newprice, setNewprice] = useState('')
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  useEffect(()=>{
    setIncomeSource(addincomes)
  },[addincomes])

  const modalClick = () => {
    setModalopen(true)
  }

  const handleOk = () => {
    const updatedIncomes = [...incomeSource, inputinfos]
    setIncomeSource(updatedIncomes);
    setGetincomes(updatedIncomes)
    setTotalincome(totalincome + (inputinfos.price*inputinfos.amount))
    message.success('Added!');
    setModalopen(false);
  };

  


  const handleCancel = () => {
    setModalopen(false);
  };

  const modalClickex = () => {
    setexModalopen(true)
  }

  const handleOkex = () => {
    const updatedExpenses = [...expenseSource, inputinfos]
    setExpensesource(updatedExpenses);
    setGetexpenses(updatedExpenses)
    setTotalexpense(totalexpense + (inputinfos.price*inputinfos.amount))
    message.success('Added!');
    setexModalopen(false);
  };

  useEffect(()=>{
    setExpensesource(addexpenses)
  },[addexpenses])

  const handleCancelex = () => {
    setexModalopen(false);
  };

  


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

  const editRow = () => {
    seteditModalopen(true)
  }

  

  
  const setDate = (date) => {
    if (date){
      let selectedday = ''
    const formattedDate = date.toISOString().split('T')[0];
    const [year, month, day] = formattedDate.split('-');
    const newday = parseInt(day, 10) + 1;
    selectedday =`${newday}-${month}-${year}`;
    console.log(selectedday)
    const filterlist = addincomes.filter(incomes => incomes.date == selectedday)
    setFilterlist(filterlist)
    }
    else{
      setFilterlist([]);
    }
  }

  const setDateex = (date) => {
    if (date) {
      let selectedday = ''
    const formattedDate = date.toISOString().split('T')[0];
    const [year, month, day] = formattedDate.split('-');
    const newday = parseInt(day, 10) + 1;
    selectedday =`${newday}-${month}-${year}`;
    console.log(selectedday)
    const filterlist = addexpenses.filter(expenses => expenses.date == selectedday)
    setexFilterlist(filterlist)
    }
    else {
      setexFilterlist([])
    }
  }

  const filterType = (choice) => {
    if (choice){
    const filterlist = addincomes.filter(incomes => incomes.type == choice)
    setFilterlist(filterlist)
    }
    else{
      setFilterlist([]);
    }
  }

  const exfilterType= (choice) => {
    if (choice){
    const filterlist = addexpenses.filter(expenses => expenses.type == choice)
    setexFilterlist(filterlist)
    }
    else{
      setexFilterlist([]);
    }
  }
  
  
    
    return(
      <div>
      {loading ? 
      
      (<Spin className='center'tip='Loading' size="large">Loading...</Spin>) : 
      
      (<div>
        <Space direction="vertical">
        <div className="income-welcome">Welcome to Your Budget Manager</div>
        <div className="income-summary-text">Monthly Summary:</div>
      </Space>
  
  
  
  
  
      <Space style={{marginTop: '10px'}} direction="horizontal">
        <div style={{marginLeft: '200px'}}className='expenses-total'>
          Total Income: <span className="green-word"> {holdincome}$</span> </div>
          <div className='expenses-total' style={{marginLeft: '80px'}}>
            Net Cost: {holdincome - holdexpense}$
          </div>
        <div style={{marginLeft: '80px'}} className='expenses-total'>
          Total Expense: <span className="red-word"> {holdexpense}$ </span></div>
      </Space>
  
  
  
  
      <Flex style={{marginTop: '30px'}} horizontal gap={250}>
  
        <Flex style={{marginLeft: '90px'}} className="border-container" vertical>
  
        <Space style={{padding: '20px'}}direction="horizontal">
          <div className="incomes-header">Incomes</div>
          <Button onClick={modalClick}>Add Income</Button>
          <Modal title="Add Income" open={modalopen} onOk={handleOk} onCancel={handleCancel}>
          <FormModal setInputinfos={setInputinfos}> </FormModal>
        </Modal>
        </Space>
  
        <Space direction="vertical">
        <div style={{margin: '30px', marginLeft: '100px'}}>
        <Progress type="circle" strokeColor='green' percent={parseFloat(pert_income.toFixed(2))} />
        </div>
  
        <Space direction="horizontal">
        <div>
          <div>Filter by month: </div>
        <DatePicker picker="date" />
        </div>
        <div>
          <div>Filter by day: </div>
        <DatePicker onChange={setDate} picker="date"></DatePicker>
        </div>
        </Space>
  
        </Space>
  
        </Flex>
  
  
  
        <Flex className="border-container" vertical>
  
        <Space style={{padding: '20px'}}direction="horizontal">
          <div className="incomes-header">Expenses</div>
          <Button onClick={modalClickex}>Add Expense</Button>
          <Modal title="Add Expense" open={exmodalopen} onOk={handleOkex} onCancel={handleCancelex}>
          <FormModal setInputinfos={setInputinfos}></FormModal>
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
        <DatePicker onChange={setDateex} picker="date"></DatePicker>
        </div>
        </Space>
        </Space>
  
        </Flex>
  
      </Flex>
  
  
  
  
  
  
  
  
      <Flex horizontal gap={200}>
  
        <Flex style={{marginTop: '20px'}} vertical>
  
          <Space style={{marginLeft: '130px'}}direction="horizontal">
          <div>
          <Select placeholder="Filter By Type" allowClear={true} onSelect={filterType} onClear={() => setFilterlist([])}>
            <Option value="Salary">Salary</Option>
            <Option value="Cash">Cash</Option>
            <Option value="Payback">Payback</Option>
            <Option value="Others">Others</Option>
          </Select>
          </div>
          </Space>
          <Space style={{margin: '30px', marginLeft: '100px'}} direction="vertical">
          <Table style={{width: '60vh'}}dataSource={addincomes} columns={columns} />
          <div style={{fontWeight: 'bold', fontSize: '20px'}}>Filter Results</div>
          <Table style={{width: '60vh'}}dataSource={filterlist} columns={columns} />
          </Space>
  
          
           
        </Flex>
  
  
        <Flex style={{marginTop: '20px'}} vertical>
  
        <Space  style={{marginLeft: '5vh'}}direction="horizontal">
          <div>
          <Select placeholder="Filter By Type" allowClear={true} onSelect={exfilterType} onClear={() => setexFilterlist([])}>
            <Option value="Rent">Rent</Option>
            <Option value="Food">Food</Option>
            <Option value="Shopping">Shopping</Option>
            <Option value="Creditcard">Credit Card</Option>
            <Option value="Others">Others</Option>
          </Select>
          </div>
          </Space>
          <Space style={{margin: '30px', marginLeft: '1vh'}} direction="vertical">
          <Table style={{width: '60vh'}} dataSource={addexpenses} columns={columns} />
          <div style={{fontWeight: 'bold', fontSize: '20px'}}>Filter Results</div>
          <Table style={{width: '60vh'}}dataSource={exfilterlist} columns={columns} />
          </Space>
          
  
        </Flex>
  
      </Flex>
  
      </div>)
  
  
  }
  </div>
    )
};

export default IncomesExpenses;