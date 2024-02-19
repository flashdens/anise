import React, { createContext, useState, useContext } from 'react';
import FlashMessage from "@/components/FlashMessage";

const FlashMessageContext = createContext();

export const FlashMessageProvider = ({ children }) => {
    const [message, setMessage] = useState(null);
    const [type, setType] = useState('info');

    const showMessage = (msg, msgType = 'info') => {
        setMessage(msg);
        setType(msgType);
        setTimeout(() => setMessage(null), 5000);
    };

    return (
        <FlashMessageContext.Provider value={{ showMessage }}>
            {children}
            {message && <FlashMessage message={message} type={type} />}
        </FlashMessageContext.Provider>
    );
};

export const useFlashMessage = () => {
    const context = useContext(FlashMessageContext);
    if (!context) {
        throw new Error('useFlashMessage must be used within a FlashMessageProvider');
    }
    return context;
};
