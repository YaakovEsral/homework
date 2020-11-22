import $ from 'jquery';
import './css/style.css';

(function () {
    'use strict';

    $('#theButton').on('click',() =>{
        $('#theDiv').css('backgroundColor', 'green');
    });
}());