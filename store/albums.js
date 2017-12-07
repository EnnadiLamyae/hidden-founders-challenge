export const state = () => ({
    albums : []
  })
  
  export const mutations = {
    add (state, album) {
      state.albums.push(album)
    }
  }
  