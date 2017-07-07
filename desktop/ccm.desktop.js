/**
 * Created by Dennis on 13.06.2017.
 */

( function () {

    var ccm_version = '8.1.0';
    var ccm_url = 'https://akless.github.io/ccm/version/ccm-8.1.0.min.js';

    var component_name = 'desktop';
    var component_obj = {

        name: component_name,

        config: {
            style: [
                ['ccm.load', './styles/example/desktop.css']
            ],
            apps: [ "ccm.get", "apps_config.js", "example"],
            html_templates: {
                'main': {
                    tag: 'div',
                    class: 'main',
                    inner: [
                        {
                            tag: 'div',
                            id: 'apps',
                            class: 'apps'
                        }
                    ]
                },
                'app': {
                    tag: 'div',
                    class: 'app',
                    inner: [
                        {
                            tag: 'img',
                            src: '%image%'
                        },
                        {
                            tag: 'div',
                            class: 'name',
                            inner: '%name%'
                        }
                    ]
                },
                'add': {
                    tag: 'div',
                    class: 'app',
                    inner: [
                        {
                            tag: 'div',
                            class: 'icon',
                            inner: {
                                tag: 'img',
                                src: '%img_url%'
                            }
                        }
                    ]
                }
            },
            ccm_add: false
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

                callback();
            };

            this.ready = function (callback) {
                my = self.ccm.helper.privatize(self);

                callback();
            };

            this.start = function (callback) {

                var main_elem = self.ccm.helper.html( my.html_templates.main );

                self.ccm.helper.setContent( self.element, self.ccm.helper.protect( main_elem ) );

                my.apps.forEach(function (app) {
                    var app_elem = self.ccm.helper.html( my.html_templates.app, app);

                    app_elem.onclick = function () {
                        var new_window = window.open("", app.name, "");

                        new_window.document.title = app.name;

                        app.config.element = new_window.document.body;

                        self.ccm.start( app.url, app.config );
                    };

                    main_elem.querySelector('#apps').appendChild(app_elem);
                });

                if(my.ccm_add){
                    var add_elem = self.ccm.helper.html( my.html_templates.add);
                    main_elem.querySelector('#apps').appendChild(add_elem);
                }

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