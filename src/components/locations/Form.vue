<template>
  <div class="mdc-layout-grid">
    <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
      <p v-show="error" class="mdc-typography--body1 invalid" style="margin: 0">{{ error }}</p>

      <form @submit.prevent="$emit('submit')">
        <text-field
          v-model="event.location"
          id="location"
          label="Where are you going?"
          width="100%"
          required />

        <text-field
          v-model="event.time"
          id="time"
          label="When are you going?"
          width="100%"
          required />

          <input type="submit" style="height: 0px; width: 0px; border: none; padding: 0px;" hidefocus="true" tabindex="-1" />
      </form>
    </div>
  </div>
</template>

<script>
import TextField from '@/components/TextField';

export default {
  name: 'LocationForm',

  components: { TextField },

  props: {
    event: {
      type: Object,
      required: true
    },

    error: {
      type: String,
      default: ''
    }
  }
};
</script>
