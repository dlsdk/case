import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
function Loading() {
    return (
        <div className="loading">
            <h1 className="title">Loading...</h1>
            <LoadingOutlined className="icon" spin/>
        </div>
    ) }

export default Loading;