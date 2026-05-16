import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/transactions`;

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

export const deleteTransaction = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};

export const updateTransaction = async (id, transactionData) => {
  const response = await axios.put(`${API_URL}/${id}`, transactionData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return response.data;
};
