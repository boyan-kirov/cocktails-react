import React from 'react';
import Header from './components/Header';
import Favourites from './components/Favourites';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import CocktailList from './components/CocktailList';

function App() {
    const [cocktails, setCocktails] = React.useState([]);
    const [favourites, setFavourites] = React.useState([]);

    const getCocktails = async (str) => {
        console.log('Searching... ', str);
        const res = await fetch(str);
        const data = await res.json();
        const filtered = [];
        if (data.drinks) {
            data.drinks.forEach((e) => {
                const { strDrink, strDrinkThumb, strAlcoholic, strGlass, strInstructions, idDrink } = e;
                filtered.push({
                    key: idDrink,
                    name: strDrink,
                    image: strDrinkThumb,
                    type: strAlcoholic,
                    glass: strGlass,
                    instructions: strInstructions,
                });
            });
        }
        setCocktails(filtered);
    };

    React.useEffect(() => {
        getCocktails('https://www.thecocktaildb.com/api/json/v1/1/search.php?s');
    }, []);

    function handleChange(event) {
        const value = event.target.value;
        getCocktails(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`);
    }

    function markFavourite(id) {
        setFavourites((oldFavourites) => {
            let newFavourites = [];
            if (oldFavourites.find((f) => f.key === id)) {
                newFavourites = oldFavourites.filter((f) => f.key !== id);
                return newFavourites;
            } else {
                const cocktail = cocktails.filter((c) => c.key === id);
                newFavourites = [...oldFavourites, cocktail[0]];
                return newFavourites;
            }
        });
    }

    return (
        <Router>
            <div>
                <Header
                    handleChange={handleChange}
                    getRandom={() => getCocktails('https://www.thecocktaildb.com/api/json/v1/1/random.php')}
                    getSome={() =>
                        getCocktails(
                            `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${
                                document.getElementById('search').value
                            }`
                        )
                    }
                />
                <Switch>
                    <Route exact path="/">
                        <CocktailList cocktails={cocktails} favourites={favourites} markFavourite={markFavourite} />
                    </Route>
                    <Route exact path="/favourites">
                        <CocktailList cocktails={favourites} favourites={favourites} markFavourite={markFavourite} />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
