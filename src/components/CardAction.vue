<template>
  <button class="mdc-button mdc-button--compact mdc-card__action" @click="$emit('action')">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: 'CardAction',

  props: {
    text: {
      type: String,
      required: true
    }
  }
};
</script>
