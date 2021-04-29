import React, {FC, useContext, useEffect} from "react";
import {signout} from "../services/auth.service";
import {UserContext} from "../services/user.context";
import {RouteComponentProps} from "react-router";
import {withRouter} from "react-router-dom";

const RouterlessSignoutView: FC<RouteComponentProps> = (props) => {
    const {history} = props;
    const {setUser} = useContext(UserContext);

    useEffect(() => {
        // since <Header depends on user, calling setUser will cause the <Header> component to re-render.
        setUser(undefined);
        // this will clear localstorage
        signout();
        history.replace("/signin");
    }, []);

    return null;
}

export const SignoutView = withRouter(RouterlessSignoutView);
