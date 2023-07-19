<template>
    <main>
        <h4 class="mb-1 pt-2">Reset Password 🔒</h4>
        <p class="mb-4">for <span class="fw-bold">{{ email }}</span></p>
        <form @submit.prevent="handleResetPassword">
            <div class="mb-3 form-password-toggle">
                <label class="form-label" for="password">New Password</label>
                <div class="input-group input-group-merge">
                    <input type="password" class="form-control" v-modal="form.password" placeholder="Password"
                        aria-describedby="password" :class="!form.password ? borderDanger : ''" />
                </div>
            </div>
            <div class="mb-3 form-password-toggle">
                <label class="form-label" for="confirm-password">Confirm Password</label>
                <div class="input-group input-group-merge">
                    <input type="password" class="form-control" v-modal="form.password_confirmation"
                        placeholder="Confirm Password" aria-describedby="password"
                        :class="!form.password_confirmation ? borderDanger : ''" />
                </div>
            </div>
            <button type="submit" class="btn btn-primary d-grid w-100 mb-3">Set new password</button>
            <div class="text-center">
                <NuxtLink to="/auth/">
                    <i class="ti ti-chevron-left scaleX-n1-rtl"></i>
                    Back to login
                </NuxtLink>
            </div>
        </form>
    </main>
</template>

<script setup>
useHead({
    title: "Reset Password | Admin Panel WIS",
});
definePageMeta({
    layout: "auth",
});
import { useAuthStore } from '~/stores/auth';
const authStore = useAuthStore();
const route = useRoute();
const email = route.query.email;
const token = route.query.token;

function checkRoute() {
    if (!email && !token) {
        navigateTo('/auth');
        return;
    }
}
checkRoute();

const form = ref({
    token: token,
    email: email,
    password: "",
    password_confirmation: "",
});
const borderDanger = ref('')

async function handleResetPassword() {
    if (form.value.password === "") {
        toastr.error('Please enter your password');
        borderDanger.value = 'border border-danger'
        return;
    }
    if (form.value.password !== form.value.password_confirmation) {
        toastr.error('Password and confirm password not match');
        borderDanger.value = 'border border-danger'
        return;
    }
    try {
        const isResetPassword = await authStore.resetPassword(form.value);
        if (!isResetPassword) {
            toastr.error('Please try again!');
            return;
        } else {
            return;
        }
    } catch (error) {
        console.log('error', error);
    }
}
</script>

<style lang="scss" scoped></style>