import axios from "axios";

const axiosPublic = axios.create({
      baseURL: 'http://localhost:8001/', // Update to your backend URL
    });
    
    
const useAxiosPublic = () => {
      return axiosPublic;
};

export default useAxiosPublic;