import React, { useState } from 'react';
import { View, Text, Button, Alert, ActivityIndicator } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import api from '../api/client';

const PaymentExampleScreen = () => {
  const [loading, setLoading] = useState(false);

  const startPayment = async () => {
    try {
      setLoading(true);
      const amount = 500;
      const { data } = await api.post('/payment/create-order', { amount });

      const { orderId, amount: orderAmount, currency, key, paymentId } = data;

      const options = {
        description: 'Service payment',
        image: 'https://placehold.co/100x100',
        currency,
        key,
        amount: orderAmount,
        name: 'ZYApp',
        order_id: orderId,
        prefill: {
          email: 'test@example.com',
          contact: '9999999999',
          name: 'Test User'
        },
        theme: { color: '#53a20e' }
      };

      const paymentResponse = await RazorpayCheckout.open(options);

      const verifyRes = await api.post('/payment/verify', {
        razorpay_order_id: paymentResponse.razorpay_order_id,
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        razorpay_signature: paymentResponse.razorpay_signature,
        paymentRecordId: paymentId
      });

      Alert.alert('Success', verifyRes.data.message);
    } catch (err) {
      if (err && err.description) {
        Alert.alert('Payment Cancelled', err.description);
      } else {
        Alert.alert('Error', err?.response?.data?.message || 'Payment failed');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  return (
    <View style={{ padding: 20, marginTop: 60 }}>
      <Text>Pay Rs 500</Text>
      <Button title="Pay Now" onPress={startPayment} />
    </View>
  );
};

export default PaymentExampleScreen;


