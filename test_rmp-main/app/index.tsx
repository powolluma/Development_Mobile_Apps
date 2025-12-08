// Импорт компонентов из проекта
import Button from "@/components/Button/Button"; // Кнопка для действий
import Input from "@/components/Input/Input"; // Поле ввода для текста задач
import TodoItem from "@/components/TodoItem/TodoItem"; // Компонент отображения одной задачи
import useTodos from "@/hooks/use-todos"; // Кастомный хук для управления задачами
import { useState } from "react"; // React хук для состояния
import { ScrollView, StyleSheet, Text, View } from "react-native"; // Базовые компоненты React Native

// Основной компонент экрана со списком задач
export default function Index() {
  // Использование кастомного хука useTodos для управления задачами:
  // todos - массив всех задач
  // addTodo - функция добавления новой задачи
  // deleteTodo - функция удаления задачи по ID
  // toggleTodo - функция переключения статуса выполнения задачи
  // clearCompleted - функция очистки выполненных задач
  const { todos, addTodo, deleteTodo, toggleTodo, clearCompleted } = useTodos();
  
  // Состояние для хранения текста новой задачи
  const [text, setText] = useState<string>("");

  return (
    // ScrollView позволяет прокручивать контент, если он не помещается на экране
    <ScrollView contentContainerStyle={styles.container}>
      {/* Заголовок экрана */}
      <Text style={styles.title}>Мои задачи</Text>

      {/* Контейнер для поля ввода и кнопки добавления */}
      <View style={styles.inputContainer}>
        {/* Компонент Input для ввода текста новой задачи */}
        <Input 
          value={text}           // Текущее значение поля ввода
          onChangeText={setText} // Обработчик изменения текста
          style={styles.input}   // Дополнительные стили
        />

        {/* Кнопка для добавления новой задачи */}
        <Button onPress={() => addTodo(text)}> {/* При нажатии вызывается addTodo с текущим текстом */}
          <Text style={styles.text}>Add</Text>  {/* Текст на кнопке */}
        </Button>
      </View>

      {/* Контейнер для списка задач */}
      <View>
        {/* Отображение всех задач из массива todos */}
        {todos.map(item => (
          <TodoItem 
            key={item.id}                     // Уникальный ключ для каждого элемента списка
            onDelete={() => deleteTodo(item.id)} // Обработчик удаления задачи
            onToggle={() => toggleTodo(item.id)} // Обработчик переключения статуса задачи
            item={item}                       // Данные задачи для отображения
          />
        ))}
      </View>
      
      {/* Кнопка для удаления всех выполненных задач */}
      <Button
        onPress={clearCompleted}  // При нажатии вызывается функция очистки выполненных задач
        type="danger"             // Тип кнопки "опасный" (вероятно, меняет цвет)
      >
        <Text style={styles.btnDelete}>Delete all</Text>  {/* Текст на кнопке */}
      </Button>

    </ScrollView>
  )
}

// Объект стилей для компонента
const styles = StyleSheet.create({
  title: {
    fontSize: 28,       // Размер шрифта заголовка
    fontWeight: "700",  // Жирность шрифта (bold)
    marginBottom: 20,   // Отступ снизу
  },
  container: {
    padding: 20,        // Внутренние отступы всего контейнера
  },
  text: {
    color: "#fff",      // Цвет текста (белый)
    fontSize: 16,       // Размер шрифта
    fontWeight: "600",  // Полужирный шрифт
  },
  inputContainer: {
    flexDirection: "row", // Расположение элементов в строку (горизонтально)
  },
  input: {
    flex: 1,            // Занимает всё доступное пространство
    marginRight: 16,    // Отступ справа перед кнопкой
  },
  btnDelete: {
    color: "#fff",      // Цвет текста кнопки удаления (белый)
  }
})