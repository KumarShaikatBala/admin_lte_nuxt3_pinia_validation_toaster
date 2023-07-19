<script setup>

import {useAuthStore} from "~/stores/auth";

const {$toast} = useNuxtApp();
const authStore = useAuthStore()

const {passwordIcon, handleShowPassword} = usePasswordToggle()

import {useForm} from 'vee-validate';
import * as yup from 'yup';
import usePasswordToggle from "~/composables/usePasswordToggle";
/*
const form = ref({

  email: "shaikat@gmail.com",
  password: "12345678",

});

*/
const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});


const {useFieldModel, errors, handleSubmit} = useForm({
  validationSchema: schema,
});

const [email, password] = useFieldModel(['email', 'password']);

const borderDanger = ref('')
const loginFailed = ref(false)

useHead({
  title: "Login | Admin Panel ",
});

definePageMeta({
  layout: "auth",
});

const onSubmit = handleSubmit((values) => {
  try {
    const form = ref({
      email: email.value,
      password: password.value,
    });
    const isSigninSuccess = authStore.signin(form.value);
    if (!isSigninSuccess) {
      loginFailed.value = true
      borderDanger.value = 'border border-danger'
    }
  } catch (error) {
    console.log(error);
  }


});

async function handleSignin() {
  if (email.value === "") {
    alert('Please enter your email')
    $toast('Please enter your email', 'warning', 2000);
    borderDanger.value = 'border border-danger'
    return false;
  }
  if (password.value === "") {
    $toast('Please enter your password', 'warning', 2000);
    borderDanger.value = 'border border-danger'
    return false;
  }
  try {
    const form = ref({
      email: email.value,
      password: password.value,

    });

    console.log('', form.value);

    const isSigninSuccess = await authStore.signin(form.value);
    if (!isSigninSuccess) {
      loginFailed.value = true
      borderDanger.value = 'border border-danger'
    }
  } catch (error) {
    console.log(error);
  }
}

</script>

<template>
  <body class="hold-transition login-page">
  <div class="login-box">
    <div class="login-logo">
      <a href="#"><b>Template </b> Dashboard</a>
    </div>
    <!-- /.login-logo -->
    <div class="card">
      <div class="card-body login-card-body">
        <p class="login-box-msg">Sign in to Start your session</p>

        <form @submit.prevent="onSubmit">
          <div class="input-group mb-3">
            <input type="email" class="form-control" placeholder="Email" v-model="email" autofocus
                   :class="!email || loginFailed ? borderDanger : ''">
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-envelope"></span>
              </div>
            </div>
            <span class="error">
                       {{ errors.email }}
                      </span>
          </div>
          <div class="form-password-toggle input-group mb-3">
            <input type="password" class="form-control" placeholder="Password" v-model="password"
                   :class="!password || loginFailed ? borderDanger : ''">
            <div class="input-group-append">
              <div class="input-group-text">
                <span :class="passwordIcon" @click="handleShowPassword"></span>
              </div>
            </div>
            <span class="error">{{ errors.password }}</span>
          </div>
          <div class="row">
            <div class="col-8">
              <div class="icheck-primary">
                <input type="checkbox" id="remember">
                <label for="remember">
                  Remember Me
                </label>
              </div>
            </div>
            <!-- /.col -->
            <div class="col-4">
              <button type="submit" class="btn btn-primary btn-block">Sign In</button>
            </div>
            <!-- /.col -->
          </div>

        </form>
        <div class="social-auth-links text-center mb-3">
          <p>- OR -</p>
          <a href="#" class="btn btn-block btn-primary">
            <i class="fab fa-facebook mr-2"></i> Sign in using Facebook
          </a>
          <a href="#" class="btn btn-block btn-danger">
            <i class="fab fa-google-plus mr-2"></i> Sign in using Google+
          </a>
        </div>
        <!-- /.social-auth-links -->

        <p class="mb-1">
          <a href="#">I forgot my password</a>
        </p>
        <p class="mb-0">
          <a href="/register" class="text-center">Register a new membership</a>
        </p>
      </div>
      <!-- /.login-card-body -->
    </div>
  </div>
  </body>
</template>

<style scoped>
.form-password-toggle{
  cursor: pointer;
}
</style>