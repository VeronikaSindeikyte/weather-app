import React, { useEffect, useState } from "react";
import "./ThreeCitiesSelect.styles.scss";

const ThreeCitiesSelect = ({ onSearch, selectedCity, setSelectedCity }) => {
    const [city, setCity] = useState("");

    useEffect(() => {
        if (!["Vilnius", "Kaunas", "Klaipėda"].includes(selectedCity)) {
            setCity("");
        } else {
            setCity(selectedCity);
        }
    }, [selectedCity]);

    const handleSelect = (e) => {
        const selectedCity = e.target.value;
        setCity(selectedCity);
        setSelectedCity(selectedCity);
        onSearch(selectedCity);
    };

    return (
        <div className="d-flex align-items-center justify-content-center p-3 select-city-btns">
            <div className="btn-group" role="group" aria-label="City select group">
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
        </div>
    );
};

export default ThreeCitiesSelect;
