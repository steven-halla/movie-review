export const getCurrentUserAuth = () =>  {
    const userAuth = JSON.parse(localStorage.getItem("userAuth"));
    return userAuth;
}
