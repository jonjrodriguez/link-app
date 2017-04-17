<template>
  <div>
    <feature-bar title="Locations" />

    <fab
      icon="add_location"
      @onClick="addNew"
    />
  </div>
</template>

<script>
import FeatureBar from './FeatureBar';
import Fab from './Fab';

export default {
  name: 'Locations',

  components: { FeatureBar, Fab },

  methods: {
    addNew() {
      // console.log('add new person');
    }
  }
};
</script>
