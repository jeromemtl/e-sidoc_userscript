
// ==UserScript==
// @name         Administrer votre portail e-sidoc v2
// @namespace    https://twitter.com/jeromemtl
// @version      0.4
// @description  Rajoute un élément au menu "administrer votre portail" à e-sidoc v2
// @author       JeromeMTL
// @icon         http://frontend2.esidoc.fr/img/favicon-96x96.png?ver=5ffeb32
// @include      https://*.esidoc.fr/*
// @exclude      https://administration.esidoc.fr/*
// @exclude      https://authentification.esidoc.fr/*
// @run-at document-idle
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function addBtn() {
        try {
            document.getElementsByClassName('list-group')[0].innerHTML+='<a href="https://authentification.esidoc.fr/cas/login?service='+encodeURI(window.location.href)+'" class="list-group-item logout notTrigger"><i class="fa fa-cogs" aria-hidden="true"></i> Administrer le portail</a>';
        }
        catch(error) {
            setTimeout(addBtn, 1000);
        }
    }

    setTimeout(addBtn, 2000);
})();
