import axios from "axios";
const PostAPI = async (url, postData) => {
  let config = {
    headers: {
      accessToken: localStorage.getItem("accessToken"),
    },
  };
  try {
    let response = await axios.post(
      "https://antrak.zeeshannawaz.com/" + url,
      postData,
      config
    );
    console.log(postData)
    return response;
  } catch (error) {}
};

// const PostAPI2 = async (url, formData) => {
//   let config = {
//     headers: {
//       accessToken: localStorage.getItem("accessToken"),
//       "ContentType": "multipart/form-data",
//     },
//   };
//   try {
//     let response = await axios.post(
//       "https://antrak.zeeshannawaz.com/" + url,
//       formData,
//       config
//     );
//     return response;
//   } catch (error) {}
// };
export default PostAPI
