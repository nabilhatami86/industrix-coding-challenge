import React from "react";
import { Modal, Input, Select, Switch, DatePicker } from "antd";
import { useTodo } from "../context/TodoContext";
import dayjs from "dayjs";

const { Option } = Select;

interface Props {
  visible: boolean;
  editing: any | null;
  setEditing: (v: any | null) => void;
}

const TodoModal: React.FC<Props> = ({ visible, editing, setEditing }) => {
  const { categories, createTodo, updateTodo } = useTodo();

  const handleSave = async () => {
    const payload = {
      title: editing.title,
      description: editing.description || "",
      completed: editing.completed,
      priority: editing.priority,
      due_date: editing.due_date || null,
      category_id: Number(editing.category_id),
    };

    if (editing.id) {
      await updateTodo(editing.id, payload);
    } else {
      await createTodo(payload);
    }

    setEditing(null);
  };

  return (
    <Modal
      title={editing?.id ? "Edit Todo" : "Add Todo"}
      open={visible}
      onOk={handleSave}
      onCancel={() => setEditing(null)}
    >
      <Input
        placeholder="Title"
        value={editing?.title}
        onChange={(e) => setEditing({ ...editing, title: e.target.value })}
        style={{ marginBottom: 10 }}
      />

      <Input.TextArea
        placeholder="Description..."
        value={editing?.description}
        onChange={(e) =>
          setEditing({ ...editing, description: e.target.value })
        }
        rows={3}
        style={{ marginBottom: 10 }}
      />

      <Select
        value={editing?.priority}
        style={{ width: "100%", marginBottom: 10 }}
        onChange={(v) => setEditing({ ...editing, priority: v })}
      >
        <Option value="low">Low</Option>
        <Option value="medium">Medium</Option>
        <Option value="high">High</Option>
      </Select>

      <DatePicker
        style={{ width: "100%", marginBottom: 10 }}
        value={
          editing?.due_date ? dayjs(editing.due_date, "YYYY-MM-DD") : undefined
        }
        onChange={(d) =>
          setEditing({
            ...editing,
            due_date: d ? d.format("YYYY-MM-DD") : null,
          })
        }
      />

      <Select
        value={editing?.category_id?.toString()}
        onChange={(v) => setEditing({ ...editing, category_id: v })}
        style={{ width: "100%", marginBottom: 10 }}
      >
        {categories.map((c) => (
          <Option key={c.id} value={c.id.toString()}>
            {c.name}
          </Option>
        ))}
      </Select>

      <Switch
        checked={editing?.completed}
        onChange={(v) => setEditing({ ...editing, completed: v })}
      />
      <span style={{ marginLeft: 10 }}>Completed</span>
    </Modal>
  );
};

export default TodoModal;
