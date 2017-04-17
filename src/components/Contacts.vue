<template>
  <div>
    <feature-bar title="Contacts" />

    <fab
      icon="person_add"
      @onClick="addNew"
    />
  </div>
</template>

<script>
import FeatureBar from './FeatureBar';
import Fab from './Fab';

export default {
  name: 'Contacts',

  components: { FeatureBar, Fab },

  methods: {
    addNew() {
      // console.log('add new person');
    }
  }
};
</script>
