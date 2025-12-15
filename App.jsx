import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  BackHandler,
} from 'react-native';

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#16A34A', // Green
  secondary: '#1E293B', // Dark Slate
  background: '#F8FAFC', // Light Gray/White
  white: '#FFFFFF',
  text: '#334155',
  textLight: '#64748B',
  accent: '#F59E0B', // Amber for stars/highlights
  border: '#E2E8F0',
};

const SERVICES = [
  {
    id: '1',
    title: 'Kitchen Cleaning',
    description: 'Cleaning kitchen floor, platform, sink, gas stove, and wiping cabinets.',
    price: '₹29',
    duration: '30 Minutes',
    image: 'https://i.ibb.co/mrV6yZ9L/kitchen-cleaning.jpg',
  },
  {
    id: '2',
    title: 'Room Cleaning',
    description: 'Fast cleaning service including floor cleaning, light dusting, and trash removal.',
    price: '₹69',
    duration: '30 Minutes',
    image: 'https://i.ibb.co/JW60XCcK/room.jpg',
  },
  {
    id: '3',
    title: 'Washroom Cleaning',
    description: 'Sweeping and mopping the floor, dusting furniture, cleaning bed area, and removing trash.',
    price: '₹49',
    duration: '28 Minutes',
    image: 'https://i.ibb.co/Y79HtSKL/bathroom.jpg',
  },
  {
    id: '4',
    title: 'Laundry Services',
    description: 'Professional ironing for clean and wrinkle-free clothes.',
    price: '₹50',
    duration: '8 Minutes',
    image: 'https://i.ibb.co/6qFsrjL/laundry.jpg',
  },
  {
    id: '5',
    title: 'Office Cleaning',
    description: 'Professional office cleaning for a clean, healthy, and fresh workplace.',
    price: '₹500',
    duration: '180 Minutes',
    image: 'https://i.ibb.co/B2K8BR7g/office.jpg',
  },
];

const FEATURES = [
  { id: '1', title: 'Professional Cleaners', icon: '👨‍💼' },
  { id: '2', title: 'Flexible Scheduling', icon: '📅' },
  { id: '3', title: 'Affordable Prices', icon: '💰' },
  { id: '4', title: '100% Satisfaction', icon: '✨' },
];

const STEPS = [
  { id: '1', title: 'Pick Service', desc: 'Choose from our wide selection', step: '01' },
  { id: '2', title: 'Add to Cart', desc: 'Add multiple services', step: '02' },
  { id: '3', title: 'Book & Pay', desc: 'Instant, scheduled, or recurring', step: '03' },
];

const TESTIMONIALS = [
  { id: '1', name: 'K Kirti', loc: 'Sector 56', text: "Great value for money. The urgency was handled well." },
  { id: '2', name: 'N Neha', loc: 'Sector 57', text: "Simple and effective. Met my expectations without hassle." },
];

const BACKGROUND_ICONS = ['🧹', '🧽', '🧼', '🧺', '🚿', '🚽', '🧤', '🧴', '🪣', '🛁', '👕', '🏠', '🧹', '🧽', '🧼', '🧺', '🚿', '🚽', '🧤', '🧴'];

const LoginScreen = ({ onLogin, onSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }
    onLogin();
  };

  return (
    <SafeAreaView style={styles.loginContainer}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      
      <View style={styles.loginHeaderContainer}>
         <View style={styles.loginHeaderWave}>
            <Text style={styles.loginLogoText}>Zynkly</Text>
         </View>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.loginFormContainer}>
        <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
          <Text style={styles.welcomeText}>Welcome <Text style={{fontWeight: 'bold'}}>back !</Text></Text>
          
          <TextInput
            style={styles.loginInput}
            placeholder="Username"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
          />
          
          <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.loginInput, {marginBottom: 0, flex: 1}]}
                placeholder="Password"
                placeholderTextColor="#aaa"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <Text style={styles.eyeIcon}>👁️</Text>
          </View>

          <View style={styles.optionsRow}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={styles.radioButton} /> 
                  <Text style={styles.optionText}>Remember me</Text>
              </View>
              <Text style={styles.forgotText}>Forget password?</Text>
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
              <Text style={styles.loginBtnText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.signupRow}>
              <Text style={styles.signupText}>New user? </Text>
              <TouchableOpacity onPress={onSignup}><Text style={styles.signupLink}>Sign Up</Text></TouchableOpacity>
          </View>

          <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialIcon}>
                <Text style={{fontSize: 20}}>G</Text>
              </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const SignupScreen = ({ onLogin, onSignupSuccess }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    if (!name || !phone || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    // Simulate signup
    Alert.alert("Success", "Account created successfully!");
    onSignupSuccess();
  };

  return (
    <SafeAreaView style={styles.loginContainer}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      
      <View style={styles.loginHeaderContainer}>
         <View style={styles.loginHeaderWave}>
            <Text style={styles.loginLogoText}>Zynkly</Text>
         </View>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.loginFormContainer}>
        <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}} showsVerticalScrollIndicator={false}>
          <Text style={styles.welcomeText}>Create <Text style={{fontWeight: 'bold'}}>Account</Text></Text>
          
          <TextInput
            style={styles.loginInput}
            placeholder="Full Name"
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.loginInput}
            placeholder="Phone Number"
            placeholderTextColor="#aaa"
            keyboardType="phone-pad"
            maxLength={10}
            value={phone}
            onChangeText={setPhone}
          />

          <TextInput
            style={styles.loginInput}
            placeholder="Email"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          
          <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.loginInput, {marginBottom: 0, flex: 1}]}
                placeholder="Password"
                placeholderTextColor="#aaa"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
          </View>

          <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.loginInput, {marginBottom: 0, flex: 1}]}
                placeholder="Confirm Password"
                placeholderTextColor="#aaa"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
          </View>

          <TouchableOpacity style={[styles.loginBtn, {marginTop: 20}]} onPress={handleSignup}>
              <Text style={styles.loginBtnText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.signupRow}>
              <Text style={styles.signupText}>Already have an account? </Text>
              <TouchableOpacity onPress={onLogin}><Text style={styles.signupLink}>Login</Text></TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const OtpVerificationScreen = ({ onVerify, email }) => {
  const [otp, setOtp] = useState('');

  const handleVerify = () => {
    if (otp.length !== 4) {
      Alert.alert("Error", "Please enter a valid 4-digit OTP");
      return;
    }
    // Simulate OTP verification
    Alert.alert("Success", "Email Verified Successfully!");
    onVerify();
  };

  return (
    <SafeAreaView style={styles.loginContainer}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      
      <View style={styles.loginHeaderContainer}>
         <View style={styles.loginHeaderWave}>
            <Text style={styles.loginLogoText}>Verification</Text>
         </View>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.loginFormContainer}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={styles.welcomeText}>Enter <Text style={{fontWeight: 'bold'}}>OTP</Text></Text>
          <Text style={{textAlign: 'center', color: '#666', marginBottom: 30}}>
            We have sent a verification code to {email || 'your email'}
          </Text>
          
          <TextInput
            style={[styles.loginInput, {textAlign: 'center', letterSpacing: 10, fontSize: 24, fontWeight: 'bold'}]}
            placeholder="XXXX"
            placeholderTextColor="#aaa"
            keyboardType="number-pad"
            maxLength={4}
            value={otp}
            onChangeText={setOtp}
          />

          <TouchableOpacity style={[styles.loginBtn, {marginTop: 20}]} onPress={handleVerify}>
              <Text style={styles.loginBtnText}>Verify</Text>
          </TouchableOpacity>

          <View style={styles.signupRow}>
              <Text style={styles.signupText}>Didn't receive code? </Text>
              <TouchableOpacity onPress={() => Alert.alert("Sent", "OTP resent successfully!")}>
                <Text style={styles.signupLink}>Resend</Text>
              </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const ServiceBookingScreen = ({ onBack, cartCount, onAdd, onCartPress }) => {
  useEffect(() => {
    const backAction = () => {
      onBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [onBack]);

  const renderServiceItem = ({ item }) => (
    <View style={styles.serviceListCard}>
      <Image source={{ uri: item.image }} style={styles.serviceListImage} />
      <View style={styles.serviceListContent}>
        <View style={styles.serviceListHeader}>
          <Text style={styles.serviceListTitle}>{item.title}</Text>
          <Text style={styles.serviceListPrice}>{item.price}</Text>
        </View>
        <Text style={styles.serviceListDesc}>{item.description}</Text>
        <View style={styles.serviceListFooter}>
          <Text style={styles.serviceListDuration}>⏱ {item.duration}</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => onAdd(item)}>
            <Text style={styles.addButtonText}>ADD</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Service</Text>
        <TouchableOpacity 
          style={styles.cartButton} 
          onPress={onCartPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <View>
            <Text style={styles.cartIcon}>🛒</Text>
            {cartCount > 0 && (
              <View style={styles.badgeContainer} pointerEvents="none">
                <Text style={styles.badgeText}>{cartCount}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        data={SERVICES}
        renderItem={renderServiceItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.serviceListContainer}
      />
    </SafeAreaView>
  );
};

const CartScreen = ({ cartItems, onBack, onConfirm }) => {
  const totalPrice = cartItems.reduce((sum, item) => {
    const price = parseInt(item.price.replace('₹', ''));
    return sum + price;
  }, 0);

  const renderCartItem = ({ item, index }) => (
    <View style={styles.cartItem}>
      <View style={styles.cartItemInfo}>
        <Text style={styles.cartItemTitle}>{item.title}</Text>
        <Text style={styles.cartItemPrice}>{item.price}</Text>
      </View>
      <Text style={styles.cartItemDuration}>{item.duration}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
        <View style={{ width: 50 }} />
      </View>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={styles.cartListContainer}
        ListEmptyComponent={<Text style={styles.emptyCartText}>Your cart is empty</Text>}
      />
      {cartItems.length > 0 && (
        <View style={styles.cartFooter}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalAmount}>₹{totalPrice}</Text>
          </View>
          <TouchableOpacity style={styles.checkoutBtn} onPress={onConfirm}>
            <Text style={styles.checkoutBtnText}>Confirm Booking</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const AddressScreen = ({ onBack, onManualAddress, onAddressSelected }) => {
  const [loading, setLoading] = useState(false);

  const handleCurrentLocation = async () => {
    setLoading(true);
    try {
      // Simulate getting coordinates (Bangalore coordinates for demo)
      // In a real app, use @react-native-community/geolocation
      await new Promise(resolve => setTimeout(resolve, 1500)); // Fake delay
      const mockCoords = { latitude: 12.9716, longitude: 77.5946 };
      
      // Fetch address from OpenStreetMap (Free Reverse Geocoding)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${mockCoords.latitude}&lon=${mockCoords.longitude}`
      );
      const data = await response.json();
      
      if (data && data.address) {
        const addressObj = {
          houseNo: data.address.house_number || '',
          street: data.address.road || data.address.suburb || '',
          city: data.address.city || data.address.state_district || '',
          pincode: data.address.postcode || '',
          fullAddress: data.display_name
        };
        Alert.alert('Location Fetched', `Found: ${addressObj.city}, ${addressObj.pincode}`);
        onAddressSelected(addressObj);
      } else {
        throw new Error('Address not found');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not fetch location. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Address</Text>
        <View style={{ width: 50 }} />
      </View>
      <View style={styles.addressContainer}>
        <TouchableOpacity 
          style={[styles.addressOption, loading && { opacity: 0.7 }]} 
          onPress={handleCurrentLocation}
          disabled={loading}
        >
          <Text style={styles.addressIcon}>{loading ? '⏳' : '📍'}</Text>
          <View style={styles.addressTextContainer}>
            <Text style={styles.addressTitle}>
              {loading ? 'Fetching Location...' : 'Use Current Location'}
            </Text>
            <Text style={styles.addressSubtitle}>Using GPS</Text>
          </View>
          <Text style={styles.arrowIcon}>›</Text>
        </TouchableOpacity>
        
        <View style={styles.divider} />

        <TouchableOpacity style={styles.addressOption} onPress={onManualAddress}>
          <Text style={styles.addressIcon}>📝</Text>
          <View style={styles.addressTextContainer}>
            <Text style={styles.addressTitle}>Enter Address Manually</Text>
            <Text style={styles.addressSubtitle}>Type your address details</Text>
          </View>
          <Text style={styles.arrowIcon}>›</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const ManualAddressScreen = ({ onBack, onSave }) => {
  const [address, setAddress] = useState({
    houseNo: '',
    street: '',
    city: '',
    pincode: '',
  });

  const handleSave = () => {
    if (!address.houseNo || !address.street || !address.city || !address.pincode) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    onSave(address);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Enter Address</Text>
        <View style={{ width: 50 }} />
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.formContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>House No / Flat No</Text>
            <TextInput
              style={styles.inputField}
              placeholder="e.g. A-101"
              value={address.houseNo}
              onChangeText={(text) => setAddress({ ...address, houseNo: text })}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Street / Area</Text>
            <TextInput
              style={styles.inputField}
              placeholder="e.g. MG Road"
              value={address.street}
              onChangeText={(text) => setAddress({ ...address, street: text })}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>City</Text>
            <TextInput
              style={styles.inputField}
              placeholder="e.g. Bangalore"
              value={address.city}
              onChangeText={(text) => setAddress({ ...address, city: text })}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Pincode</Text>
            <TextInput
              style={styles.inputField}
              placeholder="e.g. 560001"
              keyboardType="numeric"
              maxLength={6}
              value={address.pincode}
              onChangeText={(text) => setAddress({ ...address, pincode: text })}
            />
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Save Address</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const PaymentScreen = ({ onBack, onPay, totalAmount }) => {
  const [selectedMethod, setSelectedMethod] = useState('upi');

  const PAYMENT_METHODS = [
    { id: 'upi', title: 'UPI', icon: '📱' },
    { id: 'card', title: 'Credit/Debit Card', icon: '💳' },
    { id: 'netbanking', title: 'Net Banking', icon: '🏦' },
    { id: 'cod', title: 'Cash on Delivery', icon: '💵' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={{ width: 50 }} />
      </View>
      
      <ScrollView contentContainerStyle={styles.paymentContainer}>
        <View style={styles.amountContainer}>
          <Text style={styles.amountLabel}>Total Amount to Pay</Text>
          <Text style={styles.amountValue}>₹{totalAmount}</Text>
        </View>

        <Text style={styles.sectionTitle}>Select Payment Method</Text>
        
        {PAYMENT_METHODS.map((method) => (
          <TouchableOpacity 
            key={method.id} 
            style={[
              styles.paymentOption, 
              selectedMethod === method.id && styles.paymentOptionSelected
            ]}
            onPress={() => setSelectedMethod(method.id)}
          >
            <View style={styles.paymentOptionLeft}>
              <Text style={styles.paymentIcon}>{method.icon}</Text>
              <Text style={styles.paymentTitle}>{method.title}</Text>
            </View>
            <View style={styles.radioOuter}>
              {selectedMethod === method.id && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.payBtn} onPress={() => onPay(selectedMethod)}>
          <Text style={styles.payBtnText}>
            {selectedMethod === 'cod' ? 'Place Order' : `Pay ₹${totalAmount}`}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isOtpVerification, setIsOtpVerification] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [cart, setCart] = useState([]);
  const isDarkMode = useColorScheme() === 'dark';

  const addToCart = (service) => {
    setCart([...cart, service]);
  };

  if (!isAuthenticated) {
    if (isOtpVerification) {
      return (
        <OtpVerificationScreen 
          onVerify={() => {
            setIsOtpVerification(false);
            setIsAuthenticated(true);
          }}
        />
      );
    }
    if (isSignup) {
      return (
        <SignupScreen 
          onLogin={() => setIsSignup(false)} 
          onSignupSuccess={() => {
            setIsSignup(false);
            setIsOtpVerification(true);
          }} 
        />
      );
    }
    return (
      <LoginScreen 
        onLogin={() => setIsAuthenticated(true)} 
        onSignup={() => setIsSignup(true)} 
      />
    );
  }

  if (currentScreen === 'booking') {
    return (
      <ServiceBookingScreen 
        onBack={() => setCurrentScreen('dashboard')} 
        cartCount={cart.length}
        onAdd={addToCart}
        onCartPress={() => setCurrentScreen('cart')}
      />
    );
  }

  if (currentScreen === 'cart') {
    return (
      <CartScreen 
        cartItems={cart} 
        onBack={() => setCurrentScreen('booking')} 
        onConfirm={() => setCurrentScreen('address')}
      />
    );
  }

  if (currentScreen === 'address') {
    return (
      <AddressScreen 
        onBack={() => setCurrentScreen('cart')} 
        onManualAddress={() => setCurrentScreen('manualAddress')}
        onAddressSelected={(address) => {
          console.log('GPS Address:', address);
          setCurrentScreen('payment');
        }}
      />
    );
  }

  if (currentScreen === 'manualAddress') {
    return (
      <ManualAddressScreen 
        onBack={() => setCurrentScreen('address')} 
        onSave={(address) => {
          console.log('Address Saved:', address);
          setCurrentScreen('payment');
        }}
      />
    );
  }

  if (currentScreen === 'payment') {
    const totalAmount = cart.reduce((sum, item) => {
      const price = parseInt(item.price.replace('₹', ''));
      return sum + price;
    }, 0);

    return (
      <PaymentScreen 
        onBack={() => setCurrentScreen('manualAddress')}
        totalAmount={totalAmount}
        onPay={(method) => {
          Alert.alert('Success', `Payment Successful via ${method.toUpperCase()}! Booking Confirmed.`);
          setCart([]);
          setCurrentScreen('dashboard');
        }}
      />
    );
  }

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.logo}>Zynkly</Text>
    </View>
  );

  const renderHero = () => (
    <View style={styles.heroContainer}>
      <Text style={styles.heroTitle}>India's 15 Minute House Help Service</Text>
      <Text style={styles.heroSubtitle}>
        Your home, professionally cleaned — exactly when you need it. On-demand professional cleaners available 24x7.
      </Text>
      
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>99k+</Text>
          <Text style={styles.statLabel}>Homes</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>84k+</Text>
          <Text style={styles.statLabel}>Hours Saved</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>950+</Text>
          <Text style={styles.statLabel}>Pros</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.primaryBtn} onPress={() => setCurrentScreen('booking')}>
        <Text style={styles.primaryBtnText}>Book a Service</Text>
      </TouchableOpacity>
    </View>
  );

  const renderFeatures = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Why Choose Us?</Text>
      <View style={styles.featuresGrid}>
        {FEATURES.map((feature) => (
          <View key={feature.id} style={styles.featureCard}>
            <Text style={styles.featureIcon}>{feature.icon}</Text>
            <Text style={styles.featureText}>{feature.title}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderSteps = () => (
    <View style={[styles.sectionContainer, { backgroundColor: COLORS.white }]}>
      <Text style={styles.sectionTitle}>How it Works</Text>
      <View style={styles.stepsContainer}>
        {STEPS.map((step, index) => (
          <View key={step.id} style={styles.stepItem}>
            <View style={styles.stepCircle}>
              <Text style={styles.stepNumber}>{step.step}</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDesc}>{step.desc}</Text>
            </View>
            {index < STEPS.length - 1 && <View style={styles.stepLine} />}
          </View>
        ))}
      </View>
    </View>
  );

  const renderTestimonials = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>User Reviews</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.testimonialScroll}>
        {TESTIMONIALS.map((item) => (
          <View key={item.id} style={styles.testimonialCard}>
            <Text style={styles.quote}>"</Text>
            <Text style={styles.testimonialText}>{item.text}</Text>
            <View style={styles.testimonialUser}>
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
              </View>
              <View>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userLoc}>{item.loc}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={COLORS.background} />
      {renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderHero()}
        {renderFeatures()}
        {renderSteps()}
        {renderTestimonials()}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 Zynkly. All rights reserved.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  heroContainer: {
    padding: 20,
    backgroundColor: COLORS.white,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.secondary,
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 36,
  },
  heroSubtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 24,
    backgroundColor: '#F1F5F9',
    padding: 15,
    borderRadius: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
  },
  primaryBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryBtnText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContainer: {
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: 16,
  },
  sectionLink: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.secondary,
    textAlign: 'center',
  },
  horizontalList: {
    paddingRight: 20,
  },
  serviceCard: {
    width: 220,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  serviceImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#E2E8F0',
  },
  serviceContent: {
    padding: 12,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: 4,
  },
  serviceDesc: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 12,
    height: 32,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  servicePrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  serviceDuration: {
    fontSize: 10,
    color: COLORS.textLight,
    marginTop: 2,
  },
  addButton: {
    backgroundColor: '#F0FDF4',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  addButtonText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  stepsContainer: {
    marginTop: 8,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    zIndex: 1,
  },
  stepNumber: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
    justifyContent: 'center',
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: 4,
  },
  stepDesc: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  stepLine: {
    position: 'absolute',
    left: 20,
    top: 40,
    bottom: -24,
    width: 2,
    backgroundColor: '#E2E8F0',
    zIndex: 0,
  },
  testimonialScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  testimonialCard: {
    width: 280,
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 16,
    marginRight: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  quote: {
    fontSize: 40,
    color: '#CBD5E1',
    lineHeight: 40,
    marginBottom: -10,
  },
  testimonialText: {
    fontSize: 14,
    color: COLORS.secondary,
    lineHeight: 20,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  testimonialUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  userLoc: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginTop: 20,
  },
  footerText: {
    color: COLORS.textLight,
    fontSize: 12,
  },
  // Login Styles
  loginContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loginHeaderContainer: {
    height: 250,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginHeaderWave: {
    alignItems: 'center',
  },
  loginLogoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  loginFormContainer: {
    flex: 1,
    paddingHorizontal: 30,
  },
  welcomeText: {
    fontSize: 28,
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  loginInput: {
    backgroundColor: '#F5F6FA',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    marginBottom: 15,
    color: '#333',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F6FA',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  eyeIcon: {
    padding: 10,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  radioButton: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginRight: 8,
  },
  optionText: {
    color: '#666',
    fontSize: 14,
  },
  forgotText: {
    color: '#666',
    fontSize: 14,
  },
  loginBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginBottom: 20,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  loginBtnText: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  signupText: {
    color: '#666',
  },
  signupLink: {
    color: COLORS.primary,
    fontWeight: 'bold',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#999',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F6FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  // Old Login Styles (Commented out)
  /*
  gridContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  gridItem: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridIcon: {
    fontSize: 24,
  },
  loginContentWrapper: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  loginCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  loginHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  loginLogo: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.primary,
    marginBottom: 8,
  },
  loginTagline: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 24,
    textAlign: 'center',
  },
  loginTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    marginBottom: 24,
    height: 56,
    overflow: 'hidden',
  },
  prefixContainer: {
    paddingHorizontal: 16,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
  },
  prefixText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  phoneInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORS.secondary,
  },
  continueBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  continueBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  termsText: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 18,
  },
  */
  // Service Booking Styles
  serviceListContainer: {
    padding: 20,
  },
  serviceListCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  serviceListImage: {
    width: '100%',
    height: 180,
    backgroundColor: '#E2E8F0',
  },
  serviceListContent: {
    padding: 16,
  },
  serviceListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  serviceListPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  serviceListDesc: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 16,
    lineHeight: 20,
  },
  serviceListFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceListDuration: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  cartButton: {
    padding: 8,
  },
  cartIcon: {
    fontSize: 24,
  },
  badgeContainer: {
    position: 'absolute',
    top: -5,
    right: -8,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  // Cart Styles
  cartListContainer: {
    padding: 20,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  cartItemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 4,
  },
  cartItemDuration: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  emptyCartText: {
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.textLight,
    marginTop: 40,
  },
  cartFooter: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  checkoutBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutBtnText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Address Styles
  addressContainer: {
    padding: 20,
  },
  addressOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  addressIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  addressTextContainer: {
    flex: 1,
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: 4,
  },
  addressSubtitle: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  arrowIcon: {
    fontSize: 24,
    color: COLORS.textLight,
    fontWeight: 'bold',
  },
  divider: {
    height: 16,
  },
  // Manual Address Styles
  formContainer: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.secondary,
    marginBottom: 8,
  },
  inputField: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: COLORS.secondary,
    backgroundColor: COLORS.white,
  },
  saveBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  saveBtnText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Payment Styles
  paymentContainer: {
    padding: 20,
  },
  amountContainer: {
    backgroundColor: '#F0FDF4',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  amountLabel: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  amountValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: 16,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  paymentOptionSelected: {
    borderColor: COLORS.primary,
    backgroundColor: '#F0FDF4',
  },
  paymentOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.secondary,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
  },
  payBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  payBtnText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;