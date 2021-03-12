export const getCurrentAuthedUser = () =>  {
    const userAuth = JSON.parse(localStorage.getItem("userAuth"));
    return userAuth;
}
