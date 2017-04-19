<template>
  <div>
    <toolbar
      title="Add Location"
      icon="arrow_back"
      @action="$router.push({ name: 'add_people' })">
      <a class="mdc-typography--subheading1" @click="save">SAVE</a>
    </toolbar>

    <div class="mdc-toolbar-fixed-adjust">
      <p v-show="error" class="mdc-typography--body1 invalid">{{ error }}</p>
      <p class="mdc-typography--body1">{{ selectedContacts.length }} people selected.</p>
    </div>
  </div>
</template>

<script>
import Toolbar from '@/components/Toolbar';

export default {
  name: 'AddLocaation',

  components: { Toolbar },

  props: {
    selectedContacts: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      error: ''
    };
  },

  created() {
    if (this.selectedContacts.length === 0) {
      // this.$router.push({ name: 'locations' });
    }
  },

  methods: {
    save() {
      this.error = 'Add a location.';
    }
  }
};
</script>
