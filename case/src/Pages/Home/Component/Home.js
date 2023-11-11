import React, {useEffect} from "react";
import { Row, Col, Card, Table } from "antd";
import { columns, tableData } from "utils/TableData";
import {useSelector} from "react-redux";
import {selectArticle} from 'Redux/Selectors';


export default function Tables() {
    const articles = useSelector(selectArticle);
    const onChange = (e) => {
        console.log(`radio checked:${e.target.value}`);
    };


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
                                        defaultPageSize: 10,
                                        showSizeChanger: false,
                                    }}
                                    className="ant-border-space"
                                />
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}
