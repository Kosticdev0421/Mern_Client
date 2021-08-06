import React, { useContext, useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router';
import { getUser } from '../../api';
import { userAuthContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    const [currentUser, setCurrentUser] = useContext(userAuthContext);
    const [loading, setLoading] = useState(true);
    console.log(currentUser)


    useEffect(() => {

        const get = async () => {
            try {
                const { data } = await getUser();
                setCurrentUser(data.user);
            } catch (error) {
                console.log(error);
            }
            setLoading(false)
        };
        get();

    }, []);

    if (loading) {
        return (
            <div className="loading">
            </div>
        );
    }    
    return (
        <Route
            {...rest}
            render={({ location }) =>
                currentUser?.email ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );

    
};

export default PrivateRoute;
