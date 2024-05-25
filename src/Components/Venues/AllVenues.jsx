import React, { useEffect, useState } from 'react';
import SearchBar from '../Layout/SearchBar';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function Venues() {
    const [venues, setVenues] = useState([]);
    const [filteredVenues, setFilteredVenues] = useState([]);
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
                setFilteredVenues(data.data);
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
        const filtered = venues.filter(venue =>
            venue.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredVenues(filtered);
    };

    if (isLoading) {
        return <div>Loading venues...</div>;
    }
    if (isError || !venues) {
        return <div>Error loading venues</div>;
    }

    return (
        <div>
            <Helmet>
                <title>Holidaze | Home</title>
            </Helmet>
            <SearchBar onSearch={handleSearch} />
            <div className='venues-container'>
                {filteredVenues.length > 0 ? (
                    filteredVenues.map((venue) => (
                        <div key={venue.id} className='venue'>
                            <div className='venue-info'>
                                <Link to={`/venue/${venue.id}`}>
                                    <h2 className='venue-title'>{venue.name}</h2>
                                </Link>
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
                ) : (
                    <div>No venues found</div>
                )}
            </div>
        </div>
    );
}

export default Venues;
