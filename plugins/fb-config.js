import Vue from 'vue'
Vue.prototype.$initFbSDK = () => {
  FB.init({
    appId: 1536641103081775,
    cookie: true,
    xfbml: true,
    version: 'v2.11'
  })
}
