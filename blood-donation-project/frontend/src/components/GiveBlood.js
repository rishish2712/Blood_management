import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './GiveBlood.css'; // Import the CSS file

const validBloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']; // List of valid blood types

const GiveBlood = () => {
    const [bloodType, setBloodType] = useState('');
    const [quantity, setQuantity] = useState('0');
    const [RecipientName , setRecipientName] = useState('');
    const [availableQuantity, setAvailableQuantity] = useState('0');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Ensure this line is present
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        // Fetch available quantity for the selected blood type
        const fetchAvailableQuantity = async () => {
            if (bloodType) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/blood/inventory/${bloodType}`);
                    setAvailableQuantity(response.data.quantity); // Assuming the response has a quantity field

                    // Check if the blood type is available
                    if (response.data.quantity === 0) {
                        setErrorMessage(`The blood group ${bloodType} is not available at this moment.`);
                    } else {
                        setErrorMessage(''); // Clear error message if available
                    }
                } catch (error) {
                    console.error('Error fetching available quantity:', error);
                    setErrorMessage(`${bloodType} this blood group is not available at the moument contact other engancy.`);
                }
            }
        };

        fetchAvailableQuantity();
    }, [bloodType]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages
        setErrorMessage(''); // Clear previous error messages

        // Validate blood type
        if (!validBloodTypes.includes(bloodType)) {
            setErrorMessage('Please select a valid blood type.');
            return;
        }

        // Check if requested quantity exceeds available quantity
        if (quantity > availableQuantity) {
            setErrorMessage(`Only ${availableQuantity} ml is available for blood type ${bloodType}.`);
            return;
        }

        try {
            // Send the give blood details to the backend
            const response = await axios.post('http://localhost:5000/api/blood/give', { bloodType, quantity, RecipientName });
            setMessage(response.data); // Set success message
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data); // Set error message
            } else {
                setErrorMessage('An unexpected error occurred. Please try again.'); // General error message
            }
        }
    };

    const handleBackClick = () => {
        navigate('/'); // Navigate back to the home page
    };

    return (
        <div className="form-container">
            <h2>Give Blood</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Recipient Name" 
                    onChange={(e) => setRecipientName(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Blood Type" 
                    onChange={(e) => setBloodType(e.target.value)} 
                    required 
                />
                
                <input 
                    type="number" 
                    placeholder="Quanity (ml)" 
                    onChange={(e) => setQuantity(e.target.value)} 
                    required 
                />
                <button type="submit">Take Blood</button>
                {message && <p className="message">{message}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
            </form>

            
            <button className="back-button" onClick={handleBackClick}>Back to Available Blood Types</button>
        </div>
    );
};

export default GiveBlood;
