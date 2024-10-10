import { useAuth } from '@/context/GlobalContext';
import React, { useState } from 'react';
import { Button, TextInput, View, Text, SafeAreaView } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, isLoading } = useAuth();

  const handleLogin = () => {
    signIn(email, password);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
        <View style={{ padding: 16, flex: 1 }}>
        <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={{ borderBottomWidth: 1, marginBottom: 16, color: 'white' }}
        />
        <TextInput
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{ borderBottomWidth: 1, marginBottom: 16, color: 'white' }}
        />
        <Button title={isLoading ? 'Entrando...' : 'Entrar'} onPress={handleLogin} />
        </View>
    </SafeAreaView>
  );
}