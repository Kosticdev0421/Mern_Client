import React, { useContext, useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router';
import { userAuthContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    const [currentUser, setCurrentUser] = useContext(userAuthContext);
    const [loading, setLoading] = useState(true);
    console.log(currentUser)


    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/getUser`, {
            headers: {
                "content-type": "application/json",
                "x-access-token": localStorage.getItem("token"),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.auth) {
                    setCurrentUser(result.user);
                    setLoading(false);
                } else if(result.tokenExpired) {
                    fetch(`${process.env.REACT_APP_SERVER_URL}/refreshToken`, {
                        headers: {
                            "content-type": "application/json",
                            "x-refresh-token": localStorage.getItem('refreshToken')
                        }
                    }).then(res => res.json())
                    .then(res => {
                        console.log("expired!!", res);

                        if(res.auth){
                            localStorage.setItem('token', res.token);
                            setCurrentUser(res.user);
                            setLoading(false);
                        } else {
                            setLoading(false);
                        }
                    })
                } else {
                    setLoading(false);
                }
            });
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
                currentUser.email ? (
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
