/**
 * @overview a ccm desktop component for viewing course data
 * @author Dennis Schmidt <dennis.schmidt1@smail.inf.h-brs.de> 2017
 * @license The MIT License (MIT)
 */

( function () {

    var component = {

        name: 'course',

        ccm: 'https://akless.github.io/ccm/version/ccm-11.2.1.js',

        config: {
            loader: ['ccm.component', '//kaul.inf.h-brs.de/data/ccm/loader/ccm.loader.js'],
            html_templates: {
                'default': {
                    tag: 'div',
                    class: 'course',
                    inner: [
                        {
                            tag: 'ul'
                        },
                        {
                            tag: 'div',
                            class: 'display'
                        }
                    ]
                },
                'display': {
                    tag: 'div',
                    class: 'display'
                },
                'element': {
                    tag: 'li',
                    inner: [
                        {
                            tag: 'a',
                            href: '#',
                            inner: '%title%',
                            onclick: ''
                        }
                    ]
                }
            },
            courses: [ "ccm.get", "courses_config.js", "example"]
        },

        Instance: function () {

            var self = this;

            this.start = function (callback) {

                var app = self.ccm.helper.html(self.html_templates.default, self.settings);
                var elements = app.getElementsByTagName('ul')[0];

                self.courses.forEach((e) => {

                    var element_config = {};
                    element_config.title = e.title;

                    var element = self.ccm.helper.html(self.html_templates.element, element_config);

                    element.onclick = function (){
                        setDisplay(app, e.loader_nr);
                    };

                    elements.appendChild(element);
                });

                setDisplay(app, self.courses[0].loader_nr);

                self.ccm.helper.setContent(self.element, self.ccm.helper.protect(app));

                if (callback) callback();
            };

            function setDisplay(app, nr) {

                var display = app.getElementsByClassName('display')[0];

                self.loader.start({
                    root: display,
                    nr: nr
                });

            }

        }
    };

    function p(){window.ccm[v].component(component)}var f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{var n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{var e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
}() );