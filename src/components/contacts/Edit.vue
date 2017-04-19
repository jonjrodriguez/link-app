<template>
  <div>
    <toolbar
      :title="title"
      icon="close"
      fixed
      @action="$router.back()">
      <a class="mdc-typography--subheading1" @click="editContact">SAVE</a>
    </toolbar>

    <div class="mdc-toolbar-fixed-adjust">
      <div class="mdc-layout-grid">
        <form @submit.prevent="editContact" class="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
          <p v-show="error" class="mdc-typography--body1 invalid">{{ error }}</p>

          <text-field
            v-model="newContact.name"
            id="name"
            label="Name"
            width="100%"
            required />

          <text-field
            v-model="newContact.number"
            id="number"
            label="Phone Number"
            width="100%"
            type="tel"
            required />

            <input type="submit" style="height: 0px; width: 0px; border: none; padding: 0px;" hidefocus="true" tabindex="-1" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import TextField from '@/components/TextField';
import Toolbar from '@/components/Toolbar';

export default {
  name: 'EditContact',

  components: { TextField, Toolbar },

  props: {
    contact: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      newContact: {},
      error: ''
    };
  },

  created() {
    this.newContact = { ...this.contact };
  },

  computed: {
    title() {
      return this.$route.name
        .replace('_', ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
  },

  methods: {
    editContact() {
      if (!this.newContact.name || !this.newContact.number) {
        this.error = 'Please enter a name and number.';
        return;
      }

      this.$emit('save', this.newContact);
    }
  }
};
</script>
