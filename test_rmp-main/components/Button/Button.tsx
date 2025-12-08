import { ReactNode } from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";

// Пропсы компонента Button
type ButtonProps = {
  children: ReactNode;    // Контент внутри кнопки
  onPress: () => void;    // Обработчик клика
  style?: ViewStyle;      // Дополнительные стили
  type?: "primary" | "secondary" | "danger"; // Тип кнопки (цвет)
}

// Компонент кнопки с разными стилями
export default function Button({ children, onPress, style, type = "primary" }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      // Динамические стили: базовый + тип + кастомные + анимация нажатия
      style={({ pressed }) => [
        styles.base,
        styles[type],        // Цвет по типу (primary/danger)
        style,               // Кастомные стили
        pressed && styles.pressed // Эффект при нажатии
      ]}
    >
      {children}
    </Pressable>
  )
}

// Стили компонента
const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,     // Вертикальные отступы
    paddingHorizontal: 18,   // Горизонтальные отступы
    borderRadius: 12,        // Закругление углов
    alignItems: "center",    // Центрирование по горизонтали
    justifyContent: "center", // Центрирование по вертикали
    marginVertical: 6,       // Вертикальный отступ между кнопками
  },

  pressed: {
    opacity: 0.8,           // Полупрозрачность при нажатии
    transform: [{ scale: 0.98 }], // Легкое уменьшение
  },

  // Цвета для разных типов кнопок:
  primary: {
    backgroundColor: "#4e8cff", // Синий
  },
  secondary: {
    backgroundColor: "#777",    // Серый
  },
  danger: {
    backgroundColor: "#ff6363", // Красный
  },
});