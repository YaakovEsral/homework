(function () {
    'use strict';

    const selection = $('#selection');
    const video = $('video');
    const defaultImgUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcScvW2qZm8wKtVr6z74r6OXdWJXFy2a8jnSeQ&usqp=CAU';

    fetch('videos.json')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);

            }
            return response.json();
        })
        .then((r) => {
            r.forEach(element => {
                //with plain javascript
                
                // const figure = document.createElement('figure');
                // selection.append(figure);

                // const image = document.createElement('img');
                // image.setAttribute('src', element.picUrl || defaultImgUrl);
                // figure.append(image);

                // const caption = document.createElement('figcaption');
                // caption.innerText = element.title;
                // figure.append(caption);

                // figure.addEventListener('click', () =>{
                //     video.attr('src', element.url);
                // });

                // figure.style.cursor = 'pointer';

                //with jquery
                
                $(`<figure><img src="${element.picUrl || defaultImgUrl}">
                <figcaption>${element.title}</figcaption></figure>`)
                .appendTo(selection)
                .click(() =>{
                    video.attr('src', element.url);
                    // video.play(); //not working
                });
            });     
        })
        .catch(error => console.log(error));
}());