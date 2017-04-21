<template>
  <div class="mdc-layout-grid">
    <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
      <p v-show="error" class="mdc-typography--body1 invalid" style="margin: 0">{{ error }}</p>

      <form @submit.prevent="$emit('submit')">
        <google-autocomplete
          v-model="location.place"
          id="place"
          label="Where are you going?"
          placeholder="Search"
        />

        <mdc-select
          v-model="location.time"
          id="time"
          :options="options"
          label="When are you going?"
          width="100%" />

        <input type="submit" style="height: 0px; width: 0px; border: none; padding: 0px;" hidefocus="true" tabindex="-1" />
      </form>
    </div>
  </div>
</template>

<script>
import MdcSelect from '@/components/Select';
import TextField from '@/components/TextField';
import GoogleAutocomplete from '@/components/GoogleAutocomplete';

export default {
  name: 'LocationForm',

  components: { MdcSelect, TextField, GoogleAutocomplete },

  props: {
    location: {
      type: Object,
      required: true
    },

    error: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      options: [
        { text: 'Now', value: 0 },
        { text: '15 minutes', value: 15 },
        { text: '30 minutes', value: 30 },
        { text: '1 hour', value: 60 },
        { text: '1.5 hours', value: 90 },
        { text: '2 hours', value: (60 * 2) },
        { text: '3 hours', value: (60 * 3) },
        { text: '4 hours', value: (60 * 4) },
        { text: '5 hours', value: (60 * 5) },
        { text: '6 hours', value: (60 * 6) }
      ]
    };
  }
};
</script>
