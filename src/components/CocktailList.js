import React from 'react';
import Cocktail from './Cocktail';

export default function (props) {
    return (
        <section className="cocktail-list">
            {props.cocktails.map((c) => {
                return (
                    <Cocktail
                        key={c.key}
                        name={c.name}
                        image={c.image}
                        type={c.type}
                        glass={c.glass}
                        instructions={c.instructions}
                        isFavourite={props.favourites.find((f) => f.key === c.key)}
                        markFavourite={() => props.markFavourite(c.key)}
                    />
                );
            })}
        </section>
    );
}
