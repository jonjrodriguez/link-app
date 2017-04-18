<template>
  <Layout>
    <router-view
      :locations="locations"
      :location="location" />
  </Layout>
</template>

<script>
import Layout from '@/components/Layout';

export default {
  name: 'Locations',

  components: { Layout },

  data() {
    return {
      locations: [],
      location: {}
    };
  },

  methods: {
    addNew() {
      // console.log('add new person');
    }
  }
};
</script>
