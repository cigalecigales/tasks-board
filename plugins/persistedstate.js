import createPersistedState from 'vuex-persistedstate'

export default ({ store, isHMR }) => {
  // createPersistedState({
  //   key: 'data',
  //   // paths: 'bounds'
  //   storage: {
  //     getItem: key => localStorage.getItem(key)
  //   }
  // })(store)
  if (isHMR) return

  if (process.client) {
    window.onNuxtReady((nuxt) => {
      createPersistedState({
        key: 'data',
        getState: key => localStorage.getItem(key)
      })(store)
    })
  }
}
