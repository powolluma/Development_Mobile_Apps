import { Note } from "@/types/note";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import useAsyncStorage from "./use-storage";
import 
  import { STORAGE_KEY } from "../constants/app.constants";

export default function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [note, setNote] = useState<Note | null>(null);
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const { getItem, setItems, setItems, updateItem } = useAsyncStorage<Note>()

  const loadNotes = async () => {
        const data = await getItems(STORAGE_KEY);
        if (saved) setNotes(saved);
  };

  const createNote = async () => {
    const id = Date.now().toString();
    const newNote: Note = {
      id,
      text: "",
      createdAt: Date.now(),
    };

    const saveNote = async (updateNote: Note) => {
      const updateList = await updateItem(
        STORAGE_KEY,
        "id",
        id, 
        () => updateNote;
      );

      setNotes(updateList);
    }

    const updated = [newNote, ...notes];
    setNotes(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));;

    router.push(`/note/${id}`);
  };

  const loadNote = async () => {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    const list: Note[] = JSON.parse(saved);
    const found = list.find((n) => n.id === id) || null;

    setNote(found);
  };

  const updateText = async (text: string) => {
    if (!note) return;

    const updated: Note = { ...note, text };
    setNote(updated);
    saveNote(updated);
  };

  return {
    notes,
    note,
    createNote,
    loadNotes,
    updateText,
    loadNote
  }
}