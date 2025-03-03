import axiosInstance from "../src/axiosConfig/instance";

const userAPI = {
  signup: async (userData) => {
    try {
      // console.log("userData", userData);

      const response = await axiosInstance.post(`users/signup`, userData);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Signup API error:", error);
      throw error.response ? error.response.data : error;
    }
  },
};

export default userAPI;
