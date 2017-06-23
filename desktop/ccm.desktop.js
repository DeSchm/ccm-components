/**
 * Created by Dennis on 13.06.2017.
 */

( function () {

    var ccm_version = '8.0.0';
    var ccm_url = 'https://akless.github.io/ccm/version/ccm-8.0.0.min.js';

    var component_name = 'desktop';
    var component_obj = {

        name: component_name,

        config: {
            apps: [
                {
                    name: 'ccm-quiz',
                    url: 'https://github.com/akless/ccm-components/blob/master/quiz/ccm.quiz.js', // Beispiei
                    img_url: ''
                }
            ]
            ,
            html_templates: {
                'ccm-desktop-app': {
                    inner: {
                        div: {
                            class: 'ccm-desktop-app',
                            inner: {
                                'img': {
                                    src: '%img_url%'
                                }
                            }
                        }
                    }
                },
                'ccm-desktop-add': {
                    inner: {
                        div: {
                            class: 'ccm-desktop-add',
                            inner: {
                                'img': {
                                    src: '%img_url%'
                                }
                            }
                        }
                    }
                }
            }
        },

        Instance: function () {

            var self = this;
            var my;

            this.init = function (callback) {

                var apps = [];

                self.ccm.helper.makeIterable(self.node.children).map(function (tag) {

                    switch (tag.tagName) {
                        case 'CCM-DESKTOP-APP':
                            var app = self.ccm.helper.generateConfig( tag );
                            delete app.node; // node is not necessary
                            apps.push(app);
                            break;
                        case 'CCM-DESKTOP-ADD':
                            break;
                    }

                });

                if (apps.length > 0)
                    self.apps = apps;
                console.log(self.apps);

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

    var namespace = window.ccm && ccm.components[component_name];
    if (namespace) {
        if (namespace.ccm_version) ccm_version = namespace.ccm_version;
        if (namespace.ccm_url) ccm_url = namespace.ccm_url;
    }
    if (!window.ccm || !ccm[ccm_version]) {
        var tag = document.createElement('script');
        document.head.appendChild(tag);
        tag.onload = register;
        tag.src = ccm_url;
    } else register();
    function register() {
        ccm[ccm_version].component(component_obj);
    }
}() );