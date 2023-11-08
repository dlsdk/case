import React from 'react';
import {useLocation} from "react-router-dom";
import {Content, Header} from "antd/es/layout/layout";
import {Table} from "antd";

function Article() {
    const location = useLocation();
    const data = location.state.data;
console.log("DATA NE ", data);
    return (
        <div>
            </div>
    );
}

export default Article;