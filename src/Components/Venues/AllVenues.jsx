
import React, { useEffect, useState } from "react";
import SearchBar from "../Layout/SearchBar";
import { Link } from 'react-router-dom';

function Venues() {
    const [venues, setVenues] = useState([]);
    const [searchedVenue, setSearchedVenue] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const response = await fetch('https://v2.api.noroff.dev/holidaze/venues');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setVenues(data.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsError(true);
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    const handleSearch = (searchTerm) => {
        const foundVenue = venues.find(venue => venue.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setSearchedVenue(foundVenue);
    };

    if (isLoading) {
        return <div>Loading venues...</div>;
    }
    if (isError || !venues) {
        return <div>Error loading venues</div>;
    }

    return (
        <div>
            <SearchBar onSearch={handleSearch} />
            <div className='venues-container'>
                {searchedVenue ? (
                    <div className='venue'>
                        <div className='venue-info'>
                            <Link to={`/venue/${searchedVenue.id}`}>
                                <h2 className='venue-title'>{searchedVenue.name}</h2>
                            </Link>
                            <p className='venue-description'>Price: ${searchedVenue.price} | Max Guests: {searchedVenue.maxGuests}</p>
                            <Link to={`/venue/${searchedVenue.id}`}>
                                <button className='view-venue-btn'>View Venue</button>
                            </Link>
                            {searchedVenue.media.length > 0 && (
                                <img className='venue-image' src={searchedVenue.media[0].url} alt={searchedVenue.media[0].alt} />
                            )}
                        </div>
                    </div>
                ) : (
                    venues.map((venue) => (
                        <div key={venue.id} className='venue'>
                            <div className='venue-info'>
                                <h2 className='venue-title'>{venue.name}</h2>
                                <p className='venue-description'>Price: ${venue.price} | Max Guests: {venue.maxGuests}</p>
                                {venue.media.length > 0 && (
                                    <img className='venue-image' src={venue.media[0].url} alt={venue.media[0].alt} />
                                )}
                                <Link to={`/venue/${venue.id}`}>
                                    <button className='view-venue-btn'>View Venue</button>
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Venues;
