/*global google */
(function () {
    'use strict';

    function get(id){
        return document.getElementById(id);
    }

    const style = get('style');
    const form = document.getElementById('form');
    const infoWindow = new google.maps.InfoWindow();
    const results = get('results');
    const numResults = get('numResults');
    let input = get('input');
    let dataArray;
    let map;
    let markers = [];

    //Fetch controls

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!input.value.length) {
            console.log('no length');
            return;
        }

        if(style.getAttribute('href') === 'style1.css'){
            console.log('first sheet');
            style.setAttribute('href', 'style2.css');
        } 

        results.innerText = "";
        for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(null);            
        }
        markers = [];
        executeFetch();
    });

    function executeFetch() {
        fetch(`http://api.geonames.org/wikipediaSearch?q=${input.value}&type=json&maxRows=50&username=yaakovez`)
            .then(r => {
                if (!r.ok) {
                    throw new Error(r.status, r.statusText);
                }
                // console.log('no really, actually fetching');
                return r.json();
            })
            .then(r => {
                dataArray = r.geonames;

                const bounds = new google.maps.LatLngBounds();
                numResults.innerText = dataArray.length;
                get('totalResults').classList.remove('hidden');
                dataArray.forEach(item => {
                    //setting up a marker
                    const marker = new google.maps.Marker({
                        position: { lat: item.lat, lng: item.lng },
                        map: map,
                        title: item.title,
                        icon: {
                            url: item.thumbnailImg,
                            scaledSize: new google.maps.Size(45, 45)
                        }
                    });
                    markers.push(marker);
                    bounds.extend(marker.position);
                    const wikiLink = `<a target="_blank" href="http://${item.wikipediaUrl}">More info</a>`;
                    marker.addListener('click', openInfo);

                    function openInfo(){
                        infoWindow.setContent(`${item.summary} <br>${wikiLink}`);
                        infoWindow.open(map, marker);
                    }

                    //adding to results panel
                    const elem = document.createElement('div');
                    elem.classList += 'result';

                    elem.innerHTML += `<p>${item.title}</p>`; 
                    elem.addEventListener('click', () => {
                        map.panTo({lat:item.lat, lng:item.lng});
                        openInfo();
                    });
                    results.appendChild(elem);
                });


                map.fitBounds(bounds);

            })
            .catch(err => {
                console.error(err);
            });
    }

    // Map controls

    function initMap() {

        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 0, lng: 0},
            zoom: 3,
            mapTypeId: google.maps.MapTypeId.MAP
        });

    }

    initMap();
}());