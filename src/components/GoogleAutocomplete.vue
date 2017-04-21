<template>
  <div class="mdc-textfield mdc-textfield--upgraded" style="width: 100%">
    <label class="mdc-textfield__label mdc-textfield__label--float-above mdc-textfield__label--active" :for="id">Where are you going?</label>

    <input
      ref="autocomplete"
      @keydown.enter="checkSuggestionsVisible"
      style="width: 100%"
      class="mdc-textfield__input"
      :id="id"
      :placeholder="placeholder" />
  </div>
</template>

<script>
export default {
  name: 'GoogleAutocomplete',

  props: {
    id: {
      type: String,
      required: true
    },

    label: {
      type: String,
      required: true
    },

    placeholder: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      autocomplete: null,
      pacs: null
    };
  },

  mounted() {
    const options = {
      types: ['establishment'],
      placeIdOnly: false
    };

    /* global google */
    this.autocomplete = new google.maps.places.Autocomplete(this.$refs.autocomplete, options);
    this.autocomplete.addListener('place_changed', this.update);
    this.pacs = document.getElementsByClassName('pac-container');
    this.geolocate();
  },

  methods: {
    update() {
      const { place_id, name, icon, url, formatted_address } = this.autocomplete.getPlace();

      this.$emit('input', { place_id, name, icon, url, formatted_address });
    },

    checkSuggestionsVisible(event) {
      const visible = Array.from(this.pacs).some(pac => pac.offsetParent !== null);

      if (visible) {
        event.preventDefault();
      }
    },

    geolocate() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          const circle = new google.maps.Circle({
            center: geolocation,
            radius: position.coords.accuracy
          });

          this.autocomplete.setBounds(circle.getBounds());
        });
      }
    }
  }
};
</script>

<style lang="scss">
  @import "~@/styles/variables";

  .mdc-textfield__label--active {
    color: $mdc-theme-primary;
  }
</style>
