import axios from 'axios';

const API_URL = 'http://localhost:5000/api/transactions';

const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return user?.token;
};

export const getTransactions = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const createTransaction = async (transactionData) => {
  const response = await axios.post(API_URL, transactionData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};
