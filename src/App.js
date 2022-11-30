import React from 'react';
import Header from './components/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CocktailList from './components/CocktailList';

function App() {
    const [cocktails, setCocktails] = React.useState([]);
    const [favourites, setFavourites] = React.useState([]);

    async function getFavourites(storedFavourites) {
        console.log('Stored favorites: ', storedFavourites);
        const updatedFavourites = [];
        if (storedFavourites)
            for (const f of storedFavourites) {
                const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${f.key}`);
                const json = await res.json();
                const { strDrink, strDrinkThumb, strAlcoholic, strGlass, strInstructions, idDrink } = json.drinks[0];

                const cocktail = {
                    key: idDrink,
                    name: strDrink,
                    image: strDrinkThumb,
                    type: strAlcoholic,
                    glass: strGlass,
                    instructions: strInstructions,
                    isChanged: false,
                };

                if (cocktail.key === '17222') cocktail.name = 'Changed';
                cocktail.isChanged = JSON.stringify(f) !== JSON.stringify(cocktail) ? true : false;
                updatedFavourites.push(cocktail);
            }

        setFavourites(updatedFavourites);
    }

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
                    isChanged: false,
                });
            });
        }
        setCocktails(filtered);
    };

    React.useEffect(() => {
        const fetchData = async () => {
            getFavourites(JSON.parse(localStorage.getItem('favourites')));
        };
        fetchData();
    }, []);

    React.useEffect(() => {
        localStorage.setItem('favourites', JSON.stringify(favourites));
    }, [favourites]);

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
                console.log('Updating favourites: ', newFavourites);
                return newFavourites;
            } else {
                const cocktail = cocktails.filter((c) => c.key === id);
                newFavourites = [...oldFavourites, cocktail[0]];
                console.log('Updating favourites: ', newFavourites);
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
