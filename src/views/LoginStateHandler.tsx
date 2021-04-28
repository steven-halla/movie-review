import React, {useEffect} from 'react';
import {isLoggedIn} from "../services/auth.service";

export const LoginStateHandler = (props: { history: any; }) => {
    const {history} = props;

    useEffect(() => {
        if (history.location.pathname === '/signin') {
            return;
        }
        if (history.location.pathname === '/signup') {
            return;
        }
        if (history.location.pathname === '/signout') {
            return;
        }
        if (!isLoggedIn()) {
            history.replace("/signin");
        }

    }, []);

    return <></>;
}