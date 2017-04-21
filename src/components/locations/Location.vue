<template>
  <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
    <card
      :title="location.place"
      :subtitle="location.time | fromNow(now)">

      <p>{{ attendingCount }} going ({{ pendingCount }} pending)</p>

      <template slot="actions">
        <card-action class="mdc-button--primary" text="View Attendees" @action="$emit('view')" />
        <a class="material-icons" v-if="respondedCount === 0" aria-hidden="true" @click="$emit('delete')">close</a>
      </template>
    </card>
  </div>
</template>

<script>
import Card from '@/components/Card';
import CardAction from '@/components/CardAction';

export default {
  name: 'Location',

  components: { Card, CardAction },

  props: {
    location: {
      type: Object,
      required: true
    },

    invitees: {
      type: Object,
      required: true
    },

    offset: {
      type: Number,
      default: 0
    }
  },

  computed: {
    now() {
      return new Date().getTime() + this.offset;
    },

    inviteeCount() {
      return Object.keys(this.invitees).length;
    },

    pendingCount() {
      return Object.values(this.invitees).filter(invitee => invitee === '').length;
    },

    attendingCount() {
      return Object.values(this.invitees).filter(invitee => invitee === true).length;
    },

    respondedCount() {
      return Object.values(this.invitees).filter(invitee => invitee !== '').length;
    }
  }
};
</script>
