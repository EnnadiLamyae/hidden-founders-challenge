import Vue from 'vue'
Vue.prototype.$initFbSDK = () => {
  FB.init({
    appId: 137508820284090,
    cookie: true,
    xfbml: true,
    version: 'v2.11'
  })
}
