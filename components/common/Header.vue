<script setup lang="js">
import {useAuthStore} from "../../stores/auth";
</script>

<template>
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="#" class="brand-link">
      <img src="/images/vumi_logo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
           style="opacity: .8">
      <span class="brand-text font-weight-light">bhumipedia</span>
    </a>
    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="/images/vumi_logo.png" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info" v-if="useAuthStore().isAuthenticated">
          <a href="#" class="d-block">{{ useAuthStore().user.name }}</a>
        </div>
      </div>

      <!-- SidebarSearch Form -->
      <!--            <div class="form-inline">
                      <div class="input-group" data-widget="sidebar-search">
                          <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search">
                          <div class="input-group-append">
                              <button class="btn btn-sidebar">
                                  <i class="fas fa-search fa-fw"></i>
                              </button>
                          </div>
                      </div>
                  </div>-->

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <li class="nav-item">
            <nuxt-link to="/dashboard" class="nav-link">
              <i class="nav-icon fas fa-file"></i>
              <p>Dashboard</p>
            </nuxt-link>
          </li>
          <!--                    <li class="nav-item menu-open">
                                  <a href="#" class="nav-link active">
                                      <i class="nav-icon fas fa-tachometer-alt"></i>
                                      <p>
                                          Roles Permissions
                                          <i class="right fas fa-angle-left"></i>
                                      </p>
                                  </a>
                                  <ul class="nav nav-treeview">
                                      <li class="nav-item">
                                          <nuxt-link to="/roles" class="nav-link active">
                                              <i class="far fa-circle nav-icon"></i>
                                              <p>Roles</p>
                                          </nuxt-link>
                                      </li>
                                      <li class="nav-item">
                                          <a href="#" class="nav-link">
                                              <i class="far fa-circle nav-icon"></i>
                                              <p>Permissions</p>
                                          </a>
                                      </li>
                                  </ul>
                              </li>
                              <li class="nav-header">MISCELLANEOUS</li>-->
          <li class="nav-item">
            <nuxt-link to="/form" class="nav-link">
              <i class="nav-icon fas fa-file"></i>
              <p>Form</p>
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/table" class="nav-link">
              <i class="nav-icon fas fa-file"></i>
              <p>Table</p>
            </nuxt-link>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>

<style scoped>

</style>