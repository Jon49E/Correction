import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';

const Layout: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('texto', inputText);

      const response = await axios.post('http://localhost:5011/clasificar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setIsLoading(false);
      setResult(response.data.label);
    } catch (error) {
      setIsLoading(false);
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Zero-Shot Classification</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter text here"
        onChangeText={setInputText}
        value={inputText}
      />
      <Button title="Classify" onPress={handleSubmit} />
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      {result && <Text style={styles.result}>Result: {result}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default Layout;
