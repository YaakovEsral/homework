(function () {
    /* global $ */
    /* global pcs */
    'use strict';

    // $('#loadBar').hide();

    $('form').submit((e) => {

        e.preventDefault();

        //show function not working for some reason
        $('#loadBar').show();

        setTimeout(() => {

        const url = $('#url').val();
        fetch(url)
            .then((r) => {
                if (!r.ok) {
                    throw 'ERROR';
                }
                return r;
            })
            .then(r => r.text())
            .then(text => $('#infoDisplay').text(text))
            .catch(error => {
                $('#infoDisplay').text(`OOPSIE ${error}`);
            });
        }, 2000);

        $('#loadBar').hide();

    });

}());