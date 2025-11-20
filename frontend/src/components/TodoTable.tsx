import React from "react";
import { Button, Table } from "antd";
import { useTodo } from "../context/TodoContext";

const TodoTable: React.FC<{ onEdit: (t: any) => void }> = ({ onEdit }) => {
  const { todos, deleteTodo } = useTodo();

  const columns = [
    { title: "Title", dataIndex: "title" },
    { title: "Category", dataIndex: ["category", "name"] },
    { title: "Status", render: (r: any) => (r.completed ? "✔️" : "❌") },
    {
      title: "Actions",
      render: (r: any) => (
        <>
          <Button type="link" onClick={() => onEdit(r)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => deleteTodo(r.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      dataSource={todos}
      columns={columns}
      pagination={false}
    />
  );
};

export default TodoTable;
