<template>
    <section class="hero is-info is-fullheight">
         <Menu />
        <div class="hero-body" id="albums">
            <div class="container has-text-centered">
                <div class="column is-6 is-offset-3">
                    <h1 class="title">
                        Hidden Founders Challenge
                    </h1>
                    <h2 class="subtitle" v-if="connected == false">
                        You wanna test feel  free and Sign In .
                    </h2>
                     <h2 class="subtitle" v-else>
                        Navigate to your  Profile to see your albums and photos .
                    </h2>
                    <button class="button is-link" @click='signIn' v-if="connected == false">
                        <span class="fa fa-facebook-official "> Sign in with facebook </span>
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>


<script>
import Menu from '~/components/Menu.vue'
import * as firebase from 'firebase'

export default {
  name: 'Home',
  components:{
    Menu
  },
  data () {
    return {
      connected: false,
      user: {
        id: '',
      },
      album: {
        id: '',
        cover: '',
        name: ''
      }
    }
  },
  mounted: function () {
   /**************************************************************
    *    I create a prototype function in ~/plugins/fb-config    *
    *    This will initiate Facebook Sdk                         *
    **************************************************************/
  this.$initFbSDK() 
  this.status()      
  },
  methods: {
    status () {
        let vm = this
        FB.getLoginStatus(function(response) {
            if(vm.connected = response.status === 'connected')
                vm.user.id = response.authResponse.userID
        })
    },
    signIn () {
        let vm = this
        FB.login( function (response) {
            vm.status() 
            if(vm.connected){
                vm.initAlbum(function (item) {
                    firebase.database().ref('user-albums/'+ vm.user.id+'/albums/'+item.id).set({
                        id: item.id,
                        name: item.name,
                        cover: item.cover
                    }) 
                })   
            }      
        },{ scope: 'user_photos' })
    },
    initAlbum (callback) {
        let vm = this
        FB.api(
            '/me/albums',
            'GET',
            { "fields":"cover_photo,name",
              'limit': '100'
             },
            function(response) {
                response.data.forEach(function (datum) {
                    vm.getCover(datum.cover_photo.id , response => {
                        vm.album.id = datum.id
                        vm.album.name = datum.name
                        vm.album.cover = response
                        callback(vm.album)
                    })
                })
        })
    },
    getCover (id , callback) {
        FB.api(
        '/'+id,
        'GET',
        { "fields":"images" },
        function(response) {
            callback(response.images[1].source)
        })
    }
  }
}
</script>

<style  scoped>
.hero .subtitle {
    padding: 3rem 0;
    line-height: 1.5;
}
figure{
    min-width: 420px;
    max-width: 420px;
    min-height: 500px;
    max-height: 500px;
}
</style>