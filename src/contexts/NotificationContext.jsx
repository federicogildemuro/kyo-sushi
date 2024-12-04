import { createContext, useState, useCallback } from 'react'

const NotificationContext = createContext();

function NotificationProvider({ children }) {
    const [notification, setNotification] = useState(null);

    const showNotification = useCallback((message, type) => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 5000);
    }, []);

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            {notification && (
                <div
                    className={`toast show position-fixed top-0 start-50 mt-5 translate-middle-x bg-${notification.type}`}
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