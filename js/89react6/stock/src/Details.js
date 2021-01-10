import React from 'react'

export default function Details(props) {

    // console.log('last price', props.realtime.last_price);
    let diff = props.realtime.bid_price - props.realtime.last_price;
    diff = Math.round((diff + Number.EPSILON) * 1000) / 1000;
    // console.log('difference', diff);
    let perc = diff/props.realtime.last_price;
    perc = Math.round((perc + Number.EPSILON) * 10000) / 100;

    const differenceStyle = {};
    let arrow = '';

    if(diff > 0){
        differenceStyle.color = 'green';
        arrow = '\u2191';
    } else if (diff < 0) {
        differenceStyle.color = 'red';
        arrow = '\u2193';
    } else {
        differenceStyle.color = 'black';
        arrow = '';
    }

    if(props.error) {
        return (
            <div style={{color: 'red'}}>
            {props.error}
            </div>
            );
    }
    // console.log('props error', props.error);

    return (
       props.info.long_description && props.realtime.last_price ? 
        <div id="details-container">
            <div id="details-row">
                <div id="details-ticker">{props.info.ticker}</div>
                {/* <div id="details-last-price">Last price: ${props.realtime.last_price}</div> */}
                <div id="details-current-price">Current bid price: ${props.realtime.bid_price}</div>

                <div id="details-difference" style={differenceStyle}>${Math.abs(diff)} {arrow}</div>
                <div id="details-percentage" style={differenceStyle}>%{Math.abs(perc)} {arrow}</div>
            </div>
            <div id="details-description">{props.info.long_description}</div>
        </div> : null
    )
}
