import axios from "axios";

export const GetUserApi = async () => {
  const response = await axios.get("http://localhost:3000/api/v1/user", {
    withCredentials: true,
  });
  return response.data.users; // return user list directly
};
export const updateUserApi = async ({ id, data }) => {
  const response = await axios.put(`http://localhost:3000/api/v1/user/${id}`, data);
  return response.data;
};




export const deleteUserApi = async (id) => {
  const response = await axios.delete(`http://localhost:3000/api/v1/user/${id}`);
  return response.data;
};