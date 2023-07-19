import axios from "axios";
import {useAuthStore} from "~/stores/auth";

export default defineNuxtPlugin(() => {

    // create axios instance
    const api = axios.create({
        // set base url
        baseURL: "http://localhost:8080/api/",
        // set headers
        headers: {
            common: {
                Accept: "application/json, text/plain, */*",
            },
        },
    });

    api.interceptors.request.use(
        (config) => {
            const authStore = useAuthStore();
            config.headers.Authorization = `Bearer ${authStore.token}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );





    // axios response interceptor
    api.interceptors.response.use(

        (response) => {
            return response;
        },
        (error) => {
            if (error) {

                if (error.response.status === 401) {
                    useAuthStore().logout();
                }
                return Promise.reject(error);
            }

        }
    );


    return {
        provide: {
            axios: api
        }
    }
})