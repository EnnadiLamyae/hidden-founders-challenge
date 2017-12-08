<template>
    <div class="hero-head">
        <nav class="navbar">
            <div class="container">
                <div class="navbar-brand">
                    <a class="navbar-item" href="../">
                        <img src="https://hiddenfounders.com/images/logo.svg" alt="Logo">
                    </a>
                    <span class="navbar-burger burger" data-target="navbarMenu">
                      <span></span>
                      <span></span>
                      <span></span>
                    </span>
                </div>
                <div id="navbarMenu" class="navbar-menu">
                    <div class="navbar-end">
                        <span class="navbar-item is-active">
                            <nuxt-link to="/" id>Home</nuxt-link>
                        </span>
                        <a class="navbar-item" v-if="connected" @click="signOut"> 
                            Sign out
                        </a>
                        <span class="navbar-item">
                            <nuxt-link to="/profile" v-if="connected">Profile</nuxt-link>
                        </span>
                        <span class="navbar-item">
                            <a class="button is-white is-outlined is-small" href=https://github.com/EnnadiLamyae/hidden-founders-challenge">
                                <span class="icon">
                                    <i class="fa fa-github"></i>
                                </span>
                                <span>View Source</span>
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>
<script>
import axios from 'axios'
// import store from '@/store'
// import { mapGetters } from 'vuex'

export default {
//   computed: mapGetters([
//     'connected'
//   ]),
  data () {
      return {
          connected : false
      }
  },
  mounted: function () {
      this.$initFbSDK() 
      this.status()
  },
  methods: {
      status () {
          let vm = this
          FB.getLoginStatus(function(response) {
              vm.connected = response.status === 'connected'
          })
        //   store.dispatch('setConnected', vm.connected)
          setTimeout(this.status, 5000);
      },
      signOut () {
          let vm = this
          FB.logout(function(response) {
               vm.connected = false
               axios.get('/').then(function (response) {
                     window.location.href = location.origin + '/'
               })
          })
      }
  }
}
</script>

<style>

</style>
