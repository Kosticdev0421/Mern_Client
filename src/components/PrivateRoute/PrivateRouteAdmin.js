import React, { useContext } from 'react';
import { Redirect, Route, useHistory } from 'react-router';
import { userAuthContext } from '../../App';

const PrivateRouteAdmin = ({children, ...rest}) => {
        const [currentUser, setCurrentUser] = useContext(userAuthContext);
        const history = useHistory();

    return (
        <Route
            {...rest}
            render={({ location }) =>
                currentUser.userStatus === "admin" ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRouteAdmin;