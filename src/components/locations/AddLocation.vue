<template>
  <div>
    <toolbar
      title="Add Location"
      icon="arrow_back"
      :loading="loading"
      @action="$router.push({ name: 'add_people' })">
      <a class="mdc-typography--subheading1" @click="save">SAVE</a>
    </toolbar>

    <div class="mdc-toolbar-fixed-adjust">
      <location-form
        :location="location"
        :error="error"
        @submit="save" />

      <hr class="spacer" />

      <div class="mdc-layout-grid icon-grid">
        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
          <p class="mdc-typography--body1">Participants: {{ selectedContacts.length }}</p>
        </div>

        <div class="mdc-layout-grid__cell mdc-theme--accent-bg icon-grid__item"
          v-for="key in selectedContacts">
          <i class="material-icons mdc-theme--text-primary-on-accent" aria-hidden="true">person</i>
          <p class="mdc-theme--text-primary-on-accent">{{ contacts[key].name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Toolbar from '@/components/Toolbar';
import LocationForm from './Form';

export default {
  name: 'AddLocation',

  components: { Toolbar, LocationForm },

  props: {
    loading: {
      type: Boolean,
      default: false
    },

    contacts: {
      type: Object,
      required: true
    },

    selectedContacts: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      location: { place: '', time: 0 },
      error: ''
    };
  },

  created() {
    if (this.selectedContacts.length === 0) {
      this.$router.push({ name: 'add_people' });
    }
  },

  methods: {
    save() {
      if (!this.location.place) {
        this.error = 'Add a location.';
        return;
      }

      this.error = '';
      this.$emit('save', this.location);
    }
  }
};
</script>
