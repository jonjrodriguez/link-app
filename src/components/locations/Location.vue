<template>
  <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
    <card
      :title="location.place"
      :subtitle="location.time | timeFrom(now)">
      <template slot="actions" class="border">
        <card-action class="mdc-button--primary" text="View Attendees" />
        <a class="material-icons" aria-hidden="true" @click="$emit('delete')">close</a>
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

    offset: {
      type: Number,
      default: 0
    }
  },

  computed: {
    now() {
      return new Date().getTime() + this.offset;
    }
  }
};
</script>
