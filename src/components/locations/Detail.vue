<template>
  <Layout
    :loading="loading"
    icon="arrow_back"
    action
    @action="$emit('back')">

    <div class="mdc-layout-grid">
      <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
        <card
          :title="location.place.name"
          :subtitle="location.time | calendar">

          <template slot="actions">
            <card-action :class="['mdc-button--primary', { 'mdc-button--active': filter === true }]" :text="`Going (${attendingCount})`" @action="filter = true" />
            <card-action :class="['mdc-button--primary', { 'mdc-button--active': filter === '' }]" :text="`Pending (${pendingCount})`" @action="filter = ''" />
            <card-action :class="['mdc-button--primary', { 'mdc-button--active': filter === false }]" :text="`Not Going (${notAttendingCount})`" @action="filter = false" />
          </template>
        </card>
      </div>
    </div>

    <div class="mdc-layout-grid icon-grid">
      <div class="mdc-layout-grid__cell mdc-theme--accent-bg icon-grid__item"
        v-for="key in invitees">
        <i class="material-icons mdc-theme--text-primary-on-accent" aria-hidden="true">person</i>
        <p class="mdc-theme--text-primary-on-accent">{{ contacts[key].name }}</p>
      </div>
    </div>

  </Layout>
</template>

<script>
import Card from '@/components/Card';
import CardAction from '@/components/CardAction';
import Layout from '@/components/Layout';

export default {
  name: 'LocationDetail',

  components: { Card, CardAction, Layout },

  props: {
    location: {
      type: Object,
      required: true
    },

    contacts: {
      type: Object,
      required: true
    },

    loading: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      filter: true
    };
  },

  computed: {
    invitees() {
      return Object.entries(this.location.invitees)
        .filter(invitee => invitee[1] === this.filter)
        .map(invitee => invitee[0]);
    },

    pendingCount() {
      return Object.values(this.location.invitees).filter(invitee => invitee === '').length;
    },

    attendingCount() {
      return Object.values(this.location.invitees).filter(invitee => invitee === true).length;
    },

    notAttendingCount() {
      return Object.values(this.location.invitees).filter(invitee => invitee === false).length;
    }
  },

  created() {
    if (!this.location.place) {
      this.$router.push({ name: 'locations' });
    }
  }
};
</script>
