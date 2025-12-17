import { useRef, useEffect } from 'react';


//Хук debounce
//callback - функция выполнения действия с задержкой
// delay - время задержки (по умолч. 1 сек) 
export function useDebounce(callback: () => void, delay: number = 1000) {
    //useref - контейнер, в котором хранятся данные между рендерами
    //timeRef - хранит id таймера
    const timerRef = useRef<NodeJS.Timeout | null>(null);

  //Функция очистки
  useEffect(() => {
    //Функция выполняется, когда будет удален компонент
    return () => {
      // Если таймер активный
      if (timerRef.current) {
        //То отменяем
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  //Функция debounce
  const debounced = () => {
    //Если таймер запущен
    if (timerRef.current) {
      //То отменяем
      clearTimeout(timerRef.current);
    }

    //Создание нового таймера
    //setTimeout запускает отсчет времени
    timerRef.current = setTimeout(() => {
      //callback выполнится когда delay(время) выйдет
      callback();
    }, delay);
  };

  //Возврат функции
  return debounced;
}