export const state = () => ({
    album: {
        id: '',
        name: '',
        cover: '',
        photos: []
    }
  })
  
  export const mutations = {
    addId (state, id) {
      state.album.id = id
    },
    addName (state, name) {
        state.album.name = name
    },
    addCover (state, cover) {
        state.album.cover = cover
    },
    addPhoto (state, photo) {
        state.album.photos.push(photo)
    },
    reset (state) {
      state.album = {}
    }
  }
