/**
 * @overview a ccm desktop component for single desktop applications
 * @author Dennis Schmidt <dennis.schmidt1@smail.inf.h-brs.de> 2017
 * @license The MIT License (MIT)
 */

( function () {

    var ccm_version = '9.2.0';
    var ccm_url = 'https://akless.github.io/ccm/version/ccm-9.2.0.js';

    var component_name = 'app';
    var component_obj = {

        name: component_name,

        config: {
            html_templates: {
                'default': {
                    tag: 'a',
                    class: 'app',
                    inner: [
                        {
                            tag: 'img',
                            src: '%img%',
                            draggable: false
                        },
                        {
                            tag: 'div',
                            class: 'title',
                            inner: '%title%'
                        }
                    ]
                }
            }
        },

        Instance: function () {

            var self = this;

            this.init = function (callback) {

                var app = {};

                ['title', 'img', 'src', 'config'].forEach(function (arg) {
                    app[arg] = self[arg];
                    delete self[arg]
                });

                if (!app.config)
                    app.config = {};

                console.log(self);

                self.app = app;

                callback();
            };

            this.ready = function (callback) {
                callback();
            };

            this.start = function (callback) {

                var app_elem = self.ccm.helper.html(self.html_templates.default, self.app);

                self.ccm.helper.setContent(self.element, self.ccm.helper.protect(app_elem));


                app_elem = self.element.querySelector('.app');

                app_elem.onclick = function (event) {

                    var app = self.app;

                    app.config.root = document.body;

                    self.ccm.start(app.src, app.config);
                };

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