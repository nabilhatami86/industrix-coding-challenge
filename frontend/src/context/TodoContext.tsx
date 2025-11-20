import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";

interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: string;
  due_date?: string;
  category_id: number | null;
  category?: {
    id: number;
    name: string;
    color: string;
  };
}

interface Category {
  id: number;
  name: string;
  color: string;
}

interface TodoContextProps {
  todos: Todo[];
  categories: Category[];
  loading: boolean;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
  filters: {
    search: string;
    status: string;
    category: string;
  };
  setFilters: (f: any) => void;
  setPage: (page: number) => void;
  fetchTodos: () => Promise<void>;
  createTodo: (data: any) => Promise<void>;
  updateTodo: (id: number, data: any) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
}

const TodoContext = createContext<TodoContextProps | null>(null);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    category: "",
  });

  const fetchTodos = async () => {
    try {
      setLoading(true);

      const res = await api.get("/todos", {
        params: {
          page: pagination.page,
          limit: pagination.limit,
          search: filters.search || undefined,
          status: filters.status || undefined,
          category: filters.category || undefined,
        },
      });

      console.log(" API Response (GET /todos):", res.data);

      setTodos(res.data.data);
      setPagination((p) => ({
        ...p,
        total: res.data.pagination.total,
      }));
    } catch (e: any) {
      console.error(" Failed loading todos:", e?.response?.data || e);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/categories");
      console.log(" API Response (GET /categories):", res.data);
      setCategories(res.data);
    } catch (e: any) {
      console.error(" Failed loading categories:", e?.response?.data || e);
    }
  };

  const createTodo = async (data: any) => {
    try {
      const res = await api.post("/todos", data);
      console.log(" API Response (POST /todos):", res.data);

      fetchTodos();
    } catch (e: any) {
      console.error(" Failed creating todo:", e?.response?.data || e);
      throw e;
    }
  };

  const updateTodo = async (id: number, data: any) => {
    try {
      const res = await api.put(`/todos/${id}`, data);
      console.log(`API Response (PUT /todos/${id}):`, res.data);

      fetchTodos();
    } catch (e: any) {
      console.error(` Failed updating todo ${id}:`, e?.response?.data || e);
      throw e;
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const res = await api.delete(`/todos/${id}`);
      console.log(`API Response (DELETE /todos/${id}):`, res.data);

      fetchTodos();
    } catch (e: any) {
      console.error(` Failed deleting todo ${id}:`, e?.response?.data || e);
      throw e;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [pagination.page, filters]);

  const setPage = (page: number) => {
    setPagination((p) => ({ ...p, page }));
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        categories,
        loading,
        pagination,
        filters,
        setFilters,
        setPage,
        fetchTodos,
        createTodo,
        updateTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext)!;
