import { View, TextInput, StyleSheet, TouchableOpacity, Text  } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useNote } from "@/use_hooks"; //Хук для работы с заметкой

export default function NoteScreen() {
  //Хук для получения параметра id из маршрута
  const { id } = useLocalSearchParams<{ id: string }>();

  //Хук для загрузки заметки и обновления текста
  const { note, updateText } = useNote(id);

  if (!note) return null;

  return (
    <View style={styles.container}>
      <TextInput
        multiline
        autoFocus
        value={note.text}         
        onChangeText={updateText}  //Хук обновления заметки
        style={styles.input}
        placeholder="Начните писать..."
        textAlignVertical="top"
      />
      {/* 
      При нажатии вызывает deleteNote
      */}
      <TouchableOpacity onPress={deleteNote} style={styles.deleteBtn}>
        <Text style={styles.deleteText}>Удалить</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  input: {
    flex: 1,
    padding: 20,
    fontSize: 18,
    lineHeight: 26,
  },
  deleteBtn: {
    padding: 16,
    backgroundColor: "#E53935",
    alignItems: "center",
  },
  deleteText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
