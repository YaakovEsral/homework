(function (){
    'use strict';

    const input = $('#searchBar');
    $('#submit').click(()=>{
        $('#images').empty();
        $.getJSON(`https://api.flickr.com/services/feeds/photos_public.gne?tags=${input.val()}&format=json&jsoncallback=?`)
        .then((data)=>{
            // console.log(data);
            let pics = [];
            for (let i = 0; i < data.items.length; i++) {
                pics.push(data.items[i].media.m);

                let url = (data.items[i].media && data.items[i].media.m) ? data.items[i].media.m : "";
                // $('#images').append(`<img src="${url}"></img>`);
                $('#images').append(`<img src="${data.items[i].media.m}"></img>`);
            }
        })
        .catch(err => console.log(err));
    });
}());