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
        v-for="(location, index) in sortedLocations"
        :location="location"
        :invitees="invitees[location.key]"
        :key="location.key"
        :offset="offset"
        @view="$emit('view', index)"
        @delete="confirmDelete(index)" />
    </div>

    <mdc-dialog ref="deleteDialog"
      :title="`Delete ${location.place.name}?`"
      :body="deleteText"
      accept-text="Delete"
      @accept="deleteLocation" />

  </Layout>
</template>

<script>
import Card from '@/components/Card';
import CardAction from '@/components/CardAction';
import Fab from '@/components/Fab';
import Layout from '@/components/Layout';
import MdcDialog from '@/components/Dialog';
import Location from './Location';

export default {
  name: 'LocationList',

  components: { Card, CardAction, Fab, Layout, Location, MdcDialog },

  props: {
    locations: {
      type: Array,
      required: true
    },

    invitees: {
      type: Object,
      required: true
    },

    loading: {
      type: Boolean,
      default: false
    },

    offset: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      location: { place: {}, invitees: [] }
    };
  },

  computed: {
    sortedLocations() {
      return this.locations.sort((a, b) => b.time - a.time);
    },

    respondedCount() {
      return Object.values(this.location.invitees).filter(invitee => invitee.response !== '').length;
    },

    deleteText() {
      return 'You can still delete this while no one has responded.';
    }
  },

  methods: {
    confirmDelete(index) {
      this.location = this.locations[index];
      this.location.invitees = this.invitees[this.location.key];

      this.$refs.deleteDialog.open();
    },

    deleteLocation() {
      if (this.respondedCount > 0) {
        return;
      }

      this.$emit('delete', this.location.key);
      this.location = { place: {}, invitees: [] };
    }
  }
};
</script>
