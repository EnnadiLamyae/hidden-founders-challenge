<template>
   <section class="hero is-info is-fullheight">
        <Menu/>
        <div class="hero-body">
            <div class="container has-text-centered" id="body">
                <div class="columns is-vcentered">
                    <div class="column is-4 cover" v-for="item in albums"
                            :key="item">
                        <span class="is-title">{{item.name}}</span>
                        <img  alt="Cover"  v-bind:src="item.cover" class="column is-12">
                        <button class="button is-primary" @click="getPhotos(item.id)">See all Photos</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal" id="photos" >
            <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">View all photos</p>
                        <button class="delete" aria-label="close" @click="close"></button>
                    </header>
                    <section class="modal-card-body">
                        <div class="columns is-vcentered">
                            <div class="column is-4 cover" v-for="item in photos"
                                    :key="item">
                                <img  alt="Cover"  v-bind:src="item" class="column is-12">
                                <button class="button is-primary " @click="save(item)" :id="item" >
                                    <span>Save</span>
                                </button>
                            </div>
                        </div>
                    </section>
                    <footer class="modal-card-foot">
                    </footer>
                </div>
            </div>
  </section>
</template>

<script>
import Menu from '~/components/Menu.vue'
import * as firebase from 'firebase'
import axios from 'axios'
export default {
    name: 'Profile',
    async asyncData () {
        return {
            connected: false,
            id: '',
            albums: [],
            album: {
                id: '',
                cover: '',
                name: ''
            },
            photos: []
        }
    },
    components:{
        Menu
    },
    beforeMount: function () {
        let vm = this
        this.status()
    },
    mounted: function() {
         this.getAlbums()
    },
    methods: {
        status () {
            let vm = this
            FB.getLoginStatus(function(response) {
                if( vm.connected = response.status === 'connected')
                    vm.id = response.authResponse.userID
            })
        },
        getAlbums () {
            let vm = this 
            let ref = firebase.database().ref("/user-albums/"+vm.id)
            ref.on('value', function(snapshot) {
                let temp = []
                snapshot.forEach(childSnapshot => {
                    let item = childSnapshot.val()
                    item.key = childSnapshot.key
                    temp.push(item)
                });
                let albums =  Object.keys(temp[0].albums).map(function(key) {
                                        return [temp[0].albums[key]]
                                     })
                albums = albums.reduce(function(result, item, index) {
                   if(index >= 0) { 
                       result.push(item);
                   }
                   return result;
                   }, []);
                albums.forEach( album => {
                    vm.album.id = album[0].id
                    vm.album.name = album[0].name
                    vm.album.cover = album[0].cover
                    vm.albums.push(vm.album)
                    vm.album = {}
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
        },
        getPhotos (id) {
            let vm = this
            FB.api('/'+id+'/photos',
            function (response) {
                if (response && response.data && response.data.length){
                    response.data.forEach(function (photo) {
                        vm.getCover(photo.id , response => {
                            vm.photos.push(response)
                        })
                    })
                    $('#photos').addClass('is-active')
                }
                else 
                    console.log('Empty Album')
            })
        },
        close () {
            $('#photos').removeClass('is-active')
            this.photos = []
        },
        save (item) {
            let vm = this
            let storage = firebase.storage()
            let storageRef = storage.ref()
            let imageRef = storageRef.child('images/' + vm.id +'/'+item)
            axios.get(item, { responseType:"blob" })
            .then( response => {
                imageRef.put(response.data).then(function(snapshot) {
                    console.log('saved')
                }) 
            }).catch( error => {
                console.log('Error : not saved ')
            })
        }
    }
}
</script>

<style scoped>
.cover {
    min-height: 367.98 px;
    max-height: 367.98 px;
}
</style>
