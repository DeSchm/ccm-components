/**
 * Created by Dennis on 04.06.2017.
 */

( function () {

    var ccm_version = '8.0.0';
    var ccm_url     = 'https://akless.github.io/ccm/version/ccm-8.0.0.min.js';

    var component_name = 'comment';
    var component_obj  = {

        name: component_name,

        config: {
            html_templates: {
                ul: {
                    class: 'ccm-list',
                },
                li: {
                    class: 'ccm-list-element',
                },
                comment: {
                    class: 'ccm-comment',
                },
                profile: {
                    class: 'ccm-profile',
                },
                profile_img: {
                    class: 'ccm-profile-img',
                }
            }
        },

        Instance: function () {

            var self = this;
            var my;
            
            this.ready = function (callback) {
                my = self.ccm.helper.privatize(self);

                callback();
            };

            this.start = function (callback) {
                var ul = document.createElement('ul');
                ul.className = my.html_templates.ul.class;

                for(var key in comments){
                    var comment = comments[key];

                    var li = document.createElement('li');
                    li.className = my.html_templates.li.class;

                    var profile_div = document.createElement('div');
                    profile_div.className = my.html_templates.profile;

                    var profile_img = document.createElement('img');
                    profile_img.className = my.html_templates.profile_img;

                    profile_div.appendChild(profile_img);

                    li.appendChild(profile_div);

                    var comment_div = document.createElement('div');
                    comment_div.className = my.html_templates.comment;
                    comment_div.innerHTML = comment.message;

                    li.appendChild(comment_div);




                    ul.appendChild(li);
                }

                self.element.appendChild(ul);

                callback();
            };


        }
    };

var namespace = window.ccm && ccm.components[ component_name ]; if ( namespace ) { if ( namespace.ccm_version ) ccm_version = namespace.ccm_version; if ( namespace.ccm_url ) ccm_url = namespace.ccm_url; }
if ( !window.ccm || !ccm[ ccm_version ] ) { var tag = document.createElement( 'script' ); document.head.appendChild( tag ); tag.onload = register; tag.src = ccm_url; } else register();
function register() { ccm[ ccm_version ].component( component_obj ); }
}() );