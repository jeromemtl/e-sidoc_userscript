// ==UserScript==
// @name         e-sidoc - emplacement, cote et disponnibilité
// @namespace    http://www.twitter.com/jeromemtl
// @version      0.2
// @description  Affiche l'emplacement, la cote et la disponnibilité des exemplaires dans le premier niveau de résultat de recherche
// @author       JeromeMTL
// @match        https://*.esidoc.fr/
// @match        https://*.esidoc.fr/recherche/*
// @match        https://*.esidoc.fr/decouvrir/*
// @match        https://*.esidoc.fr/voirplus/*
// @exclude      https://administration.esidoc.fr/*
// @exclude      https://authentification.esidoc.fr/*
// @grant    GM_addStyle
// @run-at       document-idle
// @icon         https://frontend.esidoc.fr/img/favicon-32x32.png
// @require      http://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @require      https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

GM_addStyle ( `
/* Localiser le document, bouton orange */
.search-results .content-buttons .disponibilite .btn-warning.document-nodispo div, #pop-content article.notice .content-buttons .disponibilite .btn-warning.document-nodispo div {
    position: relative;
    width: calc(100% + 20px);
    text-align: center;
    background-color: #fff;
    color: #4cae4c;
    left: -10px;
    border-radius: 0 0 2px 2px;
    max-height: 20px;
    font-size: .9em;
    margin: 0 !important;
    bottom: -5px;
}
/* Alignement btn Réserver le document */
article.notice .disponibilite .widget-reservations-search {
    margin: 0 10px;
}
article.notice .disponibilite {
    align-items: normal;
}
` );

(function() {
    'use strict';

    waitForKeyElements(".table-guide", addEmplacement);

    function addEmplacement(){

        var nbResultatShow=document.getElementById('bloc-style').getElementsByClassName('list')[0].getElementsByClassName('search-result').length-1; //on évite le dernier élément

        //pr chq résultat
        for(var i=0; i <= nbResultatShow; i++){
            //on esquive les ressources sans localisation/sans exemplaire
            if(document.getElementsByClassName('search-result')[i].getElementsByTagName('td')[1]!==undefined){

                //Si il y a qqch ds le btn "localiser le document", on le suppr
                if(document.getElementsByClassName('disponibilite')[i].getElementsByClassName('btn')[0].getElementsByTagName('div')[0]!==undefined){
                    while(document.getElementsByClassName('disponibilite')[i].getElementsByClassName('btn')[0].getElementsByTagName('div').length>0){
                        document.getElementsByClassName('disponibilite')[i].getElementsByClassName('btn')[0].getElementsByTagName('div')[0].remove();
                    }

                }

                var nbExemplaire=document.getElementsByClassName('search-result')[i].getElementsByTagName('tr').length-1;

                //pr chq exemplaire (ls infos sont ttes les 4 celulles)
                for(var j=0; j<(nbExemplaire*4); j+=4){
                    //on recup ls infos des exemplaires
                    var cote=document.getElementsByClassName('search-result')[i].getElementsByTagName('td')[j].innerText;
                    var emplacement=document.getElementsByClassName('search-result')[i].getElementsByTagName('td')[j+1].innerText;
                    var statut=document.getElementsByClassName('search-result')[i].getElementsByTagName('td')[j+2].innerText;

                    //Change la couleur du texte selon le statut
                    var color='';
                    switch (statut) {
                        case 'Document réservé':
                            color='#f1c40f'; //jaune
                            break;
                        case 'Document prêté':
                            color='#d97f00'; //orange
                            break;
                        case 'Indisponible':
                            color='#f00'; //rouge
                            break;
                        default: //Disponnible
                            //on change rien (vert ou blanc)
                    }

                    //et on remplace le contenu
                    document.getElementsByClassName('disponibilite')[i].getElementsByClassName('btn')[0].innerHTML+='<div style="color:'+color+';"><strong>'+emplacement+'</strong> - '+cote+'</div>';

                }
            }
        }
    }
})();