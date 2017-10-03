/**
 * @overview a ccm desktop component for viewing course data
 * @author Dennis Schmidt <dennis.schmidt1@smail.inf.h-brs.de> 2017
 * @license The MIT License (MIT)
 */

( function () {

    var filename = 'ccm.app.js';

    var ccm_version = '9.2.0';
    var ccm_url = 'https://akless.github.io/ccm/version/ccm-9.2.0.js';

    var component_name = 'course';
    var component_obj = {

        name: component_name,

        config: {
            loader: ['ccm.load', '//kaul.inf.h-brs.de/data/ccm/loader/ccm.loader.js'],
            html_templates: {
                'default': {
                    tag: 'div',
                    class: 'course',
                    inner: [
                        {
                            tag: 'ul'
                        },
                        {
                            tag: 'ccm-loader',
                            id: 'display',
                            nr: 1,
                        }
                    ]
                },
                'element': {
                    tag: 'li',
                    inner: [
                        {
                            tag: 'a',
                            href: '#',
                            inner: '%title%'
                        }
                    ]
                }
            },
            courses: [ "ccm.get", "courses_config.js", "example"],
            settings: {
                elements: []
            }
        },

        Instance: function () {

            var self = this;

            this.init = function (callback) {

                callback();
            };

            this.ready = function (callback) {
                callback();
            };

            this.start = function (callback) {

                var app = self.ccm.helper.html(self.html_templates.default, self.settings);
                var elements = app.getElementsByTagName('ul')[0];
                var display = app.getElementsByTagName('ccm-loader')[0];

                self.courses.forEach((e) => {

                    var element_config = {};
                    element_config.title = e.title;

                    var element = self.ccm.helper.html(self.html_templates.element, element_config);

                    element.onclick = function(){
                        display.setAttribute('nr', String(e.loader_nr));
                    };

                    elements.appendChild(element);
                });

                console.log(self.elements);

                self.ccm.helper.setContent(self.element, self.ccm.helper.protect(app));

                callback();
            };

        }
    };

    if ( window.ccm && window.ccm.files ) window.ccm.files[ filename ] = component_obj;
    var namespace = window.ccm && ccm.components[ component_name ]; if ( namespace ) { if ( namespace.ccm_version ) ccm_version = namespace.ccm_version; if ( namespace.ccm_url ) ccm_url = namespace.ccm_url; }
    if ( !window.ccm || !ccm[ ccm_version ] ) { var tag = document.createElement( 'script' ); document.head.appendChild( tag ); tag.onload = register; tag.src = ccm_url; } else register();
    function register() { ccm[ ccm_version ].component( component_obj ); delete window.ccm.files[ filename ]; }
}() );