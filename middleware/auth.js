import { useAuthStore } from '~/stores/auth';
const authStore = useAuthStore();
export default defineNuxtRouteMiddleware((to, from) => {
   // const user = authStore.user;
    if (!authStore.user) {
        return navigateTo('/login');
    }
})