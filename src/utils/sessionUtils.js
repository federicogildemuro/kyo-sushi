const SESSION_DURATION = 60 * 60 * 1000;

const getLoginTime = () => {
    return localStorage.getItem("loginTime");
};

const setLoginTime = () => {
    localStorage.setItem("loginTime", Date.now());
};

const clearLoginTime = () => {
    localStorage.removeItem("loginTime");
};

const isSessionExpired = () => {
    const loginTime = getLoginTime();
    if (!loginTime) return false;

    const parsedLoginTime = parseInt(loginTime, 10);
    if (isNaN(parsedLoginTime)) return false;

    const elapsedTime = Date.now() - parsedLoginTime;
    return elapsedTime > SESSION_DURATION;
};

export { setLoginTime, clearLoginTime, isSessionExpired };