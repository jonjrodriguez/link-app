<template>
  <div>
    <toolbar
      :title="title"
      icon="close"
      @action="$emit('back')">
      <a class="mdc-typography--subheading1" @click="next">NEXT</a>
    </toolbar>

    <div class="mdc-toolbar-fixed-adjust mdc-list mdc-list--two-line mdc-list--avatar-list mdc-list--two-line-icon-list">
      <p v-show="error" class="mdc-typography--body1 invalid">{{ error }}</p>

      <contact
        :contact="{ name: 'Add New Contact' }"
        start-icon="person_add"
        @click="$router.push({ name: 'add_contact' })" />

      <contact v-for="(contact, key) in contacts"
        :contact="contact"
        :key="key"
        @click="$emit('select', key)">
        <checkbox slot="end-detail"
          class="mdc-list-item__end-detail"
          :checked="selectedContacts.includes(key)" />
      </contact>
    </div>
  </div>
</template>

<script>
import Checkbox from '@/components/Checkbox';
import Contact from '@/components/contacts/Contact';
import Toolbar from '@/components/Toolbar';

export default {
  name: 'AddPeople',

  components: { Checkbox, Contact, Toolbar },

  props: {
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
      error: ''
    };
  },

  computed: {
    title() {
      return `Add Contacts (${this.selectedContacts.length})`;
    }
  },

  methods: {
    next() {
      if (this.selectedContacts.length === 0) {
        this.error = 'Please select some contacts.';
        return;
      }

      this.$emit('next');
    }
  }
};
</script>
