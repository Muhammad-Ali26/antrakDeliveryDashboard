import axios from "axios";
// import { BASE_URL } from "./API"

const PutApi = async (url, postData) => {
  let config = {
    headers: {
      accessToken: localStorage.getItem("accessToken"),
    },
  };
  try {
    let res = await axios.put(
      "https://antrak.zeeshannawaz.com/" + url,
      postData,
      config
    );
    return res;
  } catch (error) {}
};

export default PutApi;
