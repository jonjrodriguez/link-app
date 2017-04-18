<template>
  <Layout>
    <fab icon="person_add" @click="viewContact" />

    <div class="mdc-layout-grid" v-show="contacts.length == 0">
      <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
        <card
          title="No Contacts"
          subtitle="Try adding a new contact now.">
          <template slot="actions">
            <card-action class="mdc-button--primary" text="Add Contact" @action="viewContact" />
          </template>
        </card>
      </div>
    </div>

    <div class="mdc-list mdc-list--two-line mdc-list--avatar-list mdc-list--two-line-icon-list">
      <contact v-for="(contact, index) in contacts"
        :contact="contact"
        :key="contact.key"
        @view="viewContact(index)"
        @delete="confirmDelete(index)" />
    </div>

    <mdc-dialog ref="deleteDialog"
      :title="`Delete ${contact.name}?`"
      accept-text="Delete"
      @accept="deleteContact" />

  </Layout>
</template>

<script>
import Card from '@/components/Card';
import CardAction from '@/components/CardAction';
import Fab from '@/components/Fab';
import MdcDialog from '@/components/Dialog';
import Layout from '@/components/Layout';
import Contact from './Contact';

export default {
  name: 'ContactList',

  components: { Card, CardAction, Contact, Fab, Layout, MdcDialog },

  props: {
    contacts: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      contact: {}
    };
  },

  methods: {
    viewContact(index) {
      this.$emit('view', index);
    },

    confirmDelete(index) {
      this.contact = this.contacts[index];
      this.$refs.deleteDialog.open();
    },

    deleteContact() {
      this.$emit('delete', this.contact.key);
      this.contact = {};
    }
  }
};
</script>
