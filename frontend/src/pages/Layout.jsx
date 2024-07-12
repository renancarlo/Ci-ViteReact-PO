import React from "react";
import TopBar from "../components/TopBar";
import Sidebar from "../components/Sidebar";

const Layout = ({content}) => {
    return( 
        <>
            <TopBar/>
            <Sidebar content={content}/>
        </>
    );
}

export default Layout;