import React from 'react';
import {Outlet} from "react-router-dom";
import Navbar from "../../Components/Menu";

function HomeLayout() {
    return (
        <>
            <Outlet/>
        </>
    );
}

export default HomeLayout;