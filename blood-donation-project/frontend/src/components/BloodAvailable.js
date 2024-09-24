import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './BloodAvailable.css'; // Create a CSS file for styling

const BloodAvailable = () => {
    const [bloodData, setBloodData] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchBloodData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/blood/inventory');
                setBloodData(response.data);
            } catch (error) {
                console.error('Error fetching blood types:', error);
            }
        };
        fetchBloodData();
    }, []);

    const handleDonateClick = () => {
        navigate('/donate'); // Navigate to the donation page
    };

    const handleGiveClick = () => {
        navigate('/give'); // Navigate to the give blood page
    };

    // Custom sorting function
    const sortedBloodData = bloodData.sort((a, b) => {
        const bloodTypeA = a.bloodType;
        const bloodTypeB = b.bloodType;

    

        return bloodTypeA.localeCompare(bloodTypeB);
    });

    return (
        <div className="blood-available-container">
            <h1>Available Blood Types</h1>
            <ul>
                {sortedBloodData.length > 0 ? (
                    sortedBloodData.map(({ bloodType, quantity }) => (
                        <li key={bloodType}>
                            {bloodType}: {quantity} ml
                        </li>
                    ))
                ) : (
                    <li>No blood types available</li>
                )}
            </ul>
            <div className="button-container">
                <button className="donate-button" onClick={handleDonateClick}>Donate Blood</button>
                <br/>
                <br/>
                <button className="give-button" onClick={handleGiveClick}>Take Blood</button>
            </div>
        </div>
    );
};

export default BloodAvailable;
