import React, { useState } from 'react';
import { Button, Table } from 'antd';
import { NavLink } from 'react-router-dom';
import { InfoCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';


const data = [
    {
        key: '1',
        id: 1,
        title: 'Sample Title 1',
        content: 'Sample Content 1',
        author: 'John Doe',
        published_date: '2023-01-15',
    },
    {
        key: '2',
        id: 2,
        title: 'Sample Title 2',
        content: 'Sample Content 2',
        author: 'Jane Smith',
        published_date: '2023-02-20',
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
            title: 'Detail',
            key: 'detail',
            render: (data) => (
                <NavLink to={`/article/${data.id}`} state={{ data }}>
                    <InfoCircleOutlined />
                </NavLink>
            ),
        },
        {
            title: 'Delete',
            key: 'delete',
            render: (data) => (
                <Button
                    type="danger"
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteItem(data.key)}
                />
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
        <>
            <Table
                columns={columns}
                dataSource={data}
                rowSelection={{
                    type: 'checkbox',
                    selectedRowKeys,
                    onChange: onSelectChange,
                }}
            />
            {selectedRowKeys.length > 0 && (
                <Button onClick={handleDeleteSelectedItems}>Delete Selected Items</Button>
            )}
        </>
    );
}

export default Home;
