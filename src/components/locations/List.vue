<template>
  <div>
    <fab icon="add_location" />

    <div class="mdc-layout-grid" v-show="locations.length == 0">
      <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
        <card
          title="No Locations"
          subtitle="Try adding your location now.">
          <template slot="actions">
            <card-action class="mdc-button--primary" text="Add Location" />
          </template>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card';
import CardAction from '@/components/CardAction';
import Fab from '@/components/Fab';

export default {
  name: 'LocationList',

  components: { Card, CardAction, Fab },

  props: {
    locations: {
      type: Array,
      required: true
    }
  }
};
</script>
