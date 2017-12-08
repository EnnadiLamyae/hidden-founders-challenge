module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'challenge',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/svg', href: 'https://hiddenfounders.com/images/logo.svg' },
      { rel: 'stylesheet', href: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'},
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.6.1/css/bulma.min.css'}
    ],
    script: [
      { src: 'https://connect.facebook.net/en_US/all.js' },
      { src: 'https://code.jquery.com/jquery-3.2.1.min.js'}
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  plugins: [
    '~plugins/fb-config',
    '~plugins/firebase-config'
  ],
  css: [
    { src: '~assets/css/style.css', lang: 'css' }
  ],
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true
  }
}
