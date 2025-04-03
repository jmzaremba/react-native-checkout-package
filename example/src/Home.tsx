import React, { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  Keyboard,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { PaymentForm, usePaymentForm } from 'react-native-checkout-package';

const Home: React.FC = () => {
  const [message, setMessage] = useState('');

  const { isSubmitting, submit } = usePaymentForm({
    onSuccess: (token) => {
      setMessage(`Token: ${token}`);
    },
    onError: (error) => {
      setMessage(`Error: ${error}`);
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={Keyboard.dismiss} style={styles.container}>
        <View style={styles.content}>
          <PaymentForm />
          <View style={styles.buttonContainer}>
            <Button title="Submit" onPress={submit} />
            <ActivityIndicator animating={isSubmitting} />
            <Text>{message}</Text>
          </View>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  buttonContainer: {
    marginTop: 20,
    minHeight: 60,
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
