import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const AddTask = ({ taskText, setTaskText, addTask }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Введите задачу..."
        value={taskText}
        onChangeText={setTaskText}
      />
      <Button title="Добавить" onPress={addTask} color="#4CAF50" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
    elevation: 2,
  },
});

export default AddTask;