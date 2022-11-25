import React from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function (props) {
    const history = useHistory();

    function onEnter() {
        history.push('/');
    }

    return (
        <nav>
            <Link to="/">
                <img className="header--icon" src="./images/cocktail-icon.png" onClick={props.getSome} />
            </Link>
            <p className="header--text">Sick Cocktail Website</p>
            <Link to="/favourites">
                <img className="random--icon" src="./images/fav-list.png" />
            </Link>
            <Link to="/">
                <img className="random--icon" src="./images/random.png" onClick={props.getRandom} />
            </Link>
            <input
                id="search"
                className="input--search"
                type="text"
                name="search"
                placeholder="Search..."
                autoComplete="off"
                onChange={props.handleChange}
                onFocus={onEnter}
            />
        </nav>
    );
}
