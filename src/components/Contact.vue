<template>
  <div class="mdc-layout-grid__cell">
    <div class="mdc-card">
      <section class="mdc-card__primary">
        <h1 class="mdc-card__title mdc-card__title--large">{{ contact.name }}</h1>
        <h2 class="mdc-card__subtitle">{{ contact.number }}</h2>
      </section>
      <section class="mdc-card__actions">
        <button class="mdc-button mdc-button--raised mdc-button--accent mdc-button--compact mdc-card__action" @click="$emit('update')">Update</button>
        <button class="mdc-button mdc-button--raised mdc-button--compact mdc-card__action invalid" @click="$emit('delete')">Delete</button>
      </section>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Contact',

  props: {
    contact: {
      type: Object,
      required: true
    }
  }
};
</script>
