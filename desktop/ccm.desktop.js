/**
 * @overview a ccm component for desktop applications
 * @author Dennis Schmidt <dennis.schmidt1@smail.inf.h-brs.de> 2017
 * @license The MIT License (MIT)
 */

( function () {

    var ccm_version = '8.1.0';
    var ccm_url = 'https://akless.github.io/ccm/version/ccm-8.1.0.min.js';

    var component_name = 'desktop';
    var component_obj = {

        name: component_name,

        config: {
            debugging: false,
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
                    tag: 'a',
                    class: 'app',
                    draggable: true,
                    href: "javascript:(" + function () {
                        var x = document.createElement('script');
                        x.setAttribute('src', '%url%');
                        document.head.appendChild(x);
                        x = document.createElement('link');
                        x.rel = 'stylesheet';
                        x.href = 'https://akless.github.io/ccm-components/libs/weblysleekui/font.css';
                        document.head.appendChild(x);
                        x = document.createElement('ccm-%index%');
                        x.key = '%config%';
                        document.body.insertBefore(x, document.body.firstChild);
                    } + ")();",
                    inner: [
                        {
                            tag: 'img',
                            src: '%image%',
                            draggable: false
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
                },
                'dialog': {
                    tag: 'div',
                    class: 'dialog',
                    inner: [
                        {
                            tag: 'div',
                            class: 'head',
                            draggable: true,
                            inner: [
                                '%name%', {
                                    tag: 'div',
                                    class: 'close',
                                    inner: '&#10060;'
                                }
                            ]
                        },
                        {
                            tag: 'div',
                            class: 'main'
                        }
                    ]
                }
            }
        },

        Instance: function () {

            var self = this;
            var my;

            this.init = function (callback) {

                var apps = [];

                self.ccm.helper.makeIterable(self.node.children).map(function (tag) {
                    var app = self.ccm.helper.generateConfig(tag);
                    delete app.node; // node is not necessary
                    apps.push(app);
                });

                if (apps.length > 0)
                    self.apps = apps;

                self.apps.map(function (app) {
                    app.index = self.ccm.helper.getIndex(app.url);
                });

                callback();
            };

            this.ready = function (callback) {
                my = self.ccm.helper.privatize(self);

                callback();
            };

            this.start = function (callback) {

                var cursor = getCursor();

                cursor.debug(my.debugging);

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

                    var appPageDif;
                    
                    app_elem.ondragstart = function (event) {

                        appPageDif = getPageDif(app_elem, event);
                    };

                    app_elem.ondragend = function (event) {

                        event.preventDefault();

                        if (event.screenX < 0 || event.screenY < 0)
                            return;

                        function createDialog() {
                            var dialog_elem = self.ccm.helper.html(my.html_templates.dialog, app);
                            app.config.element = dialog_elem.querySelector('.main');

                            function addDialogHeaderMovement() {
                                var dialog_head_elem = dialog_elem.querySelector('.head');

                                var dialogPageDif;

                                dialog_head_elem.ondragstart = function (event) {

                                    dialogPageDif = getPageDif(dialog_elem, event);

                                };

                                dialog_head_elem.ondrag = function (event) {

                                    event.preventDefault();

                                    if (event.screenX !== 0 && event.screenY !== 0) {
                                        dialog_elem.style.top = (event.pageY + dialogPageDif.y - 6) + 'px'; // 6 = padding + border
                                        dialog_elem.style.left = (event.pageX + dialogPageDif.x - 6) + 'px';
                                    }

                                };

                                dialog_head_elem.querySelector('.close').onclick = function () {

                                    dialog_elem.remove();
                                };

                            }

                            addDialogHeaderMovement();

                            app_elem.parentElement.appendChild(dialog_elem);
                            self.ccm.start(app.url, app.config);

                            dialog_elem.style.top = (cursor.y() + appPageDif.y) + 'px';
                            dialog_elem.style.left = (cursor.x() + appPageDif.x) + 'px';

                        }

                        createDialog();
                    };

                    main_elem.querySelector('#apps').appendChild(app_elem);
                });

                if(my.ccm_add){
                    var add_elem = self.ccm.helper.html( my.html_templates.add);
                    main_elem.querySelector('#apps').appendChild(add_elem);
                }

                callback();
            };

            function getPageDif(element, event) {
                var rect = element.getBoundingClientRect();

                var result_x = rect.left - event.pageX;
                var result_y = rect.top - event.pageY;

                return {
                    x: result_x,
                    y: result_y
                };
            }

            function getCursor() {

                var posX;
                var posY;

                var debug = false;

                document.body.onmousemove = function (event) {
                    posX = event.pageX;
                    posY = event.pageY;
                    if (debug) {
                        console.log("Cursor: X: " + posX + ". Y: " + posY);
                    }
                };

                return {
                    x: function () {
                        return posX;
                    },
                    y: function () {
                        return posY;
                    },
                    debug: function (state) {
                        debug = state;
                    }
                };


            }
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