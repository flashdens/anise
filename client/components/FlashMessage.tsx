import React, { useEffect, useState } from 'react';

const FlashMessage = ({ message, type = 'info', duration = 5000, onClose }) => {
    const [visible, setVisible] = useState(true);
    const [animationClass, setAnimationClass] = useState('fade-in');

    useEffect(() => {
        if (duration) {
            const timer = setTimeout(() => {
                setAnimationClass('fade-out');
            }, duration - 500); // Start fade out 0.5s before hiding

            return () => clearTimeout(timer);
        }
    }, [duration]);

    useEffect(() => {
        if (animationClass === 'fade-out') {
            const timer = setTimeout(() => {
                setVisible(false);
                if (onClose) onClose();
            }, 500); // Wait for fade out to complete

            return () => clearTimeout(timer);
        }
    }, [animationClass, onClose]);

    if (!visible) return null;

    const bgColor = {
        info: 'bg-blue-500',
        success: 'bg-green-500',
        warning: 'bg-yellow-500',
        error: 'bg-red-500',
    }[type];

    return (
        <div className={`${bgColor} ${animationClass} fixed top-0 left-0 right-0 mx-auto p-4 text-white text-sm`}>
            <p>{message}</p>
            <button onClick={() => setAnimationClass('fade-out')} className="absolute top-1 right-2">
                X
            </button>
        </div>
    );
};

export default FlashMessage;

