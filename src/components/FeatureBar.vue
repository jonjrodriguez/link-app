<template>
  <div class="feature-bar mdc-theme--accent-bg mdc-theme--text-primary-on-accent">
    <h1 class="mdc-typography--headline margin-0">{{ title }}</h1>
  </div>
</template>

<script>
  export default {
    name: 'FeatureBar',

    props: {
      title: {
        type: String,
        required: true
      }
    }
  };
</script>

<style lang="scss">
  .feature-bar {
    padding: 1rem;
  }
</style>
