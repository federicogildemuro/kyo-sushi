// Constant that defines the session duration in milliseconds (1 hour)
const SESSION_DURATION = 60 * 60 * 1000;

// Function to retrieve the login time from localStorage
const getLoginTime = () => {
    return localStorage.getItem('loginTime');
};

// Function to set the login time in localStorage to the current timestamp
const setLoginTime = () => {
    localStorage.setItem('loginTime', Date.now());
};

// Function to remove the login time from localStorage, effectively clearing it
const clearLoginTime = () => {
    localStorage.removeItem('loginTime');
};

// Function to check if the session has expired
const isSessionExpired = () => {
    // Retrieve the login time from localStorage
    const loginTime = getLoginTime();
    // If no login time is found, consider the session as not expired
    if (!loginTime) return false;
    // Parse the stored login time to an integer
    const parsedLoginTime = parseInt(loginTime, 10);
    // If parsing failed, consider the session as not expired
    if (isNaN(parsedLoginTime)) return false;
    // Calculate the elapsed time since the login
    const elapsedTime = Date.now() - parsedLoginTime;
    // Return true if the session has expired, false otherwise
    return elapsedTime > SESSION_DURATION;
};

export { setLoginTime, clearLoginTime, isSessionExpired };