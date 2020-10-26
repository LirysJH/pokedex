import React, { useState, useEffect, useCallback } from 'react';
import './css/Pokemons.css';

export const Pokemons = (props) => {

    let [limit, setlimit] = useState(12);

    // const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
    const API_URL = `http://pokeapi.co/api/v2/pokemon/?limit=999`;

    const [pokemons, setPokemons] = useState([]);
    const [pokemonsData, setPokemonsData] = useState([]);
    const [pokemonsTypes, setPokemonsTypes] = useState([]);
    const [pokemonDescription, setPokemonDescription] = useState([]);

    const typesAndColors = {
        "normal":
        {
            backgroundColor: "#A3CB38",
            color: "#000"
        },
        "fighting":
        {
            backgroundColor: "#3B3B98",
            color: "#000"
        },
        "flying":
        {
            backgroundColor: "#9AECDB",
            color: "#000"
        },
        "poison":
        {
            backgroundColor: "#a29bfe",
            color: "#000"
        },
        "ground":
        {
            backgroundColor: "#4b4b4b",
            color: "#000"
        },
        "rock":
        {
            backgroundColor: "#ccae62",
            color: "#000"
        },
        "bug":
        {
            backgroundColor: "#badc58",
            color: "#000"
        },
        "ghost":
        {
            backgroundColor: "#dfe6e9",
            color: "#000"
        },
        "steel":
        {
            backgroundColor: "#95afc0",
            color: "#000"
        },
        "fire":
        {
            backgroundColor: "#ff3838",
            color: "#000"
        },
        "water":
        {
            backgroundColor: "#3498db",
            color: "#000"
        },
        "grass":
        {
            backgroundColor: "#2ecc71",
            color: "#000"
        },
        "electric":
        {
            backgroundColor: "#fdcb6e",
            color: "#000"
        },
        "psychic":
        {
            backgroundColor: "#BDC581",
            color: "#000"
        },
        "ice":
        {
            backgroundColor: "#c7ecee",
            color: "#000"
        },
        "dragon":
        {
            backgroundColor: "#30336b",
            color: "#fff"
        },
        "dark":
        {
            backgroundColor: "#2C3A47",
            color: "#fff"
        },
        "fairy":
        {
            backgroundColor: "#e056fd",
            color: "#000"
        },
        "unknown":
        {
            backgroundColor: "#000",
            color: "#000"
        },
        "shadow":
        {
            backgroundColor: "#636e72",
            color: "#000"
        }
    };

    const onPokemonClick = useCallback((event) => {

        let name = event.target.getAttribute('data-name');

        pokemonsData.map(p => {
            if (p.name === name) {
                
                let pokemon = `${p.name} #`;

                if ( +p.id >= 100 ) {
                    pokemon += `${p.id}`;
                } else
                if ( +p.id < 100 && +p.id > 9 ) {
                    pokemon += `0${p.id}`;
                } else {
                    pokemon += `00${p.id}`;
                }

                const stats = {
                    attack: 0,
                    defense: 0,
                    hp: 0,
                    spAttack: 0,
                    spDefense: 0,
                    speed: 0
                };

                p.stats.forEach(s => {                    

                    if (s.stat.name === "attack") {
                        stats.attack = s.base_stat
                    }
                    if (s.stat.name === "defense") {
                        stats.defense = s.base_stat
                    }
                    if (s.stat.name === "hp") {
                        stats.hp = s.base_stat
                    }
                    if (s.stat.name === "special-attack") {
                        stats.spAttack = s.base_stat
                    }
                    if (s.stat.name === "special-defense") {
                        stats.spDefense = s.base_stat
                    }
                    if (s.stat.name === "speed") {
                        stats.speed = s.base_stat
                    }
                });

                if (event.target !== null && name) {
                    setPokemonDescription([]);
                    setPokemonDescription(
                        <div className="details">
                            <img
                                src={p.sprites.front_default}
                                alt="pokemon-img"
                                title={p.name}
                                className="icon"
                            />
                            { pokemon }
                            <table className="stats">
                                <tbody>
                                    <tr className="row">
                                        <td className="cell">
                                            Attack
                                        </td>
                                        <td className="cell wide-cell">
                                            {stats.attack}
                                        </td>
                                    </tr>
                                    <tr className="row">
                                        <td className="cell">
                                            Defense
                                        </td>
                                        <td className="cell wide-cell">
                                            {stats.defense}
                                        </td>
                                    </tr>
                                    <tr className="row">
                                        <td className="cell">
                                            HP
                                        </td>
                                        <td className="cell wide-cell">
                                            {stats.hp}
                                        </td>
                                    </tr>
                                    <tr className="row">
                                        <td className="cell">
                                            SP Attack
                                        </td>
                                        <td className="cell wide-cell">
                                            {stats.spAttack}
                                        </td>
                                    </tr>
                                    <tr className="row">
                                        <td className="cell">
                                            SP Defense
                                        </td>
                                        <td className="cell wide-cell">
                                            {stats.spDefense}
                                        </td>
                                    </tr>
                                    <tr className="row">
                                        <td className="cell">
                                            Speed
                                        </td>
                                        <td className="cell wide-cell">
                                            {stats.speed}
                                        </td>
                                    </tr>
                                    <tr className="row">
                                        <td className="cell">
                                            Weight
                                        </td>
                                        <td className="cell wide-cell">
                                            {p.weight}
                                        </td>
                                    </tr>
                                    <tr className="row">
                                        <td className="cell">
                                            Total moves
                                        </td>
                                        <td className="cell wide-cell">
                                            {p.moves.length}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    );
                }
            }

            return [];
        });

    }, [pokemonsData]);

    const buildTypesBlock = useCallback((arr) => {
        let items = [],
            itemSet = [];

        arr.forEach(element => {
            element.forEach(el => {
                const styles = {
                    backgroundColor: typesAndColors[el].backgroundColor,
                    color: typesAndColors[el].color
                };

                itemSet.push(
                    <div className="container__block" style={styles}>
                        {el}
                    </div>
                );
            })

            items.push(itemSet);
            itemSet = [];
        })

        return items;
    }, [typesAndColors]);

    const loadSetData = useCallback(async () => {
        const response = await fetch(API_URL);
        // const response = await fetch(PROXY_URL + API_URL);
        const data = await response.json();
        setPokemons(data.results);

        // get data for each pokemon via url

        let responsePokeData = {},
            responseObject = {},
            pokeData = [];

        await Promise.all(
            pokemons.map(async el => {
                responsePokeData = await fetch(el.url);
                responseObject = await responsePokeData.json();
                pokeData.push(responseObject);
            })
        );

        setPokemonsData(pokeData);

        // get all types for each pokemon

        let pokemonTypes = [],
            allTypes = [];

        pokeData.map(el => {
            for (let type of el.types) {
                pokemonTypes.push(type.type.name);
            }
            allTypes.push(pokemonTypes);
            pokemonTypes = [];

            return [];
        });

        allTypes = buildTypesBlock(allTypes);
        setPokemonsTypes(allTypes);
    }, [API_URL, buildTypesBlock, pokemons]);

    useEffect(() => {
        document.querySelector(".wrapper").addEventListener("click", onPokemonClick);

        loadSetData();

        return () => {
            document.querySelector(".wrapper").removeEventListener("click", onPokemonClick);
        };
    }, [loadSetData, onPokemonClick]);

    // load next pokemons chunk

    const loadMore = () => {
        setlimit(limit + 12);
    }

    return (
        <div className="Pokemons">
            <div className="column pokemons-list">
                <div className="wrapper">
                    {
                        pokemonsData.slice(0, limit).map((p, id) => (
                            <div className="box" key={id}>
                                <img
                                    src={p.sprites.front_default}
                                    alt="pokemon-img"
                                    title={p.name}
                                    className="icon"
                                    data-name={p.name}
                                />
                                { p.name}
                                <div className="container">
                                    { pokemonsTypes[id] }
                                </div>
                            </div>
                        ))
                    }
                </div>
                <button
                    className="btn"
                    type="button"
                    onClick={loadMore}
                >
                    Load more
                </button>
            </div>

            <div className="column description">
                { pokemonDescription }
            </div>
        </div>
    )
}