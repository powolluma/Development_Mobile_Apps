import { Todo } from "@/components/TodoItem/TodoItem"; // Тип задачи
import AsyncStorage from "@react-native-async-storage/async-storage"; // Локальное хранилище
import { useEffect, useState } from "react";

const STORAGE_KEY = "todos"; // Ключ для AsyncStorage

// Кастомный хук для управления задачами с сохранением
export default function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]); // Состояние списка задач

  // Загрузка задач из хранилища при монтировании
  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) setTodos(JSON.parse(json)); // Парсим и устанавливаем
      } catch (e) {
        console.log("Ошибка загрузки задач:", e);
      }
    })();
  }, []);

  // Функция сохранения задач (в состояние и AsyncStorage)
  const saveTodos = async (newTodos: Todo[]) => {
    setTodos(newTodos); // Обновляем состояние
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos)); // Сохраняем
    } catch (e) {
      console.log("Ошибка сохранения задач:", e);
    }
  };

  // Добавление новой задачи
  const addTodo = (text: string) => {
    if (!text.trim()) return; // Не добавляем пустые
    const newTodo: Todo = {
      id: Date.now().toString(), // ID из timestamp
      text,
      completed: false,
    };
    saveTodos([...todos, newTodo]); // Добавляем в конец
  };

  // Удаление задачи по ID
  const deleteTodo = (id: string) => {
    saveTodos(todos.filter(t => t.id !== id));
  };

  // Переключение статуса выполнения
  const toggleTodo = (id: string) => {
    saveTodos(
      todos.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // Удаление всех выполненных задач
  const clearCompleted = () => {
    saveTodos(todos.filter(t => !t.completed));
  };

  // Экспортируем всё наружу
  return {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
    clearCompleted
  }
}