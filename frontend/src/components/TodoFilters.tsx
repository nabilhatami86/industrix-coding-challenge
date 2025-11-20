import React from "react";
import { Input, Select } from "antd";
import { useTodo } from "../context/TodoContext";

const { Search } = Input;
const { Option } = Select;

const TodoFilters: React.FC = () => {
  const { filters, setFilters, categories } = useTodo();

  return (
    <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
      <Search
        placeholder="Search..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        style={{ width: 250 }}
        allowClear
      />

      <Select
        value={filters.status}
        onChange={(val) => setFilters({ ...filters, status: val })}
        style={{ width: 140 }}
      >
        <Option value="">All Status</Option>
        <Option value="completed">Done</Option>
        <Option value="incomplete">Todo</Option>
      </Select>

      <Select
        value={filters.category}
        onChange={(val) => setFilters({ ...filters, category: val })}
        style={{ width: 150 }}
      >
        <Option value="">All Categories</Option>
        {categories.map((c) => (
          <Option key={c.id} value={c.id.toString()}>
            {c.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default TodoFilters;
