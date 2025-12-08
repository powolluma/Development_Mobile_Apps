// Импортируем компонент Stack из библиотеки 'expo-router'
import { Stack } from 'expo-router';

// Экспортирует RootLayout
export default function RootLayout() {
  return (
    // Создаем контейнер Stack для управления навигацией
    <Stack>
      {/* 
        name="index": указывает, что это экран соответствует файлу index.tsx
        options={{ title: "Todo" }}: задает заголовок экрана "Todo"
      */}
      <Stack.Screen name="index" options={{ title: "Todo" }} />
    </Stack>
  );
}