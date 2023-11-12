import React from 'react';
import {useNavigate} from "react-router-dom";
import {Button, Result} from "antd";

function Page404() {
    const navigate = useNavigate()
    return (
          <Result
            style={{marginTop:'6%'}}
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={() => navigate('/')}>Back Home</Button>}/>
    );
}

export default Page404;