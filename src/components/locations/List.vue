<template>
  <Layout :loading="loading">
    <fab icon="add_location" @click="$emit('add')" />

    <div class="mdc-layout-grid" v-show="locations.length == 0 && !loading">
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

    <div class="mdc-layout-grid">
      <location
        v-for="location in locations"
        :location="location"
        :key="location.key" />
    </div>

  </Layout>
</template>

<script>
import Card from '@/components/Card';
import CardAction from '@/components/CardAction';
import Fab from '@/components/Fab';
import Layout from '@/components/Layout';
import Location from './Location';

export default {
  name: 'LocationList',

  components: { Card, CardAction, Fab, Layout, Location },

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
