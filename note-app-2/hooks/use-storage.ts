import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useAsyncStorage<T>() {
  const setItems = async (key: string, data: T[]) => {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  };

  const getItems = async (key: string): Promise<T[]> => {
    const data = await AsyncStorage.getItem(key);
    if (!data) return [];
    return JSON.parse(data) as T[];
  };

  const getItem = async <K extends keyof T>(
    key: string,
    field: K,
    value: T[K]
  ): Promise<T | null> => {
    const data = await getItems(key);
    return data.find((item) => item[field] === value) ?? null;
  };

  const updateItem = async <K extends keyof T>(
    key: string,
    field: K,
    value: T[K],
    updater: (item: T) => T
  ): Promise<T[]> => {
    const data = await getItems(key);
    const updated = data.map((item) =>
      item[field] === value ? updater(item) : item
    );
    await setItems(key, updated);
    return updated;
  };

  //Функция удаления заметки
  //Возвращает заметку из AsyncStorage - Удаляет по id - Сохраняет обновленный список
  const removeItem = async <K extends keyof T>(
    key: string,
    field: K,
    value: T[K]
  ): Promise<T[]> => {
    const data = await getItems(key);
    const updated = data.filter((item) => item[field] !== value);
    await setItems(key, updated);
    return updated;
  };


  return {
    getItem,
    getItems,
    setItems,
    updateItem,
    removeItem, //Добавил функцию 
  };
}
