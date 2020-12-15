import router from "../router";

export const getApiURL = () => { return process.env.VUE_APP_API_URL; }

export const getBaseURL = () => { return process.env.BASE_URL; }

export const getNodeEnv = () => { return process.env.NODE_ENV; }

export const saveUserSession = (user) => user && sessionStorage.setItem("user", JSON.stringify(user));

export const getUser = () => { return JSON.parse(sessionStorage.getItem("user")) }; // TODO - passar function para mixin

export const clearUserSession = () => { 
    sessionStorage.clear();
    router.push("/");
};


