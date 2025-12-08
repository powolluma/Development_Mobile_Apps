import { Colors } from '@/constants/theme'; // Цветовые палитры для тем
import { useColorScheme } from '@/hooks/use-color-scheme'; // Хук для определения темы

/**
 * Хук для получения цвета в зависимости от текущей темы
 * @param props - Возможность переопределить цвет для светлой/темной темы
 * @param colorName - Название цвета из палитры Colors
 */
export function useThemeColor(
  props: { light?: string; dark?: string },               // Кастомные цвета для тем
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark // Имя цвета из палитры
) {
  const theme = useColorScheme() ?? 'light';               // Текущая тема (light/dark)
  const colorFromProps = props[theme];                     // Пробуем взять кастомный цвет

  // Возвращаем кастомный цвет если задан, иначе цвет из палитры
  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}