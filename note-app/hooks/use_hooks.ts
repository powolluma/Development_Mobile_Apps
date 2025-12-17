import { Note } from "@/types/note";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import useAsyncStorage from "@/use-storage";
import { STORAGE_KEY } from "@/constants/app.constants";
import { useDebounce } from "@/hooks/use_debounce";  //Импорт хука use_debounce

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const router = useRouter();
  const { getItems, setItems } = useAsyncStorage<Note>();

  const loadNotes = async () => {
    const saved = await getItems(STORAGE_KEY);
    setNotes(saved);
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const createNote = async () => {
    const id = Date.now().toString();

    const newNote: Note = {
      id,
      text: "",
      createdAt: Date.now(),
    };

    const updated = [newNote, ...notes];
    setNotes(updated);
    await setItems(STORAGE_KEY, updated);

    router.push(`/note/${id}`);
  };

  return {
    notes,
    createNote,
  };
}

export function useNote(id: string) {
  const [note, setNote] = useState<Note | null>(null);
  const { getItems, updateItem, removeItem } = useAsyncStorage<Note>(); //Добавил removeitem

  const loadNote = async() => {
    const list = await getItems(STORAGE_KEY);
    const found = list.find((n) => n.id === id) || null;
    setNote(found);
  };

  useEffect(() => {
    loadNote();
  }, [id]);

  const updateText = async (text: string) => {
    //Условие проверки на наличие заметки, если происходит выход из функции
    if (!note) return;

    //Создание обновленной заметки
    const updated: Note = { ...note, text };
    //Обновление, чтобы изменения было сразу видно
    setNote(updated);

    //Создание функции для отложенного сохранения (debounce)
    //Выполнится через 1сек, так как стоит значение по умолчанию
    const debouncedSave = useDebounce(async () => {
      //Сохранение заметки в AsyncStorage
      await updateItem(STORAGE_KEY, "id", id, () => updated);
    }, 1000);
    //Запуск таймера сохранения, то есть
    debouncedSave();
  };

  //Пользователь будет писать текст, и произойдет сохранение только тогда, когда пройдет 1 секунда и сработает debouncedSave();

  const deleteNote = async () => {
    await removeItem(STORAGE_KEY, "id", id); //Удаление: вызывает removeItem, после происходит router.back(); -- Нажатие кнопки "Назад"
    router.back(); 
  };

  return {
    note,
    updateText,
    deleteNote,
  };
}
