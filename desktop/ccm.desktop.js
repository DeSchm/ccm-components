/**
 * Created by Dennis on 13.06.2017.
 */

( function () {

    var ccm_version = '8.0.0';
    var ccm_url     = 'https://akless.github.io/ccm/version/ccm-8.0.0.min.js';

    var component_name = 'desktop';
    var component_obj  = {

        name: component_name,

        config: {
        },

        Instance: function () {

            import App from 'ccm.desktop.app';

            var self = this;
            var my;

            self.ccm_app = App;
            
            this.init = function (callback) {

                self.ccm.helper.makeIterable( self.node.children ).map( function ( tag ) {

                    switch(tag.tagName){
                        case 'CCM-DESKTOP-APP':
                            var app = self.ccm_app("http://via.placeholder.com/400x400");
                            console.log(app.render());
                            break;
                        case 'CCM-DESKTOP-ADD':
                            console.log('ADD');
                            break;
                    }

                });

                callback();
            };

            this.ready = function (callback) {
                my = self.ccm.helper.privatize(self);

                callback();
            };

            this.start = function (callback) {
                callback();
            };


        }
    };

    var namespace = window.ccm && ccm.components[ component_name ]; if ( namespace ) { if ( namespace.ccm_version ) ccm_version = namespace.ccm_version; if ( namespace.ccm_url ) ccm_url = namespace.ccm_url; }
    if ( !window.ccm || !ccm[ ccm_version ] ) { var tag = document.createElement( 'script' ); document.head.appendChild( tag ); tag.onload = register; tag.src = ccm_url; } else register();
    function register() { ccm[ ccm_version ].component( component_obj ); }
}() );