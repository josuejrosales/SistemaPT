import axios from "axios";

var signalAxios = {};

class HttpAxiosConfig {

    constructor({ baseURL = null, headers = null }) {
        this.configDefault = { baseURL, headers };
    }

    getIntance(signal) {
        const axiosConfig = signal
            ? { ...this.configDefault, cancelToken: signalAxios[signal].token }
            : this.configDefault;

        return axios.create(axiosConfig);
    }

    updateHeader(name, value) {
        this.configDefault[name] = value;
    }
}

class HttpAxios extends HttpAxiosConfig {

    constructor(config) {
        super(config);
        this.params = { url: null, method: null, params: null, data: null };
    }

    updateParam(name, value) {
        this.params[name] = value;
    }

    #checkParam(param) {
        Object.keys(param).forEach(item => this.updateParam(item, param[item]));
    }
    #checkHeader(param) {
        Object.keys(param).forEach(item => this.updateHeader(item, param[item]));
    }

    applyConfig(config) {
        this.#checkHeader(config);
        return this;
    }

    applyParams(params) {
        this.#checkParam(params);
        return this;
    }

    verifyToken(signal) {
        return signalAxios[signal] ? true : false;
    }

    cancelToken(signal) {
        signalAxios[signal].cancel('onchange');
        delete signalAxios[signal];
    }

    async start(signal) {
        if (signal) {
            this.verifyToken(signal) && this.cancelToken(signal);
            signalAxios[signal] = axios.CancelToken.source();
        }
        const instance = this.getIntance(signal);
        return await instance(this.params);
    }
}

export { HttpAxiosConfig, HttpAxios }