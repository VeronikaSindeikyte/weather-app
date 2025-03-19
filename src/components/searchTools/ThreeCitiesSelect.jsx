import React from 'react';
import { useState } from "react";

const ThreeCitiesSelect = ({ onSearch }) => {
    const [city, setCity] = useState('')

    const handleSelect = (e) => {
        const selectedCity = e.target.value
        setCity(selectedCity)
        onSearch(selectedCity)
    }

    
    return (
        <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
            <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio1"
                autoComplete="off"
                value="Vilnius"
                checked={city === "Vilnius"}
                onChange={handleSelect}
            />
            <label className="btn btn-outline-primary" htmlFor="btnradio1">
                Vilnius
            </label>

            <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio2"
                autoComplete="off"
                value="Kaunas"
                checked={city === "Kaunas"}
                onChange={handleSelect}
            />
            <label className="btn btn-outline-primary" htmlFor="btnradio2">
                Kaunas
            </label>

            <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio3"
                autoComplete="off"
                value="Klaipėda"
                checked={city === "Klaipėda"}
                onChange={handleSelect}
            />
            <label className="btn btn-outline-primary" htmlFor="btnradio3">
                Klaipėda
            </label>
        </div>
    );
};

export default ThreeCitiesSelect