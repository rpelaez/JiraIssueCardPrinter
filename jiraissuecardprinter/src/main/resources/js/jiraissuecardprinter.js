// ==UserScript==
// @name         JiraPrintCards
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://jira-test.odigeo.com/*
// @grant        none
// ==/UserScript==

(function jiraIssuePrint($) {



    function PrintCards() {
        var pathname = window.location.pathname;
        if ((pathname == "/secure/RapidBoard.jspa" )|| (pathname == "/jira/secure/RapidBoard.jspa" ) ) {
            var control = jQuery('<input type="button" id="ghx-print-control" value="Print Selected Cards!" class="aui-button"></input>');

            var donde = jQuery('div#ghx-controls-work');

            var boton = jQuery('input#ghx-print-control');
            if ((donde != null) && (boton.length == 0)) {
                donde.append(control);
                jQuery('input#ghx-print-control').click(function() {
                    var script = document.createElement("script"); 
                    script.src = "https://qoomon.github.io/Jira-Issue-Card-Printer/bookmarklet.js";
                    document.body.appendChild(script); 
                    document.body.removeChild(script);
                });
            }
        }

        if (pathname.startsWith("/browse/")|| pathname.startsWith("/jira/browse/")||pathname.startsWith("/issues/")|| pathname.startsWith("/jira/issues/")  ) {
            var control = jQuery('<input type="button" id="ghx-print-control" value="Print" class="aui-button"></input>');

            var donde = jQuery('.operations');
            var boton = jQuery('input#ghx-print-control');
            if ((donde != null) && (boton.length == 0)) {
                donde.append(control);
                jQuery('input#ghx-print-control').click(function() {
                    var script = document.createElement("script"); 
                    script.src = "https://qoomon.github.io/Jira-Issue-Card-Printer/bookmarklet.js";
                    document.body.appendChild(script); 
                    document.body.removeChild(script);
                });
            }
            
            donde = jQuery('.ops-cont');
            boton = jQuery('input#ghx-print-control');
            if ((donde != null) && (boton.length == 0)) {
                donde.append(control);
                jQuery('input#ghx-print-control').click(function() {
                    var script = document.createElement("script"); 
                    script.src = "https://qoomon.github.io/Jira-Issue-Card-Printer/bookmarklet.js";
                    document.body.appendChild(script); 
                    document.body.removeChild(script);
                });
            }
            
           
        }

    }



    $(function () {             



        
        setTimeout(function() { PrintCards(); }, 60);

        var handlerActive = false;
        $(document).on("DOMNodeInserted", "#ghx-pool", function (event) {
            var $this = $(event.target);
            if ($this.closest('#ghx-column-header-group').length > 0 && !handlerActive) {
                PrintCards();
            }
        });


        var headerHandlerActive = false;
        $(document).on("DOMNodeInserted", ".global-msg", function (event) {
            if (!headerHandlerActive) {
                headerHandlerActive = true;
                PrintCards();
                headerHandlerActive = false;
            }
        });

        var cardsHandlerActive = false;
        if ($.browser.mozilla) {
            $(document).on("click", ".ghx-issue", function(event) {
                if (!cardsHandlerActive) {
                    cardsHandlerActive = true;
                    PrintCards();
                    cardsHandlerActive = false;                    
                }
            });
        }

        $(document).on("mouseup", ".ghx-issue", function(event) {
            if (!cardsHandlerActive) {
                cardsHandlerActive = true;
                PrintCards();
                cardsHandlerActive = false;                    
            }
        });


    });

}(jQuery));