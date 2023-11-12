import React from "react";
import {NavLink} from "react-router-dom";
import {DeleteOutlined, InfoCircleOutlined} from "@ant-design/icons";
import {Button} from "antd";

const handleDeleteItem = (key) => {
    const newData = tableData.filter(item => item.key !== key);
    console.log("new data item deleted : ", newData);
};

export const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        width:600,
        ellipsis: true,
    },
    {
        title: 'Author',
        dataIndex: 'author',
        key: 'author',
        width:300,
        ellipsis: true,
    },
    {
        key: 'actions',
        fixed: 'right',
        render: (data) => (
            <div>
                <NavLink to={`/article/${data.author}`} state={{ data }} style={{marginRight:'15px'}}>
                    Detail
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


export const tableData = [
    {
        key: '1',
        id: 1,
        title: 'ABC',
        content: 'sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf  sdfsdfasdfdsfasflmisdfmsmfasidmfsadmfalsşdmfkdlfjalşkdflşksflşksdfldsnfcmsfdsdfmasdkfmasdkfşsndfsşdnf   sadlfkndkfnasldknfasldnwkldfadskfasdnf sdşlkfskadnfaşsldnfşsldnfsdlkf sdnflsdnfslnfalsnfalskdnfsldnanflsdknf slakdnflsadnflsknfsşlanfslkndfslnflsnf   slkdnflsdknflsndfsldnfslknfaslkdnfsalkndfasşlnf sldkfnaslnfşlnfaşsldnfasd',
        author: 'Dilşo',
    },
    {
        key: '2',
        id: 2,
        title: 'DEF',
        content: 'DFSDFSDFD',
        author: 'Hazel',
    },
    {
        key: '3',
        id: 3,
        title: 'DEF',
        content: 'DFSDFSDFD',
        author: 'Hazel',
    },
    {
        key: '4',
        id: 4,
        title: 'DEF',
        content: 'DFSDFSDFD',
        author: 'Hazel',
    },
    {
        key: '5',
        id: 5,
        title: 'DEF',
        content: 'DFSDFSDFD',
        author: 'Hazel',
    },
    {
        key: '6',
        id: 6,
        title: 'DEF',
        content: 'DFSDFSDFD',
        author: 'Hazel',
    },
    {
        key: '7',
        id: 7,
        title: 'DEF',
        content: 'DFSDFSDFD',
        author: 'Hazel',
    },
    {
        key: '8',
        id: 8,
        title: 'DEF',
        content: 'DFSDFSDFD',
        author: 'Hazel',
    },
    {
        key: '9',
        id: 9,
        title: 'DEF',
        content: 'DFSDFSDFD',
        author: 'Hazel',
    },
    {
        key: '10',
        id: 11,
        title: 'DEF',
        content: 'DFSDFSDFD',
        author: 'Hazel',
    },
    {
        key: '12',
        id: 12,
        title: 'DEF',
        content: 'DFSDFSDFD',
        author: 'Hazel',
    },
    {
        key: '13',
        id: 13,
        title: 'DEF',
        content: 'DFSDFSDFD',
        author: 'Hazel',
    },
    {
        key: '14',
        id: 14,
        title: 'DEF',
        content: 'DFSDFSDFD',
        author: 'Hazel',
    },
    {
        key: '15',
        id: 15,
        title: 'DEF',
        content: 'DFSDFSDFD',
        author: 'Hazel',
    },
    {
        key: '16',
        id: 16,
        title: 'DEF',
        content: 'DFSDFSDFD',
        author: 'Hazel',
    },
    {
        key: '17',
        id: 17,
        title: 'DEF',
        content: 'DFSDFSDFD',
        author: 'Hazel',
    },
    {
        key: '18',
        id: 18,
        title: 'DEF',
        content: 'DFSDFSDFD',
        author: 'Hazel',
    },
    {
        key: '19',
        id: 19,
        title: 'DEF',
        content: 'DFSDFSDFD',
        author: 'Hazel',
    },
    {
        key: '20',
        id: 20,
        title: 'DEF',
        content: 'DFSDFSDFD',
        author: 'Hazel',
    },
    {
        key: '21',
        id: 21,
        title: 'DEF',
        content: 'DFSDFSDFD',
        author: 'Hazel',
    },
    {
        key: '22',
        id: 22,
        title: 'DEF',
        content: 'DFSDFSDFD',
        author: 'Hazel',
    },
    {
        key: '23',
        id: 23,
        title: 'DEF',
        content: 'DFSDFSDFD',
        author: 'Hazel',
    },
    {
        key: '24',
        id: 24,
        title: 'DEF',
        content: 'DFSDFSDFD',
        author: 'Hazel',
    },
    {
        key: '25',
        id: 25,
        title: 'DEF',
        content: 'DFSDFSDFD',
        author: 'Hazel',
    },
    {
        key: '26',
        id: 26,
        title: 'DEF',
        content: 'DFSDFSDFD',
        author: 'Hazel',
    },
    {
        key: '27',
        id: 27,
        title: 'DEF',
        content: 'DFSDFSDFD',
        author: 'Hazel',
    },
    {
        key: '28',
        id: 28,
        title: 'DEF',
        content: 'DFSDFSDFD',
        author: 'Hazel',
    },
    {
        key: '29',
        id: 29,
        title: 'DEF',
        content: 'DFSDFSDFD',
        author: 'Hazel',
    },
    {
        key: '30',
        id: 30,
        title: 'DEF',
        content: 'DFSDFSDFD',
        author: 'Hazel',
    },
    {
        key: '31',
        id: 31,
        title: 'DEF',
        content: 'DFSDFSDFD',
        author: 'Hazel',
    },
    {
        key: '32',
        id: 32,
        title: 'DEF',
        content: 'DFSDFSDFD',
        author: 'Hazel',
    },
    {
        key: '33',
        id: 33,
        title: 'DEF',
        content: 'DFSDFSDFD',
        author: 'Hazel',
    },
    {
        key: '34',
        id: 34,
        title: 'DEF',
        content: 'DFSDFSDFD',
        author: 'Hazel',
    },
];