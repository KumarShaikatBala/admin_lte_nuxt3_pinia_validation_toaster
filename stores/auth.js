import {defineStore} from 'pinia'

//const config = useRuntimeConfig();
import {useToast} from 'vue-toastification'
import {useMyFetch} from "~/composables/useMyFetch";

export const useAuthStore = defineStore('auth', {


    state: () => ({
        isAuthenticated: localStorage.getItem("AUTH_STATUS") || false,
        user: JSON.parse(localStorage.getItem("AUTH_TOKEN_USER")) || null,
        token: localStorage.getItem("AUTH_TOKEN") || null,
    }),

    actions: {
        async signup(formData) {
            const { $axios } = useNuxtApp();
            try {
                $axios.post('/auth/signup',formData)
                    .then(response => {
                        if (response.data.data.status === "success") {
                            navigateTo('/auth/verify-email?email=' + formData.email);
                            return true;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        if (error.response.status === 422) {
                            useToast().warning(error.response.data.data.message);
                        } else {
                            console.log(error);
                            useToast().error(error.response.data.message);
                        }
                    });
            } catch (error) {
                console.log(error);
            }
        },
        async resendVerificationEmail(email) {
            const { $axios } = useNuxtApp();
            try {
                const response = await $fetch(
                    config.public['apiBaseUrl'] + "auth/resendVerificationEmail", {
                        method: "POST",
                        body: JSON.stringify({email}),
                    });
                if (response.data.status === "success") {
                    navigateTo('/auth/verify-email?email=' + email);
                    useToast().success('Email verification link sent successfully');
                    return true;
                }
            } catch (error) {
                useToast().error('Email verification link sending failed! Please try again.');
                console.log(error);
            }
        },
        async signin(formData) {
            const { $axios } = useNuxtApp();

            const inBrowser = typeof window !== 'undefined'
            try {
                $axios.post('/auth/signin',formData)
                    .then(response => {
                        if (response.data.data.status === "success") {
                            useToast().info('Login successful');
                            this.isAuthenticated = true;
                            this.user = response.data.data.user;
                            this.token = response.data.data.token;
                            localStorage.setItem("AUTH_STATUS", this.isAuthenticated);
                            localStorage.setItem("AUTH_TOKEN", response.data.data.token);
                            localStorage.setItem("AUTH_TOKEN_USER", JSON.stringify(response.data.data.user));
                            navigateTo('/');
                            return true;
                        }
                    })
                    .catch(error => {
                        if (error.response.status === 401) {
                            useToast().warning(error.response.data.data.message);
                        } else {
                            console.log(error);
                            useToast().error(error.response.status);
                        }
                    });
            } catch (error) {
                console.log(error);
            }
        },
        async logout() {
            const { $axios } = useNuxtApp();
            try {
                const response = await $axios.post("auth/logout", {
                        headers: {
                            Authorization: `Bearer ${this.token}`,
                        },
                    });
                if (response.data.status === "success") {
                    useToast().warning('Logout successful');
                    this.isAuthenticated = false;
                    this.user = null;
                    this.token = null;
                    localStorage.removeItem("AUTH_STATUS");
                    localStorage.removeItem("AUTH_TOKEN");
                    localStorage.removeItem("AUTH_TOKEN_USER");
                    navigateTo('/login');
                    return true;
                }
            } catch (error) {
                console.log(error);
            }
        },
        async forgotPassword(email) {
            try {
                const response = await useMyFetch("auth/forgotPassword", {
                        method: "POST",
                        body: JSON.stringify({email}),
                    });
                if (response.data.status === "success") {
                    useToast().success(response.data.message);
                    return true;
                }
            } catch (error) {
                useToast().error('Password reset email sending failed! Please try again after few minutes.');
                console.log(error);
            }
        },
        async resetPassword(formData) {
            try {
                const response = await $fetch(
                    config.public['apiBaseUrl'] + "auth/resetPasswordProcess", {
                        method: "POST",
                        body: JSON.stringify(formData),
                    });
                if (response.data.status === "success") {
                    useToast().success(response.data.message);
                    navigateTo('/auth');
                    return true;
                }
            } catch (error) {
                useToast().error('Password reset failed! Please try again.');
                console.log(error);
            }
        }
    },
})
