<template>
  <Layout :loading="loading">
    <fab icon="add_location" @click="$emit('add')" />

    <div class="mdc-layout-grid" v-show="locations.length == 0">
      <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
        <card
          title="No Locations"
          subtitle="Try adding your location now.">
          <template slot="actions">
            <card-action class="mdc-button--primary" text="Add Location" @action="$emit('add')" />
          </template>
        </card>
      </div>
    </div>

  </Layout>
</template>

<script>
import Card from '@/components/Card';
import CardAction from '@/components/CardAction';
import Fab from '@/components/Fab';
import Layout from '@/components/Layout';

export default {
  name: 'LocationList',

  components: { Card, CardAction, Fab, Layout },

  props: {
    locations: {
      type: Array,
      required: true
    },

    loading: {
      type: Boolean,
      default: false
    }
  }
};
</script>
