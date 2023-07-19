<script setup>
const {$toast} = useNuxtApp();
useHead({
  title: "Sign Up | Admin Panel",
});
definePageMeta({
  layout: "auth",
});
import {useAuthStore} from '~/stores/auth';

const authStore = useAuthStore();

import {useForm} from 'vee-validate';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().required("Please enter your full name"),
  email: yup.string().email("Please Enter Valid Email").required(),
  password: yup.string().required("Password is Required").min(6),
  password_confirmation: yup
      .string()
      .required("Retype your password")
      .oneOf([yup.ref('password')], 'Passwords do not match'),
  terms: yup.bool().required().oneOf([true], 'Please accept the terms and conditions')
});


const {useFieldModel, errors, handleSubmit} = useForm({
  validationSchema: schema,
});

const [
  name,
  email,
  password,
  password_confirmation,
  terms
] = useFieldModel([
  'name',
  'email',
  'password',
  'password_confirmation',
  'terms',
]);

/*const form = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  terms: false,
});*/

function updateTerms() {
  terms.value = !terms.value;
}

const onSubmit = handleSubmit((values) => {
/*  alert(JSON.stringify(values, null, 2));
  const form = ref({
    name: name.value,
    email: email.value,
    password: password.value,
    password_confirmation: password_confirmation.value,
    terms: terms.value
  });*/
  try {
    //authStore.signup(form.value);
    authStore.signup(values);
  } catch (error) {
    console.log(error);
  }
});

async function handleSignUp() {
  if (form.value.name === "") {
    $toast('Please enter your full name', "error", 2000);
    borderDanger.value = 'border border-danger'
    return;
  }
  if (form.value.email === "") {
    $toast('Please enter your email address', "error", 2000);
    borderDanger.value = 'border border-danger'
    return;
  }
  if (form.value.password === "") {
    $toast('Please enter your password', "error", 2000);
    borderDanger.value = 'border border-danger'
    return;
  }
  if (form.value.password !== form.value.password_confirmation) {
    $toast('Password and confirm password not match', "error", 2000);
    borderDanger.value = 'border border-danger'
    return;
  }
  if (!form.value.terms) {
    $toast('Please agree to the terms and conditions', "error", 2000);
    borderDanger.value = 'border border-danger'
    return;
  }

  try {
    await authStore.signup(form.value);
  } catch (error) {
    console.log(error);
  }
}
</script>
<template>
  <body class="hold-transition register-page">
  <div class="register-box">
    <div class="card card-outline card-primary">
      <div class="card-header text-center">
        <a href="/" class="h1"><b>Dashboard</b>Title</a>
      </div>
      <div class="card-body">
        <p class="login-box-msg">Register A new membership</p>

        <form @submit.prevent="onSubmit">
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Full name" v-model="name" autofocus
            >
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-user"></span>
              </div>
            </div>
            <span class="error">
                       {{ errors.name }}
                      </span>
          </div>
          <div class="input-group mb-3">
            <input type="email" class="form-control" placeholder="Email" v-model="email" autofocus
            >
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-envelope"></span>
              </div>
            </div>
            <span class="error">
                       {{ errors.email }}
                      </span>
          </div>
          <div class="input-group mb-3">
            <input type="password" class="form-control" placeholder="Password" v-model="password"
                   aria-describedby="password">
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-lock"></span>
              </div>
            </div>
            <span class="error">
                       {{ errors.password }}
                      </span>
          </div>
          <div class="input-group mb-3">
            <input type="password" class="form-control" placeholder="Retype password"
                   v-model="password_confirmation" aria-describedby="password">
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-lock"></span>
              </div>
            </div>
            <span class="error">
                       {{ errors.password_confirmation }}
                      </span>
          </div>
          <div class="row">
            <div class="col-8">
              <div class="icheck-primary">
                <input type="checkbox" id="agreeTerms" name="terms" value="agree" :checked="terms"
                       @change="updateTerms">
                <label for="agreeTerms">
                  I agree to the <a href="#">terms</a>
                </label>
              </div>
              <span class="error">
                       {{ errors.terms }}
                      </span>

            </div>

            <div class="col-4">
              <button type="submit" class="btn btn-primary btn-block">Register</button>
            </div>
          </div>
        </form>

        <div class="social-auth-links text-center">
          <a href="#" class="btn btn-block btn-primary">
            <i class="fab fa-facebook mr-2"></i>
            Sign up using Facebook
          </a>
          <a href="#" class="btn btn-block btn-danger">
            <i class="fab fa-google-plus mr-2"></i>
            Sign up using Google+
          </a>
        </div>

        <NuxtLink to="/login" class="text-center">I already have a membership</NuxtLink>
      </div>
      <!-- /.form-box -->
    </div><!-- /.card -->
  </div>
  </body>
</template>

