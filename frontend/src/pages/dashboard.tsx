import React, { useState } from "react";
import { Button, Pagination } from "antd";
import TodoFilters from "../components/TodoFilters";
import TodoTable from "../components/TodoTable";
import TodoModal from "../components/TodoModal";
import { useTodo } from "../context/TodoContext";

const Dashboard: React.FC = () => {
  const { pagination, setPage } = useTodo();

  const [editing, setEditing] = useState<any | null>(null);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
      <h1 style={{ textAlign: "center" }}>Industrix Todo App</h1>

      <TodoFilters />

      <TodoTable onEdit={(todo) => setEditing(todo)} />

      <div style={{ marginTop: 20, textAlign: "center" }}>
        <Pagination
          current={pagination.page}
          pageSize={pagination.limit}
          total={pagination.total}
          onChange={setPage}
        />
      </div>

      <div style={{ marginTop: 20, textAlign: "right" }}>
        <Button
          type="primary"
          onClick={() =>
            setEditing({
              title: "",
              description: "",
              priority: "low",
              completed: false,
              due_date: null,
              category_id: "",
            })
          }
        >
          + Add Todo
        </Button>
      </div>

      <TodoModal
        visible={!!editing}
        editing={editing}
        setEditing={setEditing}
      />
    </div>
  );
};

export default Dashboard;
