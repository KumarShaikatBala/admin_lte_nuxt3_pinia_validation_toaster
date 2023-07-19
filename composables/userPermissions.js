import { useAuthStore } from '~/stores/auth';

export function usePermissions() {
    const authStore = useAuthStore();
    if (authStore.user.role_rlt){
        const hasPermissions = authStore.user.role_rlt.roles.permissions;
        const availableGuards = [];
        for (let i = 0; i < hasPermissions.length; i++) {
            availableGuards.push(hasPermissions[i].guard_name);
        }

        return {
            availableGuards,
        };
    }
    else {
        useAuthStore().logout();
    }

}
