import React, {FC, useContext, useEffect} from "react";
import {signout} from "../services/auth.service";
import {history} from "../browserHistory";
import {UserContext} from "../services/user.context";

export const SignoutView: FC = () => {
    const { setUser } = useContext(UserContext);

    useEffect(() => {
        // since <Header depends on user, calling setUser will cause the <Header> component to re-render.
        setUser(undefined);
        // this will clear localstorage
        signout();
        history.replace("/signin");
    }, []);

    return <></>;
}

