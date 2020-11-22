// (function (){
    'use strict';

    /*global $ */
   

    
    const form = $('#form');
    const nameInput = $('#name');
    const addressInput = $('#address');

    const nameOutput = $('#infoName');
    const addressOutput = $('#infoAddress');

    const infoDiv = $('#info');
    infoDiv.hide();

    //on used for accessing any DOM event, even if there isn't a jQuery shortcut
    // $('#form').on('submit', function(e){
    $("#form").submit(function (e) {
        e.preventDefault();

        if ($('#checkbox').is(':checked')) {
            
            $("#form").trigger('reset');

            nameOutput.append((nameInput).val());
            addressOutput.append((addressInput).val());

            infoDiv.fadeToggle(1000);
        }
    });

// }());