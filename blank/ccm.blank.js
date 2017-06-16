/**
 * Created by Dennis on 02.06.2017.
 */

( function () {

    var ccm_version = '8.0.0';
    var ccm_url     = 'https://akless.github.io/ccm/version/ccm-8.0.0.min.js';

    var component_name = 'blank';
    var component_obj  = {

        name: component_name,

        config: {
        },

        Instance: function () {

            var self = this;
            var my;

            this.init = function (callback) {
                callback();
            };

            this.ready = function (callback) {
                my = self.ccm.helper.privatize(self);

                callback();
            };

            this.start = function (callback) {

                self.element.innerHTML = "Hello World!";

                callback();
            };


        }
    };

    var namespace = window.ccm && ccm.components[ component_name ]; if ( namespace ) { if ( namespace.ccm_version ) ccm_version = namespace.ccm_version; if ( namespace.ccm_url ) ccm_url = namespace.ccm_url; }
    if ( !window.ccm || !ccm[ ccm_version ] ) { var tag = document.createElement( 'script' ); document.head.appendChild( tag ); tag.onload = register; tag.src = ccm_url; } else register();
    function register() { ccm[ ccm_version ].component( component_obj ); }
}() );