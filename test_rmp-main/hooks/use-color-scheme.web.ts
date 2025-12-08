import { useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 Кастомный хук для определения цветовой схемы
 Решает проблему гидратации на вебе (SSR/SSG)
 */
export function useColorScheme() {
  const [hasHydrated, setHasHydrated] = useState(false); // Флаг завершения гидратации

  // После монтирования отмечаем, что гидратация завершена
  useEffect(() => {
    setHasHydrated(true);
  }, []);

  // Получаем текущую цветовую схему из системы
  const colorScheme = useRNColorScheme();

  // Возвращаем схему только после гидратации, иначе 'light' по умолчанию
  if (hasHydrated) {
    return colorScheme;
  }

  return 'light'; // Значение по умолчанию для серверного рендеринга
}