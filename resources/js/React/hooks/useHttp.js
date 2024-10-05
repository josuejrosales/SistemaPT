import { useEffect, useState } from "react";
import LOAD from "../global/load";
import toast from "react-hot-toast";
import { HttpAxios } from "../class/HttpAxios";

const configToast = {
    style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
        fontSize: '16px'
    }
}

var instance = null;

const model = new HttpAxios({
    baseURL: `/api`,
    headers: {
        'Authorization': `Bearer ${window.auth_token}`,
        'Accept': 'application/json',
    },
});

function useHttp({ url = "", method = "GET", force = 0, alert = false, signal = null }) {

    const [force_, setForce_] = useState(force);

    const [response, setResponse] = useState(null);

    const [error, setError] = useState(null);

    const [loading, setLoading] = useState(LOAD.initial);

    const setData = (data) => setResponse(data);

    const showError = (msg) => toast.error(msg, configToast);

    const process = () => {

        setLoading(LOAD.progress);

        instance.start(signal)

            .then(res => { setResponse(res.data); setLoading(LOAD.complete); })

            .catch(err => { if (err.code != "ERR_CANCELED") { setError(err.response.data); setLoading(LOAD.fail); } })

            .finally(() => { force_ > 0 && setForce_(force_ - 1); });
    }

    const startHttp = (param = {}, config = {}) => {

        instance = model.applyConfig(config).applyParams({ ...{ url, method }, ...param });

        process();
    }

    useEffect(() => {

        loading == LOAD.fail && force_ > 0 && instance && process()

        return () => { if (loading == LOAD.complete) { instance = null; setForce_(0); } }

    }, [loading, force_]);

    useEffect(() => {

        alert && response?.data && toast.success(response.message, configToast);

    }, [response]);

    useEffect(() => {

        alert && error && showError(error.message);

    }, [error, alert]);

    return { startHttp, showError, setData, response, error, loading };
}

export default useHttp;