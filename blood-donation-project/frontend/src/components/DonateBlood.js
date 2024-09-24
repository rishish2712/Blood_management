import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './DonateBlood.css'; // Import the CSS file

const DonateBlood = () => {
    const [name, setName] = useState('');
    const [bloodType, setBloodType] = useState('');
    const [age, setAge] = useState('');
    const [contact, setContact] = useState('');
    const [aadharNumber, setAadharNumber] = useState(''); // New state for Aadhar number
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const validBloodTypes = ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(''); // Clear previous messages
        setErrorMessage(''); // Clear previous error messages

        // Validate blood type
        if (!validBloodTypes.includes(bloodType)) {
            setErrorMessage('Please enter a valid blood type (A+, A-, AB+, AB-, B+, B-, O+, O-).');
            return;
        }

        // Custom validation for other fields
        if (!/^[A-Za-z\s]+$/.test(name)) {
            setErrorMessage('Name can only contain letters.');
            return;
        }
        if (!/^\d{10}$/.test(contact)) {
            setErrorMessage('Mobile number must be 10 digits.');
            return;
        }
        if (!/^\d{4}-\d{4}-\d{4}$/.test(aadharNumber)) {
            setErrorMessage('Aadhar number must be in the format: 1234-5678-9012.');
            return;
        }
        if (age < 17 || isNaN(age)) {
            setErrorMessage("Your are below 18 can't donate blood.");
            return;
        }

        try {
            // Send the donor details to the backend
            await axios.post('http://localhost:5000/api/donors/donate', { 
                name, 
                bloodType, 
                age, 
                contact, 
                aadharNumber 
            });
            setMessage('Donation successful!'); // You can change this to a success message if needed
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data);
            } else {
                setErrorMessage('An error occurred. Please try again.');
            }
        }
    };

    const handleBackClick = () => {
        navigate('/'); // Navigate back to the home page
    };

    return (
        <div className="form-container">
            <h2>Donate Blood</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Name" 
                    onChange={(e) => setName(e.target.value)} 
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
                    placeholder="Age" 
                    onChange={(e) => setAge(e.target.value)} 
                    required 
                    min="1" // Minimum age
                />
                <input 
                    type="text" 
                    placeholder="Contact Number" 
                    onChange={(e) => setContact(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Aadhar Number (####-####-####)" 
                    onChange={(e) => setAadharNumber(e.target.value)} 
                    required 
                />
                <button type="submit">Donate Blood</button>
                {message && <p className="message">{message}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
            <button className="back-button" onClick={handleBackClick}>Back to Available Blood Types</button>
        </div>
    );
};

export default DonateBlood;

