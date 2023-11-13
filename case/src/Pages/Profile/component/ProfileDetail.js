import React from 'react';
import {Descriptions} from "antd";
import {profileItems} from 'helpers';

function ProfileDetail({title, data}) {
    return (
        <Descriptions title={title}>
            {profileItems.map(item => (
                <Descriptions.Item key={item.key} name={item.name} label={item.label} span={3}>
                    {data && data[item.key]}
                </Descriptions.Item>
            ))}
        </Descriptions>
    );
}

export default ProfileDetail;