import { createContext, useState, useCallback, useEffect } from 'react'
import './Notification.css'

const NotificationContext = createContext();

function NotificationProvider({ children }) {
    const [notification, setNotification] = useState(null);
    const [isFadingOut, setIsFadingOut] = useState(false);

    const showNotification = useCallback((message, type) => {
        setNotification({ message, type });
        setIsFadingOut(false);
    }, []);

    useEffect(() => {
        if (notification) {
            const fadeOutTimer = setTimeout(() => {
                setIsFadingOut(true);
            }, 4500);

            const clearNotificationTimer = setTimeout(() => {
                setNotification(null);
            }, 5000);

            return () => {
                clearTimeout(fadeOutTimer);
                clearTimeout(clearNotificationTimer);
            }
        }
    }, [notification]);

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            {notification && (
                <div
                    className={`toast show position-fixed top-0 start-50 mt-5 translate-middle-x bg-${notification.type} ${isFadingOut ? 'fade-out' : 'fade-in'}`}
                    role="alert"
                    style={{
                        zIndex: 1000,
                        width: "90%",
                        maxWidth: "900px",
                    }}
                >
                    <div className="toast-body text-white text-center">
                        {notification.message}
                    </div>
                </div>
            )}
        </NotificationContext.Provider>
    )
}

export { NotificationProvider, NotificationContext }