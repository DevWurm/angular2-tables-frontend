require('!include-loader?script!../bower_components/webcomponentsjs/webcomponents-lite.min');
window.addEventListener('WebComponentsReady', function () {
  require('./bootstrap');
});
