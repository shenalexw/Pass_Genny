import { useState } from 'react';

export default function useIdentification() {
    const getIdentification = () => {
        const identificationString = sessionStorage.getItem('identification');
        const userIdentification = JSON.parse(identificationString);
        return userIdentification?.identification
    };

    const [identification, setIdentification] = useState(getIdentification());

    const saveIdentification = userIdentification => {
        sessionStorage.setItem('identification', JSON.stringify(userIdentification));
        setIdentification(userIdentification.identification);
    };

    return {
        setIdentification: saveIdentification,
        identification
    }
}