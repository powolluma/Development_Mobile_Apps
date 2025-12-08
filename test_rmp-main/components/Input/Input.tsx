import { StyleSheet, TextInput, TextStyle } from "react-native";

// Пропсы компонента Input
type InputProps = {
  value: string;                        // Текущее значение
  onChangeText: (value: string) => void; // Обработчик изменения текста
  placeholder?: string;                  // Подсказка в пустом поле
  style?: TextStyle;                     // Дополнительные стили
  onSubmitEditing?: () => void;          // Действие при нажатии Enter
}

// Компонент текстового поля ввода
export default function Input({
  value,
  onChangeText,
  placeholder = "Введите текст",
  style,
  onSubmitEditing
}: InputProps) {
  return (
    <TextInput 
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={[style, styles.base]}       
      onSubmitEditing={onSubmitEditing}
    />
  )
}

// Базовые стили поля ввода
const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,      // Вертикальные отступы
    paddingHorizontal: 16,    // Горизонтальные отступы
    backgroundColor: "#f2f2f2", // Светло-серый фон
    borderBottomWidth: 2,     // Только нижняя граница
    borderColor: "#222",      // Темный цвет границы
    fontSize: 16,             // Размер текста
    color: "#222",            // Цвет текста
  }
});
