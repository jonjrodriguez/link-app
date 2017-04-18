<template>
  <div class="mdc-card">
    <section class="mdc-card__primary">
      <h1 class="mdc-card__title mdc-card__title--large" v-show="title">{{ title }}</h1>
      <h2 class="mdc-card__subtitle" v-show="subtitle">{{ subtitle }}</h2>
    </section>

    <section v-show="$slots.default" class="mdc-card__supporting-text">
      <slot></slot>
    </section>

    <section class="mdc-card__actions">
      <slot name="actions"></slot>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Card',

  props: {
    title: String,

    subtitle: String
  }
};
</script>

<style lang="scss">
  @import "@material/card/mdc-card";
</style>
