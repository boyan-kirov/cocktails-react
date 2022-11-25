import React from 'react';

export default function (props) {
    return (
        <div className="cocktail">
            <div className="holder">
                <p className="cocktail--title">{props.name}</p>
                <img
                    className="cocktail--star"
                    src={props.isFavourite ? './images/star-filled.png' : './images/star-empty.png'}
                    onClick={props.markFavourite}
                />
            </div>
            <img className="cocktail--image" src={props.image} />
            <p className="cocktail--type">
                {props.type} / {props.glass}
            </p>
            <p className="cocktail--instructions">{props.instructions}</p>
        </div>
    );
}
