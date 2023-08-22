import { useEffect, useState } from "react";
import axios from "axios";
const GetAPI = (url) => {
    const [getData, setData] = useState([]);
    useEffect(() => {
        
        var config = {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
              },
        };
        const fetchData = () => {
            axios.get("https://antrak.zeeshannawaz.com/" + url, config).then((dat) => {
                setData(dat.data);
            });
        };
        fetchData();

        
    }, [url]);
    const reFetch = async () => {
        var config = {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
              },
        };
        try {
            axios.get("https://antrak.zeeshannawaz.com/" + url, config).then((dat) => {
                setData(dat.data);
            });
        } catch (err) { }
    };
    return { getData,  reFetch };
};
export default GetAPI;