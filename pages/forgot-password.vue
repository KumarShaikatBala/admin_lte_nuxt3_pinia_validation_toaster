<template>
    <main>
        <h4 class="mb-1 pt-2">Forgot Password? 🔒</h4>
        <p class="mb-4">Enter your email and we'll send you instructions to reset your password</p>
        <form class="mb-3" @submit.prevent="handleForgotPassword">
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" placeholder="Enter your email" v-model="email" autofocus />
            </div>
            <button type="submit" class="btn btn-primary d-grid w-100">Send Reset Link</button>
        </form>
        <div class="text-center">
            <NuxtLink to="/auth/" class="d-flex align-items-center justify-content-center">
                <i class="ti ti-chevron-left scaleX-n1-rtl"></i>
                Back to login
            </NuxtLink>
        </div>
    </main>
</template>

<script setup>
useHead({
    title: "Forgot Password | Admin Panel WIS",
});
definePageMeta({
    layout: "auth",
});

import { useAuthStore } from '~/stores/auth';
const authStore = useAuthStore();
const email = ref("samirraihan93@gmail.com");

async function handleForgotPassword() {
    if (email.value === "") {
        toastr.error('Please enter your email address');
        borderDanger.value = 'border border-danger'
        return;
    }
    try {
        const isForgotPasswordSuccess = await authStore.forgotPassword(email.value);
        if (!isForgotPasswordSuccess) {
            toastr.error('Please send again after few minutes!');
        } else {
            email.value = "";
        }
    } catch (error) {
        console.log(error);
    }
}
</script>

<style lang="scss" scoped></style>