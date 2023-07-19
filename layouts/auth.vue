<script setup lang="js">
import { useAuthStore } from '~/stores/auth';
const authStore = useAuthStore();

const showLogin = ref(true);
if (authStore.isAuthenticated) {
  showLogin.value = false;
  navigateTo('/');
}

</script>
<template>
  <common-preloader></common-preloader>
    <slot/>
</template>

<style scoped>

</style>