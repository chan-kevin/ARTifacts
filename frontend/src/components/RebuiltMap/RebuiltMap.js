import { useState } from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import mapData from '../../data/countries.geo.json';
import 'leaflet/dist/leaflet.css';
import './RebuiltMap.css';

function RebuiltMap() {
    const [artworks, setArtworks] = useState([])
    const [clicked, setClicked] = useState(false)
    const [createdAfter, setCreatedAfter] = useState()
    const [params, setParams] = useState({
        skip: 0,
        limit: 500,
        has_image: 1
    })

    function style() {
        return {
            fillOpacity: 0.8,
            color: "black",
            weight: 2
        }
    }

    function onEachCountry(country, layer) {
        const countryName = country.properties.ADMIN
        layer.bindPopup(countryName);

        const colors = ["green", "yellow", "red", "orange", "purple", "brown"]
        const randomColorIndex = Math.floor(Math.random() * colors.length)

        layer.setStyle({ fillColor: colors[randomColorIndex] })

        layer.on({
            click: () => {
                handleCountryClick(country.properties.ADMIN)
            },
            mouseover: (e) => {
                e.target.setStyle({
                    fillOpacity: 1
                })
            },
            mouseout: (e) => {
                e.target.setStyle({
                    fillOpacity: 0.8
                })
            }
        })
    }


    function formattedYear(year) {
        let newYear;

        if (year.length === 4) {
            newYear = parseInt(year + 99).toString().slice(0, 2) + "99"
        } else {
            newYear = parseInt(year + 99).toString().slice(0, 1) + "99"
        }

        return newYear
    }


    function handleCountryClick(countryName) {

        // let paramsCopy;

        if (createdAfter) {

            setParams({
                ...params,
                q: countryName,
                created_after: createdAfter,
                created_before: formattedYear(createdAfter)
            })
            // paramsCopy = {
            //     ...params,
            //     q: countryName,
            //     created_after: createdAfter,
            //     created_before: formattedYear(createdAfter)
            // }
        } else {
            setParams({ ...params, q: countryName })
        }

        const url = "https://openaccess-api.clevelandart.org/api/artworks";

        fetch(`${url}?${new URLSearchParams(params)}`)
            .then((response) => response.json())
            .then((data) => {
                const filtered = [];
                data.data.forEach((artwork) => {
                    if (params.hasOwnProperty('created_after')) {
                        if (artwork.culture[0]?.toLowerCase().includes(countryName.toLowerCase())) {
                            filtered.push(artwork)
                        }
                    } else {
                        if (artwork.culture[0]?.toLowerCase().includes(countryName.toLowerCase())) {
                            filtered.push(artwork)
                        }
                    }
                });
                setArtworks(filtered);
                setClicked(true);
            })
            .catch((error) => {
                console.error("ERROR getting artwork data", error);
            });
    }




    function handleRandomImage() {
        const randomIndex = Math.floor(Math.random() * artworks.length);
        const randomArtwork = artworks[randomIndex];
        return randomArtwork && (
            <div className="art-display-container">
                <h2>{randomArtwork?.culture}</h2>
                <button onClick={() => setClicked(false)}>&times;</button>
                <img src={randomArtwork?.images.web.url} alt={randomArtwork?.title} id='fetched-image' />
            </div>
        );
    }

    return (
        <>
            <MapContainer
                className='new-map'
                zoom={2.5}
                center={[0, 0]}
                minZoom={2.5}
            >

                <GeoJSON
                    data={mapData.features}
                    style={style}
                    onEachFeature={onEachCountry}
                />
            </MapContainer>
            <div>
                <input className="slider" type="range" min="500" max="1900" step="100" list="values" onChange={(e) => setCreatedAfter(e.target.value)} />
                {console.log(createdAfter)}
                <datalist id="values">
                    <option value="500" label="500s"></option>
                    <option value="600" label="600s"></option>
                    <option value="700" label="700s"></option>
                    <option value="800" label="800s"></option>
                    <option value="900" label="900s"></option>
                    <option value="1000" label="1000s"></option>
                    <option value="1100" label="1100s"></option>
                    <option value="1200" label="1200s"></option>
                    <option value="1300" label="1300s"></option>
                    <option value="1400" label="1400s"></option>
                    <option value="1500" label="1500s"></option>
                    <option value="1600" label="1600s"></option>
                    <option value="1700" label="1700s"></option>
                    <option value="1800" label="1800s"></option>
                    <option value="1900" label="1900s"></option>
                </datalist>
            </div>
            {clicked && handleRandomImage()}
        </>
    )
}

export default RebuiltMap