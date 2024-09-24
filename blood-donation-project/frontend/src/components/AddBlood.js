import React, { useState } from 'react';
import axios from 'axios';
import './AddBlood.css'; // Create a CSS file for styling

const AddBlood = () => {
    const [bloodType, setBloodType] = useState('');
    const [quantity, setQuantity] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setErrorMessage('');

        try {
            const response = await axios.post('http://localhost:5000/api/blood/add', { bloodType, quantity: parseInt(quantity) });
            setMessage(response.data);
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data);
            } else {
                setErrorMessage('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="form-container">
            <h2>Add Blood to Inventory</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Blood Type" 
                    onChange={(e) => setBloodType(e.target.value)} 
                    required 
                />
                <input 
                    type="number" 
                    placeholder="Quantity (ml)" 
                    onChange={(e) => setQuantity(e.target.value)} 
                    required 
                />
                <button type="submit">Add Blood</button>
                {message && <p className="message">{message}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default AddBlood;
