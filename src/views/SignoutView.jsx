import React, {useEffect} from "react";
import {signout} from "../services/auth.service";
import {history} from "../browserHistory";

export const SignoutView = (props) => {
    const {setUser} = props;

    useEffect(() => {
        // since <Header depends on user, calling setUser will cause the <Header> component to re-render.
        setUser(null);
        // this will clear localstorage
        signout();
        history.replace("/signin");
    }, []);

    return <></>;
}

