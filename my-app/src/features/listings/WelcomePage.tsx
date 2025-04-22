import React from 'react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage: FC = () => {
    const navigate = useNavigate();

    const handleCreate = () => {
        navigate('/listing/photos');
    }


return (
    <div className='welcome-container'>
        <h1>Welcome, Seller!</h1>
        <p>{}</p>
        <button onClick={handleCreate}>
            Create new listing!
        </button>
    </div>

    );
};

export default WelcomePage;