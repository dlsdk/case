import React from 'react';
import Login from 'Pages/Auth/Login';
import Register from 'Pages/Auth/Register';
import HomeLayout from 'Pages/Home';
import Home from "Pages/Home/Component/Home";
import AuthLayout from "Pages/Auth";
import Article from 'Pages/Article';
import Profile from 'Pages/Profile';
import PrivateRoute from "./PrivateRoute";
import Page404 from 'Pages/Page404';

const routeList = [
    {
        path:'/',
        auth: 'true',
        element: <HomeLayout/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: 'article/:author',
                element: <Article/>
            },
            {
                path: 'profile',
                element: <Profile/>
            },
        ]
    },
    {
        path: '/auth',
        element:<AuthLayout/>,
        children: [
            {
                path:'login',
                element:  <Login/>
            },
            {
                path:'register',
                element: <Register/>
            }
        ]
    },
    {
    path: '*',
    element: <Page404 />,
    },
]
const authMap = routes => routes.map(route => {
    if (route.auth){
        route.element = <PrivateRoute>{route.element}</PrivateRoute>
    }
    if(route.children){
        route.children = authMap(route.children)
    }
    return route;
})

export default authMap(routeList);