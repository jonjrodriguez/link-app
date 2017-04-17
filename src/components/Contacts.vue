<template>
  <div>
    <feature-bar title="Contacts" />

    <fab
      icon="person_add"
      @onClick="openContactDialog"
    />

    <div class="mdc-layout-grid">
      <contact v-for="(contact, index) in contacts"
        :contact="contact"
        :key="contact.key"
        @update="openContactDialog(index)"
        @delete="confirmDelete(index)" />
    </div>

    <mdc-dialog ref="contactDialog"
      :title="title"
      accept-text="Save"
      cancel-text="Cancel"
      @accept="updateContact"
      @cancel="contact = { name: '', number: '' }">
        <text-field
          v-model="contact.name"
          id="name"
          label="Name"
          width="100%"
          required />

        <text-field
          v-model="contact.number"
          id="number"
          label="Phone Number"
          width="100%"
          required />
    </mdc-dialog>

    <mdc-dialog ref="deleteDialog"
      :title="`Delete ${contact.name}?`"
      accept-text="Delete"
      cancel-text="Cancel"
      @accept="deleteContact" />
  </div>
</template>

<script>
import firebase from 'firebase/app';
import FeatureBar from './FeatureBar';
import Fab from './Fab';
import Contact from './Contact';
import MdcDialog from './Dialog';
import TextField from './TextField';

export default {
  name: 'Contacts',

  components: { FeatureBar, Fab, Contact, MdcDialog, TextField },

  data() {
    return {
      contacts: [],
      contact: { name: '', number: '' },
      user: {},
      db: null,
      title: ''
    };
  },

  created() {
    this.user = firebase.auth().currentUser;
    this.db = firebase.database().ref(`contacts/${this.user.uid}`);

    this.db.on('child_added', data => this.contactAdded(data));
    this.db.on('child_changed', data => this.contactUpdated(data));
    this.db.on('child_removed', data => this.contactDeleted(data));
  },

  beforeDestroy() {
    this.db.off();
  },

  methods: {
    openContactDialog(index) {
      if (index !== undefined) {
        this.title = 'Update Contact';
        this.contact = this.contacts[index];
      } else {
        this.title = 'Add New Contact';
        this.contact = { name: '', number: '' };
      }

      this.$refs.contactDialog.open();
    },

    updateContact() {
      if (!this.contact.key) {
        this.db.push(this.contact);
      } else {
        this.db.child(this.contact.key).update(this.contact);
      }

      this.contact = { name: '', number: '' };
    },

    confirmDelete(index) {
      this.contact = this.contacts[index];
      this.$refs.deleteDialog.open();
    },

    deleteContact() {
      this.db.child(this.contact.key).remove();
      this.contact = {};
    },

    contactAdded(data) {
      const contact = data.val();
      contact.key = data.key;

      this.contacts.push(contact);
    },

    contactUpdated(data) {
      const index = this.contacts.findIndex(contact => contact.key === data.key);
      this.contacts.splice(index, 1, data.val());
    },

    contactDeleted(data) {
      const index = this.contacts.findIndex(contact => contact.key === data.key);
      this.contacts.splice(index, 1);
    }
  }
};
</script>
