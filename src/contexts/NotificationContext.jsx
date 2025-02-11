import { createContext, useCallback, useEffect, useState } from 'react';
import './NotificationContext.css';

const NotificationContext = createContext();

function NotificationProvider({ children }) {
    const [notification, setNotification] = useState(null);
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        if (notification && !notification.isConfirmation) {
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

    const iconMapping = {
        success: 'bi-check-circle',
        error: 'bi-x-circle',
        info: 'bi-info-circle',
        warning: 'bi-exclamation-circle',
        confirm: 'bi-question-circle',
        default: 'bi-bell'
    };

    const showNotification = useCallback((message, type, isConfirmation = false, onConfirm = null, onCancel = null) => {
        const icon = iconMapping[type] || iconMapping.default;
        setNotification({ message, type, icon, isConfirmation, onConfirm, onCancel });
        setIsFadingOut(false);
    }, []);

    const handleConfirm = () => {
        if (notification.onConfirm) {
            notification.onConfirm();
        }
        setNotification(null);
    };

    const handleCancel = () => {
        if (notification.onCancel) {
            notification.onCancel();
        }
        setNotification(null);
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}

            {notification && (
                <div
                    className={`toast show position-fixed top-0 start-50 mt-5 translate-middle-x 
                        bg-${notification.type === 'confirm' ? 'warning' : notification.type} 
                        ${notification.isConfirmation ? 'fade-in' : isFadingOut ? 'fade-out' : 'fade-in'}`}
                    role="alert"
                    style={{
                        zIndex: 1000,
                        width: "90%",
                        maxWidth: "900px"
                    }}
                >
                    <div className="toast-body text-white text-center d-flex align-items-center justify-content-center gap-3">
                        <div>
                            <i className={`bi ${notification.icon} me-2`} />
                            {notification.message}
                        </div>

                        {notification.isConfirmation && (
                            <div className="d-flex gap-3">
                                <button
                                    className="btn btn-sm custom-btn"
                                    onClick={handleConfirm}
                                >
                                    <i className="bi bi-check-circle me-2" />
                                    Confirmar
                                </button>

                                <button
                                    className="btn btn-sm custom-btn"
                                    onClick={handleCancel}
                                >
                                    <i className="bi bi-x-circle me-2" />
                                    Cancelar
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </NotificationContext.Provider>
    );
}

export { NotificationProvider, NotificationContext };