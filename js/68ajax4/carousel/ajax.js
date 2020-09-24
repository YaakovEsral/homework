(function () {
    'use strict';
    $('.hidable').hide();

    let pics;
    let currentImage;

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

                    let url = data.items[i].media.m;
                    // let url = (data.items[i].media && data.items[i].media.m) ? data.items[i].media.m : "";
                    // pics[i].data('url', url);
                    $('.hidable').show();
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
        //handling the image and caption
        $('.currentImage').removeClass('currentImage');
        $('#mainImage').attr('src', pics[currentImage].media.m);
        $('figcaption').empty().append(`${pics[currentImage].title}`);
        $('#thumbnails img')[currentImage].className = 'currentImage';
        $('#thumbnails img')[currentImage].scrollIntoView({behavior: "smooth", inline: "center"});

        //handling the info

        $('#info p').hide();

        //code to limit length of tags. performed here for better code readability
        let tags = pics[currentImage].tags.length < 100 ? pics[currentImage].tags : (pics[currentImage].tags.substring(0, 100) + '...');

        $('#infoList').empty();
        $(`<li>Author: ${pics[currentImage].author}</li>`).appendTo($('#infoList'));
        $(`<li>Author ID: ${pics[currentImage].author_id}</li>`).appendTo($('#infoList'));
        $(`<li>Date taken: ${pics[currentImage].date_taken.substring(0, 10)}</li>`).appendTo($('#infoList'));
        // $(`<li>Description: ${pics[currentImage].description}</li>`).appendTo($('#infoList'));
        $(`<li>Link: ${pics[currentImage].link}</li>`).appendTo($('#infoList'));
        $(`<li>Published: ${pics[currentImage].published}</li>`).appendTo($('#infoList'));
        $(`<li>Tags: ${tags}</li>`).appendTo($('#infoList'));
        $(`<li>Title: ${pics[currentImage].title}</li>`).appendTo($('#infoList'));
    }

    $('#rightArrow').click(() =>{
        slideImage(1);
    });

    $('#leftArrow').click(() =>{
       slideImage(-1);
    });

    //currently seems like there's a bug - key listener will not trigger scrollIntoView function,
    //hence the final function call scrollIntoViewIfNeeded
    addEventListener('keydown', (e) =>{
        if(e.key === "ArrowRight"){
            slideImage(1);
            // $('#thumbnails')[0].scrollBy(100, 0);
        } else if (e.key === "ArrowLeft"){
            slideImage(-1);
        }
        $('#thumbnails img')[currentImage].scrollIntoViewIfNeeded();
    });

    //algorithm is designed so that you can pass any number within pics.length as 'incr'
    //and it will scroll accordingly
    function slideImage(incr){
        currentImage+=incr;
        if(currentImage >= pics.length){
            currentImage = -1 + incr;
        } else if(currentImage <= -1){
            currentImage = pics.length + incr;
        }
        setMainImage();
    }

}());