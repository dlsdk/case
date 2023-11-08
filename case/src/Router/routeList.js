import React from 'react';
import Login from 'Pages/Auth/Login';
import Register from 'Pages/Auth/Register';
import HomeLayout from 'Pages/Home';
import Home from "Pages/Home/Component/Home";
import AuthLayout from "Pages/Auth";
import Article from 'Pages/Article';

const routeList = [
    {
        path:'/',
        element: <HomeLayout/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: 'article/:id',
                element: <Article/>
            }
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
]

export default routeList;