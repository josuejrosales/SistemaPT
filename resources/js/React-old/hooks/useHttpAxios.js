import axios from "axios";
import LOAD from "../global/load";
import { useEffect, useState } from "react";

function getIntanceAxios(method, url, data) {

    const token = window.auth_token || "";

    const intance = axios.create({
        baseURL: '/api',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
        },
    });
    return intance({ method, url, data });
}


function useHttpAxios({ method = "GET", url = "/" }) {

    const [loading, setLoading] = useState(LOAD.initial);
    const [result, setResult] = useState(null);
    const [data, setData] = useState(null);

    const init_http = (params = null) => {
        params && setData(params);
        setLoading(LOAD.progress);
    };

    useEffect(() => {

        if (loading === LOAD.progress) {
            getIntanceAxios(method, url, data).then(e => {
                setLoading(LOAD.complete);
                setResult(e.data);
            }).catch(err => {
                setLoading(LOAD.fail);
                console.log(err.response.data);
            })
        }

    }, [loading]);


    return {
        data: result,
        state: loading,
        start: init_http,
    };
}


export default useHttpAxios;