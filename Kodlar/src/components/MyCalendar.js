import React, { useState, useEffect } from "react";
import { Alert, Calendar, Modal, Card, Space, Spin } from 'antd';
import dayjs from 'dayjs';

const MyCalendar = ({ addincomes, addexpenses }) => {
  const [value, setValue] = useState(() => dayjs('2024-06-26'));
  const [selectedValue, setSelectedValue] = useState(() => dayjs('2024-06-26'));
  const [incomeresults, setIncomeresults] = useState([]);
  const [expenseresults, setExpenseresults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSelect = (newValue) => {
    setIsModalOpen(true);
    setValue(newValue);
    setSelectedValue(newValue);
    getData(newValue.format('DD-MM-YYYY'));
  };

  const onPanelChange = (newValue) => {
    setValue(newValue);
  };

  const getData = (selectedDate) => {
    const matchedIncomes = addincomes.filter(incomes => incomes.date === selectedDate);
    setIncomeresults(matchedIncomes);
    const matchedExpenses = addexpenses.filter(expenses => expenses.date === selectedDate);
    setExpenseresults(matchedExpenses);
  }

  const getIncomes = () => {
    return incomeresults.map((incomes) => (
      <div key={incomes.type}><Card
      title="Income"
      bordered={false}
      style={{
        width: 300,
      }}
    >
      <p>Type: {incomes.type}</p>
      <p>Price: {incomes.price}</p>
      <p>Amount: {incomes.amount}</p>
    </Card></div>
    ));
  }

  const getExpenses = () => {
    return expenseresults.map((expenses) => (
      <div key={expenses.type}><Card
      title="Expense"
      bordered={false}
      style={{
        width: 300,
      }}
    >
      <p>Type: {expenses.type}</p>
      <p>Price: {expenses.price}</p>
      <p>Amount: {expenses.amount}</p>
    </Card></div>
    ));
  }

  const selectedDate = selectedValue.format('DD-MM-YYYY');

  return (
    <div>
      {loading ? 
      
      (<Spin className='center' tip='Loading' size="large">Loading...</Spin>) :(
      <div>
        <Alert message={`You selected date: ${selectedDate}`} />
      <Modal width={650} title={selectedDate} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Space direction="horizontal">
        <div>
          <div>{getIncomes()}</div>
        </div>
        <div>
        <div>{getExpenses()}</div>
        </div>
        </Space>
      </Modal>
      <Calendar value={value} onSelect={onSelect} onPanelChange={onPanelChange} />
      </div>)}
    </div>
  );
};

export default MyCalendar;