import React, { useState } from 'react';
import styles from '../../Button.module.css';

function NewVenueForm() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [price, setPrice] = useState('');
    const [maxGuests, setMaxGuests] = useState('');
    const [wifi, setWifi] = useState('yes');
    const [parking, setParking] = useState('yes');
    const [breakfast, setBreakfast] = useState('yes');
    const [pets, setPets] = useState('yes');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [country, setCountry] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const apiUrl = 'https://v2.api.noroff.dev/holidaze/venues';

    const handleSubmit = async (event) => {
        event.preventDefault();

        const venueData = {
            name,
            description,
            media: [{ url: imageUrl, alt: 'Venue Image' }],
            price: parseFloat(price),
            maxGuests: parseInt(maxGuests),
            rating: 0,
            meta: { wifi: wifi === 'yes', parking: parking === 'yes', breakfast: breakfast === 'yes', pets: pets === 'yes' },
            location: { address, city, zip, country }
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(venueData)
            });

            if (!response.ok) {
                throw new Error('Failed to create venue');
            }

            const responseData = await response.json();
            console.log('Venue created:', responseData);

            setSuccessMessage('Venue created successfully');
            setErrorMessage('');

        } catch (error) {
            console.error('Error creating venue:', error);
            setErrorMessage('Failed to create venue. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div>
            <h2>Create a New Venue</h2>
            {successMessage && <p className='success-message'>{successMessage}</p>}
            {errorMessage && <p className='error-message'>{errorMessage}</p>}
            <form onSubmit={handleSubmit} className='form'>
                <input
                    type='text'
                    id='name'
                    value={name}
                    placeholder='Name'
                    onChange={(e) => setName(e.target.value)}
                    required
                    className='form-input'
                />
                <textarea
                    id='description'
                    value={description}
                    placeholder='Description'
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className='form-textarea'
                />
                <input
                    type='url'
                    id='imageUrl'
                    value={imageUrl}
                    placeholder='Image URL'
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                    className='form-input'
                />
                <input
                    type='number'
                    id='price'
                    value={price}
                    placeholder='Price'
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    min='0'
                    className='form-input'
                />
                <input
                    type='number'
                    id='maxGuests'
                    value={maxGuests}
                    placeholder='Max Guests'
                    onChange={(e) => setMaxGuests(e.target.value)}
                    required
                    min='1'
                    className='form-input'
                />
                <div>
                    <label>Wifi</label>
                    <div>
                        <input
                            type='radio'
                            name='wifi'
                            value='yes'
                            checked={wifi === 'yes'}
                            onChange={() => setWifi('yes')}
                        /> Yes
                        <input
                            type='radio'
                            name='wifi'
                            value='no'
                            checked={wifi === 'no'}
                            onChange={() => setWifi('no')}
                        /> No
                    </div>
                </div>
                <div>
                    <label>Parking</label>
                    <div>
                        <input
                            type='radio'
                            name='parking'
                            value='yes'
                            checked={parking === 'yes'}
                            onChange={() => setParking('yes')}
                        /> Yes
                        <input
                            type='radio'
                            name='parking'
                            value='no'
                            checked={parking === 'no'}
                            onChange={() => setParking('no')}
                        /> No
                    </div>
                </div>
                <div>
                    <label>Breakfast</label>
                    <div>
                        <input
                            type='radio'
                            name='breakfast'
                            value='yes'
                            checked={breakfast === 'yes'}
                            onChange={() => setBreakfast('yes')}
                        /> Yes
                        <input
                            type='radio'
                            name='breakfast'
                            value='no'
                            checked={breakfast === 'no'}
                            onChange={() => setBreakfast('no')}
                        /> No
                    </div>
                </div>
                <div>
                    <label>Pets</label>
                    <div>
                        <input
                            type='radio'
                            name='pets'
                            value='yes'
                            checked={pets === 'yes'}
                            onChange={() => setPets('yes')}
                        /> Yes
                        <input
                            type='radio'
                            name='pets'
                            value='no'
                            checked={pets === 'no'}
                            onChange={() => setPets('no')}
                        /> No
                    </div>
                </div>
                <input
                    type='text'
                    id='address'
                    value={address}
                    placeholder='Address'
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className='form-input'
                />
                <input
                    type='text'
                    id='city'
                    value={city}
                    placeholder='City'
                    onChange={(e) => setCity(e.target.value)}
                    required
                    className='form-input'
                />
                <input
                    type='text'
                    id='zip'
                    value={zip}
                    placeholder='Zip'
                    onChange={(e) => setZip(e.target.value)}
                    className='form-input'
                />
                <input
                    type='text'
                    id='country'
                    value={country}
                    placeholder='Country'
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    className='form-input'
                />
                <button type='submit' className={styles.button}>Submit</button>
            </form>
        </div>
    );
}

export default NewVenueForm;