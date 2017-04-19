<template>
  <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
    <card
      :title="location.location"
      :subtitle="location.time">
      <template slot="actions" class="border">
        <card-action class="mdc-button--primary" text="View Attendees" @action="test" />
        <i class="material-icons" aria-hidden="true" @click="test">close</i>
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
    }
  },

  methods: {
    test() {
      // eslint-disable-next-line
      console.log('Test');
    }
  }
};
</script>
