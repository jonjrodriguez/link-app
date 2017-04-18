<template>
  <transition :name="transitionName">
    <router-view class="view"
      :contacts="contacts"
      :contact="contact"
      @view="viewContact"
      @save="saveContact"
      @delete="deleteContact" />
  </transition>
</template>

<script>
import firebase from 'firebase/app';

export default {
  name: 'Contacts',

  data() {
    return {
      db: null,
      contacts: [],
      contact: { name: '', number: '' },
      transitionName: ''
    };
  },

  created() {
    const user = firebase.auth().currentUser;
    this.db = firebase.database().ref(`contacts/${user.uid}`);

    this.db.on('child_added', data => this.contactAdded(data));
    this.db.on('child_changed', data => this.contactUpdated(data));
    this.db.on('child_removed', data => this.contactDeleted(data));
  },

  beforeDestroy() {
    this.db.off();
  },

  beforeRouteUpdate(to, from, next) {
    const toDepth = to.path.split('/').filter(String).length;
    const fromDepth = from.path.split('/').filter(String).length;
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    next();
  },

  methods: {
    viewContact(index) {
      if (index !== undefined) {
        this.contact = { ...this.contacts[index] };
        this.$router.push({ name: 'edit_contact' });
      } else {
        this.contact = { name: '', number: '' };
        this.$router.push({ name: 'add_contact' });
      }
    },

    saveContact(contact) {
      const { key, ...newContact } = contact;

      this.db.child(key || this.db.push().key)
        .update(newContact);

      this.contact = { name: '', number: '' };
      this.$router.push({ name: 'contacts' });
    },

    deleteContact(key) {
      this.db.child(key).remove();
    },

    contactAdded(data) {
      const contact = data.val();
      contact.key = data.key;

      this.contacts.push(contact);
    },

    contactUpdated(data) {
      const index = this.contacts.findIndex(contact => contact.key === data.key);
      this.contacts.splice(index, 1, { ...this.contacts[index], ...data.val() });
    },

    contactDeleted(data) {
      const index = this.contacts.findIndex(contact => contact.key === data.key);
      this.contacts.splice(index, 1);
    }
  }
};
</script>
