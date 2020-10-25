(function () {
'use strict';

function get(id) {
    return document.getElementById(id);
}

let curImg;
let dragging = false;
let offset;
let zCount = localStorage.zIndex ? JSON.parse(localStorage.zIndex) : 1;
let movedImages = localStorage.movedImages ? JSON.parse(localStorage.movedImages) : [];
let coordinates;

//reload from local storage
const savedImages = localStorage.movedImages ? JSON.parse(localStorage.movedImages) : null;
console.log(savedImages);
if (savedImages) {
    savedImages.forEach(img => {
        get(img.name).style.position = 'absolute';
        get(img.name).style.top = img.position.top + 'px';
        get(img.name).style.left = img.position.left + 'px';
        get(img.name).style.zIndex = img.position.zIndex;
    });
}

//drag controls
document.addEventListener('mousedown', (e) => {
    curImg = get(e.target.id);
    console.log(e);
    // console.log(curImg);
    if (e.target.className === 'singlePart') { //only proceed if he clicked on something in the 'parts' div. may need to change this if we later don't keep them all in one div
    // curImg = get(e.path[2].id);
    console.log(e.target.className === 'singlePart');
    // if (e.path[2].id === 'parts') {
        dragging = true;
        console.log(curImg);
        offset = { x: e.offsetX, y: e.offsetY };
        curImg.style.zIndex = zCount++;
        curImg.style.position = 'absolute';
        dragElem(curImg);
    }
});

function dragElem() {
    document.addEventListener('mousemove', (e) => {
        if (dragging) {
            e.preventDefault();
            
            coordinates = { left: e.pageX - offset.x, top: e.pageY - offset.y };
            curImg.style.left = coordinates.left + 'px';
            curImg.style.top = coordinates.top + 'px';
            
        }
    });
    document.addEventListener('mouseup', (e) => {
        dragging = false;
        //only proceed if we have new data
        if (coordinates) {
            const newImgData = {
                name: e.target.id,
                position: {
                    left: coordinates.left,
                    top: coordinates.top,
                    zIndex: zCount
                }
            };
            //ensure that we don't have duplicates
            const index = movedImages.findIndex(img => img.name === e.target.id);
            if (index === -1) {
                movedImages.push(newImgData);
            } else {
                movedImages[index] = (newImgData);
            }
        }
        localStorage.movedImages = JSON.stringify(movedImages);
        localStorage.zIndex = zCount;
        curImg = null;
    }, { once: true });
}

}());