import $ from 'jquery';
import placeUsers from './app';

export default function setMenuOptions() {
    $('#blogs-nav-option').on('click', placeUsers);
}