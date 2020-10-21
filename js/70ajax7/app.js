/*global google */

window.initMap = function () {
    'use strict';

    function get(id){
        return document.getElementById(id);
    }

    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 },
        zoom: 3,
        mapTypeId: google.maps.MapTypeId.MAP
    });

    const
        markers = localStorage.markers ? JSON.parse(localStorage.markers) : [],
        polygons = localStorage.polygons ? JSON.parse(localStorage.polygons) : [],
        polylines = localStorage.polylines ? JSON.parse(localStorage.polylines) : [],
        rectangles = localStorage.rectangles ? JSON.parse(localStorage.rectangles) : [],
        circles = localStorage.circles ? JSON.parse(localStorage.circles) : [];

    const 
    markers2 = [],
    polygons2 = [],
    polylines2 = [],
    rectangles2 = [],
    circles2 = [];

    const dm = new google.maps.drawing.DrawingManager({ map: map });

    google.maps.event.addListener(dm, 'overlaycomplete', e => {
        switch (e.type) {
            case 'marker':
                handleMarker(e);
                break;

            case 'polygon':
                handlePolygon(e);
                break;

            case 'polyline':
                handlePolyline(e);
                break;

            case 'rectangle':
                handleRectangle(e);
                break;

            case 'circle':
                handleCircle(e);
                break;

            default:
                alert('Unrecognized shape. Stop hacking our system');
                break;
        }
    });

    function handleMarker(e) {
        markers.push({ lat: e.overlay.position.lat(), lng: e.overlay.position.lng() });
        localStorage.markers = JSON.stringify(markers);
    }

    function handlePolygon(e) {
        polygons.push(e.overlay.getPath().getArray());
        localStorage.polygons = JSON.stringify(polygons);
    }

    function handlePolyline(e) {
        polylines.push(e.overlay.getPath().getArray());
        localStorage.polylines = JSON.stringify(polylines);
    }

    function handleRectangle(e) {
        rectangles.push(e.overlay.bounds);
        localStorage.rectangles = JSON.stringify(rectangles);
    }

    function handleCircle(e) {
        circles.push({ center: e.overlay.center, radius: e.overlay.radius });
        localStorage.circles = JSON.stringify(circles);
    }

    //drawing the saved shapes upon reload
    if (localStorage.markers) {
        const m = JSON.parse(localStorage.markers);
        m.forEach(pos => {
            const marker = new google.maps.Marker({
                position: pos,
                map: map
            });
            marker.addListener('dblclick', () => removeShape(marker));
            markers2.push(marker);
            console.log(markers2[0], typeof markers2[0]);
        });
    }

    if (localStorage.polygons) {
        const p = JSON.parse(localStorage.polygons);
        p.forEach(pathSet =>{
            const polygon = new google.maps.Polygon({
                paths: pathSet,
                map: map
            });
            polygon.addListener('dblclick', () => removeShape(polygon));
            polygons2.push(polygon);
        });
    }

    if (localStorage.polylines) {
        const p = JSON.parse(localStorage.polylines);
        p.forEach(pathSet =>{
            const polyline = new google.maps.Polyline({
                path: pathSet,
                map: map
            });
            polyline.addListener('dblclick', () => removeShape(polyline));
            polylines2.push(polyline);
        });
    }

    if(localStorage.rectangles) {
        const r = JSON.parse(localStorage.rectangles);
        r.forEach(coordSet =>{
            const rectangle = new google.maps.Rectangle({
                bounds: coordSet,
                map: map
            });
            rectangle.addListener('dblclick', () => removeShape(rectangle));
            rectangles2.push(rectangle);
        });
    }

    if(localStorage.circles){
        const c = JSON.parse(localStorage.circles);
        c.forEach(circleData =>{
            const circle = new google.maps.Circle({
                radius: circleData.radius,
                center: circleData.center,
                map: map
            });
            circle.addListener('dblclick', () => removeShape(circle));
            circles2.push(circle);
        });
    }

    function removeShape(shape){
        shape.setMap(null);
    }

    get('removeShapes').addEventListener('click', () =>{
        localStorage.clear();
        markers2.forEach(m =>{
            m.setMap(null);
        });

        polygons2.forEach(p =>{
            p.setMap(null);
        });

        polylines2.forEach(p =>{
            p.setMap(null);
        });

        rectangles2.forEach(r =>{
            r.setMap(null);
        });

        circles2.forEach(c =>{
            c.setMap(null);
        });
    });

};