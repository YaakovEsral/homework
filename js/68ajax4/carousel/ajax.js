// (function () {
    'use strict';

    let pics = [];
    let currentImage = 0;

    $('document').ready(() => {
        search();
    });

    const input = $('#searchBar');
    $('form').submit((e) => {
        e.preventDefault();
        search();
    });

    function search() {
        $('#mainImage').empty();
        $('#thumbnails').empty();
        pics = [];
        currentImage = 0;
        $.getJSON(`https://api.flickr.com/services/feeds/photos_public.gne?tags=${input.val()}&format=json&jsoncallback=?`)
            .then((data) => {
                console.log(data);
                for (let i = 0; i < data.items.length; i++) {
                    pics.push(data.items[i]);

                    let url = (data.items[i].media && data.items[i].media.m) ? data.items[i].media.m : "";
                    // pics[i].data('url', url);
                    $(`<img src="${url}"></img>`).appendTo($('#thumbnails'))
                        .click(() => {
                            currentImage = i;
                            setMainImage();
                        });
                }
                setMainImage();
            })
            .catch(err => console.log(err));
    }

    function setMainImage(){
        $('.currentImage').removeClass('currentImage');
        $('#mainImage').attr('src', pics[currentImage].media.m);
        $('figcaption').empty().append(`${pics[currentImage].title}`);
        $('#thumbnails img')[currentImage].className = 'currentImage';
        $('#thumbnails img')[currentImage].scrollIntoView({behavior: "smooth", inline: "center"});
    }

    $('#rightArrow').click(() =>{
        if(currentImage === pics.length -1){
            currentImage = 0;
        }
        else{
            currentImage++;
        }
        setMainImage();
    });

    $('#leftArrow').click(() =>{
        if(currentImage === 0){
            currentImage = pics.length - 1;
        }
        else{
            currentImage--;
        }
        setMainImage();
    });

// }());