<script setup lang="js">
const preloader = ref(true);
onMounted(() => {
  setTimeout(() => {
    preloader.value = false;
  }, 1000);
});
// replace guardsToBeChecked with your guards
/*const guardsToBeChecked = "deshboard_management_view,deshboard_management_create,deshboard_management_edit,deshboard_management_delete";
const { checkGuards } = useCheckGuards(guardsToBeChecked);
const {
  hasViewPermission
} = checkGuards();*/
</script>
<template>
  <body class="hold-transition sidebar-mini layout-fixed">
    <div class="wrapper">
      <!-- Preloader -->
      <common-preloader :preloader="preloader"></common-preloader>
      <!-- Navbar -->
      <common-navbar></common-navbar>
      <!-- /.navbar -->
      <!-- Main Sidebar Container -->
      <common-header></common-header>
      <!-- Content Wrapper. Contains page content -->
      <div class="content-wrapper">
      <slot />
      </div>
      <!-- /.content-wrapper -->
      <common-footer></common-footer>
      <!-- Control Sidebar -->
      <aside class="control-sidebar control-sidebar-dark">
        <!-- Control sidebar content goes here -->
      </aside>
      <!-- /.control-sidebar -->
    </div>
  </body>
</template>

<style scoped></style>