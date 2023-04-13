import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

function MainPage() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/signin');
    }, []);
}

export default MainPage;