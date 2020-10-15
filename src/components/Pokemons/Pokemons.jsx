import React, { useState, useEffect } from 'react';
import './css/Pokemons.css';

export const Pokemons = (props) => {

    // const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
    const API_URL = `http://pokeapi.co/api/v2/pokemon/?limit=12`;

    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        loadData();
    }, []);
  
    const loadData = async () => {
        const response = await fetch(API_URL);
        // const response = await fetch(PROXY_URL + API_URL);
        const data = await response.json();
        setPokemons(data.results);
    }
        
    return (
        <div className="Pokemons">
            {
                pokemons.map((p, id) => (
                    <div className="box" key={id}>
                        { p.name }
                    </div>
                ))
            }
        </div>
    )
}