<template lang="pug">
  div.plane
    App
</template>

<script>
import App from '~/pages/App.vue'
import * as Type from "~/store/mutation-types"

export default {
  data() {
    return {
      updateAlertTypeIntervalId: null,
    }
  },

  mounted() {
    this.$data.updateAlertTypeIntervalId = setInterval(() => {
      console.log('call interval update alert type ...');
      
      this.$store.commit(Type.UPDATE_ALERT_TYPE)
    }, 900000)
  },

  created() {
    let data = this.getStorageData('data')
    this.$store.commit(Type.INIT_DATA, data)
  },

  beforeDestroy() {
    clearInterval(this.$data.updateAlertTypeIntervalId)
  },

  methods: {
    getStorageData(key) {
      if (process.browser) {
        const data = localStorage.getItem(key)
        return JSON.parse(data)
      }
    }
  },
  components: {
    App
  }
}
</script>

<style lang="scss" scoped>

</style>

