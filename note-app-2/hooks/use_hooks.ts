import { Note } from "@/types/note";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import useAsyncStorage from "@/use-storage";
import { STORAGE_KEY } from "@/constants/app.constants";

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
    if (!note) return;

    const updated: Note = { ...note, text };
    setNote(updated);

    await updateItem(STORAGE_KEY, "id", id, () => updated);
  };

  const deleteNote = async () => {
    await removeItem(STORAGE_KEY, "id", id); //Удаление: вызывает removeItem, после происходит router.back(); 
    router.back(); 
  };

  return {
    note,
    updateText,
    deleteNote,
  };
}
