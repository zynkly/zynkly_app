import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import api, { setAuthToken } from '../api/client';

const AuthExampleScreen = () => {
  const [step, setStep] = useState('signup');
  const [form, setForm] = useState({ name: '', email: '', password: '', otp: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const signup = async () => {
    try {
      setLoading(true);
      const res = await api.post('/auth/signup', {
        name: form.name,
        email: form.email,
        password: form.password
      });
      Alert.alert('Success', res.data.message);
      setStep('verify');
    } catch (err) {
      Alert.alert('Error', err?.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);
      const res = await api.post('/auth/verify-otp', {
        email: form.email,
        otp: form.otp
      });
      const token = res.data.accessToken;
      setAuthToken(token);
      Alert.alert('Verified', 'OTP verified');
      setStep('home');
    } catch (err) {
      Alert.alert('Error', err?.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    try {
      setLoading(true);
      const res = await api.post('/auth/login', {
        email: form.email,
        password: form.password
      });
      const token = res.data.accessToken;
      setAuthToken(token);
      Alert.alert('Logged In', 'Login successful');
      setStep('home');
    } catch (err) {
      Alert.alert('Error', err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  if (step === 'signup') {
    return (
      <View style={{ padding: 20, marginTop: 60 }}>
        <Text>Signup</Text>
        <TextInput placeholder="Name" value={form.name} onChangeText={(t) => handleChange('name', t)} />
        <TextInput placeholder="Email" value={form.email} onChangeText={(t) => handleChange('email', t)} />
        <TextInput placeholder="Password" secureTextEntry value={form.password} onChangeText={(t) => handleChange('password', t)} />
        <Button title="Signup" onPress={signup} />
        <Button title="Go to Login" onPress={() => setStep('login')} />
      </View>
    );
  }

  if (step === 'verify') {
    return (
      <View style={{ padding: 20, marginTop: 60 }}>
        <Text>Enter OTP sent to {form.email}</Text>
        <TextInput placeholder="OTP" value={form.otp} onChangeText={(t) => handleChange('otp', t)} />
        <Button title="Verify OTP" onPress={verifyOtp} />
      </View>
    );
  }

  if (step === 'login') {
    return (
      <View style={{ padding: 20, marginTop: 60 }}>
        <Text>Login</Text>
        <TextInput placeholder="Email" value={form.email} onChangeText={(t) => handleChange('email', t)} />
        <TextInput placeholder="Password" secureTextEntry value={form.password} onChangeText={(t) => handleChange('password', t)} />
        <Button title="Login" onPress={login} />
        <Button title="Go to Signup" onPress={() => setStep('signup')} />
      </View>
    );
  }

  return (
    <View style={{ padding: 20, marginTop: 60 }}>
      <Text>Home screen (authenticated)</Text>
    </View>
  );
};

export default AuthExampleScreen;


