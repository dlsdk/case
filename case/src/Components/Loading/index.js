import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'

export default function Loading() {
    return (
        <div className="loading">
            <h1 className="title">Loading...</h1>
            <LoadingOutlined className="icon" spin/>
        </div>
    ) };