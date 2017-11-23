/**
 * @overview a ccm desktop component for working with d3js
 * @author Dennis Schmidt <dennis.schmidt1@smail.inf.h-brs.de> 2017
 * @license The MIT License (MIT)
 */

{
    var component = {
  
        name: 'd3js',

        ccm: 'https://akless.github.io/ccm/version/ccm-12.7.0.js',
  
        config: {
            d3: [ "ccm.load", "https://d3js.org/d3.v4.min.js" ],
            data: [ "ccm.load", "./data.json"],
            html: {
                main: {
                    inner: {
                        class: "chart",
                        tag: "svg"
                    }
                }
            }
        },
    
        Instance: function () {

        const self = this;

        this.start = callback => {

            print(self.config.data);

            if ( callback ) callback();
        };

        }
  
    };
  
    function p(){window.ccm[v].component(component)}const f="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[f])window.ccm.files[f]=component;else{const n=window.ccm&&window.ccm.components[component.name];n&&n.ccm&&(component.ccm=n.ccm),"string"==typeof component.ccm&&(component.ccm={url:component.ccm});var v=component.ccm.url.split("/").pop().split("-");if(v.length>1?(v=v[1].split("."),v.pop(),"min"===v[v.length-1]&&v.pop(),v=v.join(".")):v="latest",window.ccm&&window.ccm[v])p();else{const e=document.createElement("script");document.head.appendChild(e),component.ccm.integrity&&e.setAttribute("integrity",component.ccm.integrity),component.ccm.crossorigin&&e.setAttribute("crossorigin",component.ccm.crossorigin),e.onload=function(){p(),document.head.removeChild(e)},e.src=component.ccm.url}}
  }