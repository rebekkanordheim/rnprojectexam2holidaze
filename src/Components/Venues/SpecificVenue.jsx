import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function SpecificVenue() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setVenue(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsError(true);
        setIsLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (isLoading) {
    return <div>Loading venue...</div>;
  }

  if (isError || !venue) {
    return <div>Error loading venue</div>;
  }

  return (
    <div key={venue.id} className='venue-detail'>
      <div className='venue-info'>
        <h2 className='venue-title'>{venue.name}</h2>
        <p><i>Address:</i> {venue.address}</p>
        <p><i>Max Guests:</i> {venue.maxGuests}</p>
        <p><i>Wifi:</i> {venue.wifi ? 'Yes' : 'No'}</p>
        <p><i>Breakfast:</i> {venue.breakfast ? 'Included' : 'Not Included'}</p>
        <p><i>Description:</i> {venue.description}</p>
        <p><i>Price:</i> ${venue.price}</p>
        {venue.media.length > 0 && (
          <img className='venue-image' src={venue.media[0].url} alt={venue.media[0].alt} />
        )}
      </div>
    </div>
  );
}

export default SpecificVenue;
