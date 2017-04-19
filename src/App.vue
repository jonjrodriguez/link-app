<template>
  <div class="mdc-typography">
    <transition :name="transitionName">
      <Layout v-if="loading" :loading="loading" />
      <router-view v-else />
    </transition>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import Layout from '@/components/Layout';

export default {
  name: 'App',

  components: { Layout },

  data() {
    return {
      transitionName: '',
      loading: true
    };
  },

  watch: {
    $route(to, from) {
      const toDepth = to.path.split('/').filter(String).length;
      const fromDepth = from.path.split('/').filter(String).length;
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    }
  },

  beforeCreate() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.$router.push('/login');
      }

      if (user && this.$route.path === '/login') {
        this.$router.push(this.$route.query.redirect || '/');
      }

      this.loading = false;
    });
  }
};
</script>

<style lang="scss">
  @import "./styles/variables";

  @import "@material/layout-grid/mdc-layout-grid";
  @import "@material/theme/mdc-theme";
  @import "@material/typography/mdc-typography";
  @import "@material/list/mdc-list";
  @import "@material/button/mdc-button";
  @import "@material/elevation/mdc-elevation";
  @import "@material/ripple/mdc-ripple";

  @import "./styles/base";
  @import "./styles/transitions";
</style>
