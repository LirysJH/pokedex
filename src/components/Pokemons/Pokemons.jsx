import React, { useState, useEffect } from 'react';
import './css/Pokemons.css';

export const Pokemons = (props) => {

    // const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
    const API_URL = `http://pokeapi.co/api/v2/pokemon/?limit=12`;

    const [pokemons, setPokemons] = useState([]);
    const [pokemonsData, setPokemonsData] = useState([]);
    const [pokemonsTypes, setPokemonsTypes] = useState([]);

    useEffect(() => {
        loadSetData();
    }, []);
  
    const loadSetData = async () => {
        const response = await fetch(API_URL);
        // const response = await fetch(PROXY_URL + API_URL);
        const data = await response.json();
        setPokemons(data.results);

        // get data for each pokemon via url

        let responsePokeData = {},
            responseObject= {},
            pokeData = [];
        
        await Promise.all(            
            data.results.map(async el => {
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
            for(let type of el.types)
            {
                pokemonTypes.push(type.type.name);
            }
            allTypes.push(pokemonTypes);
            pokemonTypes = [];
        });

        allTypes = buildTypesBlock(allTypes);        
        setPokemonsTypes(allTypes);
    }

    const buildTypesBlock = (arr) => {
        let items = [],
            itemSet = [];
        
        arr.forEach( element => {
            element.forEach( el => {
                itemSet.push(
                    <div className="container__block">
                        { el }
                    </div>
                ); 
            })
            
            items.push(itemSet);
            itemSet = [];
        })

        return items;
    }
        
    return (
        <div className="Pokemons">
            {
                pokemonsData.map((p, id) => (
                    <div className="box" key={id}>
                        <img
                            src={ p.sprites.front_default }
                            alt="pokemon-img"
                            title={ p.name }
                            className="icon"
                        />
                        { p.name }
                        <div className="container">
                            { pokemonsTypes[id] }
                        </div>
                    </div>
                ))
            }
            {

            }
        </div>
    )
}