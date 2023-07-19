<template>
    <main>
        <h4 class="mb-1 pt-2">Verify your email ✉️</h4>
        <p class="text-start mb-4">
            Account activation link sent to your email address: <b class="text-primary"> {{ email }} </b> Please follow the
            link inside to
            continue.
        </p>
        <NuxtLink class="btn btn-primary w-100 mb-3" to="/auth/"> Skip for now </NuxtLink>
        <p class="text-center mb-0">
            Didn't get the mail?
            <span class="text-primary cursor-pointer" @click="handleResend"> Resend </span>
        </p>
    </main>
</template>

<script setup>
useHead({
    title: "Verify Email | Admin Panel",
});
definePageMeta({
    layout: "auth",
});
import { useAuthStore } from '~/stores/auth';
const authStore = useAuthStore();
const route = useRoute();
const email = route.query.email;

function checkRoute() {
    if (!email) {
        navigateTo('/auth');

    }
}
checkRoute();

async function handleResend() {
    try {
        const isResendVerification = await authStore.resendVerificationEmail(email);
        if (!isResendVerification) {
            toastr.error('Please send again after few minutes!');
            return;
        } else {
            // toastr.success('Email verification link sent successfully');
            return;
        }
    } catch (error) {
        console.log('error', error);
    }
}
</script>

<style lang="scss" scoped></style>