/*import React, { useState } from 'react';
import { Button, Table } from 'antd';
import { NavLink } from 'react-router-dom';
import { InfoCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import 'CSS/Home/index.css'

const data = [
    {
        key: '1',
        id: 1,
        title: 'ABC',
        content: 'sdfsdfasdfdsfasd',
        author: 'Dilşo',
    },
    {
        key: '2',
        id: 2,
        title: 'DEF',
        content: 'DFSDFSDFD',
        author: 'Hazel',
    },
];

function Home() {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
        },
        {
            key: 'actions',
            width: '8%',
            render: (data) => (
                <div>
                    <NavLink to={`/article/${data.id}`} state={{ data }}>
                        <InfoCircleOutlined style={{ marginRight: 8 }} />
                    </NavLink>
                    <Button
                        type="danger"
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeleteItem(data.key)}
                    />
                </div>
            ),
        },
    ];
    const onSelectChange = (selectedRowKeys) => {
        setSelectedRowKeys(selectedRowKeys);
    };

    const handleDeleteItem = (key) => {
        const newData = data.filter(item => item.key !== key);
        console.log("new data item deleted : ", newData);
    };

    const handleDeleteSelectedItems = () => {
        const newData = data.filter(item => !selectedRowKeys.includes(item.key));
        console.log("deleted selected items newdata : ",newData);
    };

    return (
        <div className="home" >
            <Table className="table-container"
                   columns={columns}
                   dataSource={data}
                   rowSelection={{
                       type: 'checkbox',
                       selectedRowKeys,
                       onChange: onSelectChange,
                   }}
            />
            <div className="button">
            {selectedRowKeys.length > 0 && (
                <Button onClick={handleDeleteSelectedItems}>Delete Selected Items</Button>
            )}
        </div>
        </div>
    );

}

export default Home;*/

import React from "react";
import { Row, Col, Card, Radio, Table, Upload, message } from "antd";
import { columns, tableData } from "utils/TableData";
const { Dragger } = Upload;
export default function Tables() {
    const onChange = (e) => {
        console.log(`radio checked:${e.target.value}`);
    };

    return (
        <>
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs={24}>
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title="Dashboard"
                        >
                            <div className="table-responsive">
                                <Table
                                    columns={columns}
                                    dataSource={tableData}
                                    className="ant-border-space"
                                />
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}
