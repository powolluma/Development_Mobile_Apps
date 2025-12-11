import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Note } from "../types/note";
import { useRouter } from "expo-router";

//ХУК для загрузки, хранения и создания новой заметки
export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const router = useRouter();

  //Хук для загрузки заметки при монтировании
  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const saved = await AsyncStorage.getItem("notes");
    if (saved) setNotes(JSON.parse(saved));
  };

  //Хук для создания и сохранения заметки
  const createNote = async () => {
    const id = Date.now().toString();
    const newNote: Note = {
      id,
      text: "",
      createdAt: Date.now(),
    };

    const updated = [newNote, ...notes];
    setNotes(updated);
    await AsyncStorage.setItem("notes", JSON.stringify(updated));
    router.push(`/note/${id}`);
  };

  return {
    notes,      
    createNote, //Хук создания новой заметки
  };
};

//Хук для загрузки, хранения и изменения текста заметки
export const useNote = (id: string | undefined) => {
  const [note, setNote] = useState<Note | null>(null);

  //Хук загрузки заметки при изменении id
  useEffect(() => {
    if (id) loadNote();
  }, [id]);

  const loadNote = async () => {
    const saved = await AsyncStorage.getItem("notes");
    if (!saved) return;

    const list: Note[] = JSON.parse(saved);
    const found = list.find((n) => n.id === id) || null;

    setNote(found);
  };

  //Хук обновления и сохранения текста заметки
  const updateText = async (text: string) => {
    if (!note) return;

    const updated: Note = { ...note, text };
    setNote(updated);

    const saved = await AsyncStorage.getItem("notes");
    if (!saved) return;

    const list: Note[] = JSON.parse(saved);
    const newList = list.map((n) => (n.id === note.id ? updated : n));

    await AsyncStorage.setItem("notes", JSON.stringify(newList));
  };

  return {
    note,        
    updateText,  //Хук изменения текста
  };
};
