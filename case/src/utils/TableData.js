import React from "react";
import { useDispatch } from "react-redux"; // Import useDispatch
import { NavLink } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import ArticleActions from 'Redux/Actions/ArticleActions';

const {deleteArticle} = ArticleActions

export const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    width: 600,
    ellipsis: true,
  },
  {
    title: 'Author',
    dataIndex: 'author',
    key: 'author',
    width: 300,
    ellipsis: true,
  },
  {
    key: 'actions',
    fixed: 'right',
    render: (data) => (
      <ActionsColumn data={data} />
    ),
  },
];

const ActionsColumn = ({ data }) => {
  const dispatch = useDispatch(); // Get the dispatch function

  const handleDeleteItem = () => {
    dispatch(deleteArticle(data)); // Assuming data has an 'id' property
  };

  return (
    <div>
      <NavLink to={`/article/${data.author}`} state={{ data }} style={{ marginRight: '15px' }}>
        Detail
      </NavLink>
      <Button
        type="danger"
        icon={<DeleteOutlined />}
        onClick={handleDeleteItem}
      />
    </div>
  );
};
