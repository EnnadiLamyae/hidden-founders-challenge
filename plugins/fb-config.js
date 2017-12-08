import Vue from 'vue'
Vue.prototype.$initFbSDK = () => {
  FB.init({
    //this test app 
    appId: appid,
    cookie: true,
    xfbml: true,
    version: 'v2.11'
  })
}
