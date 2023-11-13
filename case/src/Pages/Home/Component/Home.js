import React from "react";
import { Row, Col, Card, Table } from "antd";
import { columns } from "utils/TableData";
import {useSelector} from "react-redux";
import {selectArticle} from 'Redux/Selectors';

export default function Tables() {
    const articles = useSelector(selectArticle);

    return (
        <>
            <div className="tabled">
                <Row gutter={24}>
                    <Col xs={24}>
                        <Card className="criclebox tablespace mb-24" title="Dashboard">
                                <Table
                                    columns={columns}
                                    dataSource={articles}
                                    pagination={{
                                        defaultPageSize: 8,
                                        showSizeChanger: false,
                                    }}
                                    className="ant-border-space custom-table"
                                    style={{fontSize:'10px'}}
                                />
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}
