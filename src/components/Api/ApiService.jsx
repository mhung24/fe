import axios from "axios";
const url = `http://localhost:3000/products`;

const ApiService = {
  ApiProduct: async () => {
    return await axios(url);
  },
};

export default ApiService;
