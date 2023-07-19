import { useAuthStore } from '~/stores/auth';

export const useMyFetch = async (path, options) => {
    const config = useRuntimeConfig();
    const authStore = useAuthStore();

    try {
        const response = await $fetch(
            config.public['apiBaseUrl'] + `${path}`,
            {
                ...options,
                headers: {
                    Authorization: `Bearer ${authStore.token}`
                },
            }
        );
        if (response.status !== "success") {
            toastr.error("Something went wrong!");
        }

        return response;
    } catch (error) {
        console.error('Error:', error.response.status, '-', error.response.statusText);

        if (error.response.status === 401 && error.response.statusText === 'Unauthorized') {
            authStore.logout();
        }

        if (error.response.status === 422) {
            toastr.error("Invalid data! Please try again.");
        }

        if (error.response.status !== 401 && error.response.status !== 422 ) {
            toastr.error("Something went wrong! Please try again later.");
        }
    }
}