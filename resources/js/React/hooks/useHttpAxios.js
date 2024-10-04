
import axios from "axios";
import { useEffect, useState } from "react";
import LOAD from "../global/load";

var signalAxios = {}

function usehttpAxios({ url, method = "GET", signal = null, force = false }
) {
    const [link, setLink] = useState(url);

    const signal_ = signal ?? link.toString();

    const [response, setResponse] = useState(null);

    const [error, setError] = useState(null);

    const [countForce, setCountForce] = useState(0);

    const [loading, setLoading] = useState(LOAD.initial);

    const [start, setStart] = useState(false);

    const [params, setParams] = useState(null);


    const httpResolve = async () => {

        signalAxios[signal_] && signalAxios[signal_].cancel('onchange');

        signalAxios[signal_] = axios.CancelToken.source();

        const intance = axios.create({

            baseURL: `/api`,

            headers: {

                Authorization: `Bearer ${window.auth_token}`,

                'Content-Type': 'multipart/form-data',

                'Accept': 'application/json',
            },
            cancelToken: signalAxios[signal_].token
        });

        try {

            const response = await intance({ url: link, method, params });

            delete signalAxios[signal_];

            setResponse(response.data);

            return { state: true };

        } catch (error) {

            axios.isCancel(error);

            setLoading(LOAD.fail);

            return { state: false, message: error.message };
        }
    }

    const funHttp = async (stopLoad = true) => {

        setLoading(LOAD.progress);

        const validated = await httpResolve();

        if (stopLoad || validated.state) {

            setStart(false);

            setLoading(LOAD.complete);
        }

        if (stopLoad && !validated.state) {

            setStart(false);

            setError({ id: signal_, message: validated.message });
        }

        (!validated.state && !stopLoad) && setTimeout(() => setCountForce(countForce + 1), 1000);
    }

    const startHttp = (newParams = null) => {

        setResponse(null);

        setError(null);

        method == "GET" && newParams ?

            setLink(url + newParams.value) : setParams({ ...params, ...(newParams || {}) });

        setStart(true);
    };

    useEffect(() => {

        if (start == false) return;

        if (force && countForce < 4) {

            funHttp(false);

        } else funHttp();

    }, [start, force, countForce, params, link])

    return { response, error, loading, startHttp }
}

export { usehttpAxios };
