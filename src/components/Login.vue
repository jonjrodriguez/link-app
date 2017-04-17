<template>
  <div class="mdc-layout-grid">
    <div class="heading mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
      <h1 class="mdc-typography--display1 margin-0">Login</h1>
    </div>

    <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
      <text-field
        id="username"
        label="Username"
        width="100%"
        required />

      <text-field
        id="password"
        label="Password"
        type="password"
        width="100%"
        required />

      <p>
        <button class="mdc-button mdc-button--primary mdc-button--raised" v-ripple>Login</button>
      </p>
    </div>
  </div>
</template>

<script>
import TextField from './TextField';

export default {
  name: 'Login',

  components: { TextField }
};
</script>

