import { StyleSheet, Text, View } from "react-native";
import Button from "../Button/Button";

// Тип задачи
export type Todo = {
  id: string;           // Уникальный идентификатор
  text: string;         // Текст задачи
  completed: boolean;   // Статус выполнения
}

// Пропсы компонента TodoItem
type TodoItemProps = {
  item: Todo;                     // Данные задачи
  onToggle: (id: string) => void; // Переключение статуса
  onDelete: (id: string) => void; // Удаление задачи
}

// Компонент отображения одной задачи
export default function TodoItem({ item, onToggle, onDelete }: TodoItemProps) {
  return (
    <View style={styles.container}>
      {/* Текст задачи с зачеркиванием, если выполнена */}
      <Text style={[
        styles.text,
        item.completed && styles.textCompleted 
      ]}>
        {item.text}
      </Text>

      {/* Контейнер для кнопок управления */}
      <View style={styles.bntContainer}>
        {/* Кнопка изменения статуса */}
        <Button onPress={() => onToggle(item.id)} style={styles.btn}>
          {item.completed ? <Text>Undone</Text> : <Text>Done</Text>}
        </Button>

        {/* Кнопка удаления */}
        <Button onPress={() => onDelete(item.id)} style={styles.btn}>
          <Text>Del</Text>
        </Button>
      </View>
    </View>
  )
}

// Стили компонента
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",               // Горизонтальное расположение
    alignItems: "center",               // Выравнивание по центру
    paddingVertical: 12,                // Вертикальные отступы
    paddingHorizontal: 10,              // Горизонтальные отступы
    backgroundColor: "#fff",            // Белый фон
    borderRadius: 12,                   // Закругленные углы
    marginVertical: 6,                  // Отступы между задачами
    elevation: 2,                       // Тень для Android
    shadowColor: "#0002",               // Цвет тени
    shadowOpacity: 0.1,                 // Прозрачность тени
    shadowRadius: 4,                    // Размытие тени
    shadowOffset: { width: 0, height: 2 }, // Смещение тени
  },

  bntContainer: {
    flexDirection: "row",               // Кнопки в строку
    gap: 10                             // Расстояние между кнопками
  },

  btn: {
    paddingHorizontal: 5,               // Маленькие горизонтальные отступы
    paddingVertical: 5,                 // Маленькие вертикальные отступы
    backgroundColor: "transparent",     // Прозрачный фон
  },

  text: {
    flex: 1,                            // Занимает всё доступное пространство
    fontSize: 16,                       // Размер шрифта
    color: "#222",                      // Темно-серый цвет
  },

  textCompleted: {
    textDecorationLine: "line-through", // Зачеркнутый текст
    color: "#888",                      // Светло-серый цвет
  }
});
