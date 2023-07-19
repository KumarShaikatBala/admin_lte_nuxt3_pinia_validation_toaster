<script setup lang="js">
const { preloader } = defineProps({
  preloader: Boolean
})
</script>

<template>
    <div v-if="preloader" class="preloader flex-column justify-content-center align-items-center">
        <img class="animation__shake" src="dist/img/AdminLTELogo.png" alt="AdminLTELogo" height="60" width="60">
    </div>
</template>

<style scoped>

</style>