import axios from "axios";

const BASE_URL = "http://localhost:3000/api/v1/asset";

// Get all assets
export const getAllAssetsApi = async () => {
  const response = await axios.get(`${BASE_URL}/get-all-asset`);
  return response.data.data;
};

// Get asset by id
export const getAssetByIdApi = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data.data;
};

// Create asset
export const createAssetApi = async (data, token) => {
  const response = await axios.post(`${BASE_URL}/create-asset`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Update asset
export const updateAssetApi = async ({ id, data, token }) => {
  const response = await axios.put(`${BASE_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Delete asset
export const deleteAssetApi = async (id, token) => {
  const response = await axios.delete(`${BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
