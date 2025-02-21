import { createContext, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationContext = createContext();

function NotificationProvider({ children }) {
    const [notification, setNotification] = useState(null);

    const showNotification = useCallback((message, type, isConfirmation = false, onConfirm = null, onCancel = null) => {
        const iconMapping = {
            success: 'bi-check-circle',
            danger: 'bi-x-circle',
            info: 'bi-info-circle',
            warning: 'bi-exclamation-circle',
            confirm: 'bi-question-circle',
            default: 'bi-bell'
        };
        const icon = iconMapping[type] || iconMapping.default;
        setNotification({ message, type, icon, isConfirmation, onConfirm, onCancel });
        if (!isConfirmation) {
            setTimeout(() => {
                setNotification(null);
            }, 5000);
        }
    }, []);

    const handleConfirm = () => {
        if (notification.onConfirm) notification.onConfirm();
        setNotification(null);
    };

    const handleCancel = () => {
        if (notification.onCancel) notification.onCancel();
        setNotification(null);
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}

            <AnimatePresence>
                {notification && (
                    <motion.div
                        key="notification"
                        className={`toast show position-fixed top-0 start-50 mt-5 translate-middle-x 
                            bg-${notification.type === 'confirm' ? 'warning' : notification.type}`}
                        role="alert"
                        style={{
                            zIndex: 1000,
                            width: "90%",
                            maxWidth: "900px"
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        aria-live={notification.type === 'danger' || notification.isConfirmation ? "assertive" : "polite"}
                    >
                        <div className="toast-body text-white text-center d-flex flex-column align-items-center justify-content-center gap-3">
                            <div>
                                <i
                                    className={`bi ${notification.icon} me-2`}
                                    aria-hidden="true"
                                />
                                <span>{notification.message}</span>
                            </div>

                            {notification.isConfirmation && (
                                <div className="d-flex gap-3">
                                    <button
                                        className="btn btn-success btn-sm"
                                        onClick={handleConfirm}
                                    >
                                        <i
                                            className="bi bi-check-circle me-2"
                                            aria-hidden="true"
                                        />
                                        Confirmar
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={handleCancel}
                                    >
                                        <i
                                            className="bi bi-x-circle me-2"
                                            aria-hidden="true"
                                        />
                                        Cancelar
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </NotificationContext.Provider>
    );
}

export { NotificationProvider, NotificationContext };