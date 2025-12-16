import React, { useState, useEffect, useRef } from 'react';
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
  Animated,
  ActivityIndicator,
} from 'react-native';

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#00D26A', // Vibrant Gen Z Green
  primaryLight: '#DCFCE7', // Low opacity green
  secondary: '#0F172A', // Deep Navy
  background: '#F0FDF4', // Minty Green Background
  white: '#FFFFFF',
  text: '#334155',
  textLight: '#64748B',
  accent: '#FBBF24', 
  border: '#BBF7D0', // Soft Green Border
};

const SERVICES = [
  {
    id: '1',
    title: 'Kitchen Cleaning',
    description: 'Cleaning kitchen floor, platform, sink, gas stove, and wiping cabinets.',
    price: '₹29',
    duration: '30 Minutes',
    image: 'https://i.ibb.co/mrV6yZ9L/kitchen-cleaning.jpg',
    category: 'Deep Cleaning',
  },
  {
    id: '2',
    title: 'Room Cleaning',
    description: 'Fast cleaning service including floor cleaning, light dusting, and trash removal.',
    price: '₹69',
    duration: '30 Minutes',
    image: 'https://i.ibb.co/JW60XCcK/room.jpg',
    category: 'Regular Cleaning',
  },
  {
    id: '3',
    title: 'Washroom Cleaning',
    description: 'Sweeping and mopping the floor, dusting furniture, cleaning bed area, and removing trash.',
    price: '₹49',
    duration: '28 Minutes',
    image: 'https://i.ibb.co/Y79HtSKL/bathroom.jpg',
    category: 'Deep Cleaning',
  },
  {
    id: '4',
    title: 'Laundry Services',
    description: 'Professional ironing for clean and wrinkle-free clothes.',
    price: '₹50',
    duration: '8 Minutes',
    image: 'https://i.ibb.co/6qFsrjL/laundry.jpg',
    category: 'Regular Cleaning',
  },
  {
    id: '5',
    title: 'Office Cleaning',
    description: 'Professional office cleaning for a clean, healthy, and fresh workplace.',
    price: '₹500',
    duration: '180 Minutes',
    image: 'https://i.ibb.co/B2K8BR7g/office.jpg',
    category: 'Office Cleaning',
  },
  {
    id: '6',
    title: 'Move-in Cleaning',
    description: 'Complete deep cleaning for your new home before you move in.',
    price: '₹1500',
    duration: '240 Minutes',
    image: 'https://i.ibb.co/JW60XCcK/room.jpg',
    category: 'Move-in/out',
  },
  {
    id: '7',
    title: 'Quick Dusting',
    description: 'Rapid 15-minute dusting service for urgent needs.',
    price: '₹99',
    duration: '15 Minutes',
    image: 'https://i.ibb.co/JW60XCcK/room.jpg',
    category: 'Quick Service (15 min)',
  },
];

const CATEGORIES = ['All Services', 'Deep Cleaning', 'Regular Cleaning', 'Move-in/out', 'Office Cleaning', 'Quick Service (15 min)'];

const FEATURES = [
  { id: '1', title: 'Professional Cleaners', icon: '👨‍💼' },
  { id: '2', title: 'Flexible Scheduling', icon: '⏰' },
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

const GoogleLoginScreen = ({ onSuccess, onCancel }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee', flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity onPress={onCancel} style={{padding: 10}}>
          <Text style={{fontSize: 20, color: '#333'}}>✕</Text>
        </TouchableOpacity>
        <Text style={{fontSize: 16, fontWeight: 'bold', marginLeft: 10, color: '#333'}}>Sign in with Google</Text>
      </View>
      
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#4285F4" />
          <Text style={{marginTop: 20, color: '#666'}}>Connecting to Google...</Text>
        </View>
      ) : (
        <View style={{flex: 1, padding: 30, alignItems: 'center', justifyContent: 'center'}}>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/300/300221.png' }} 
            style={{ width: 60, height: 60, marginBottom: 20 }} 
            resizeMode="contain"
          />
          <Text style={{fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: '#333'}}>Choose an account</Text>
          <Text style={{fontSize: 16, color: '#666', marginBottom: 40}}>to continue to Zynkly</Text>
          
          <TouchableOpacity 
            style={{
              flexDirection: 'row', 
              alignItems: 'center', 
              padding: 15, 
              borderWidth: 1, 
              borderColor: '#ddd', 
              borderRadius: 8, 
              width: '100%',
              marginBottom: 15
            }}
            onPress={onSuccess}
          >
            <View style={{width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', marginRight: 15}}>
              <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>U</Text>
            </View>
            <View>
              <Text style={{fontWeight: 'bold', fontSize: 16, color: '#333'}}>User Name</Text>
              <Text style={{color: '#666'}}>user@example.com</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={{
              flexDirection: 'row', 
              alignItems: 'center', 
              padding: 15, 
              borderWidth: 1, 
              borderColor: '#ddd', 
              borderRadius: 8, 
              width: '100%'
            }}
            onPress={onSuccess}
          >
             <View style={{width: 40, height: 40, borderRadius: 20, backgroundColor: '#666', justifyContent: 'center', alignItems: 'center', marginRight: 15}}>
              <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>+</Text>
            </View>
            <Text style={{fontWeight: 'bold', fontSize: 16, color: '#333'}}>Use another account</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const LoginScreen = ({ onLogin, onSignup, onGoogleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
                secureTextEntry={!isPasswordVisible}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                <Text style={styles.eyeIcon}>{isPasswordVisible ? '🙈' : '👁️'}</Text>
              </TouchableOpacity>
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
              <TouchableOpacity style={styles.socialIcon} onPress={onGoogleLogin}>
                <Image 
                  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/300/300221.png' }} 
                  style={{ width: 24, height: 24 }} 
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialIcon}>
                <Image 
                  source={{ uri: 'https://cdn-icons-png.flaticon.com/512/0/747.png' }} 
                  style={{ width: 24, height: 24 }} 
                  resizeMode="contain"
                />
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
  
  // Interactive States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  // Password Validation States
  const hasMinLength = password.length >= 9;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSignup = () => {
    if (!name || !phone || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    if (!hasMinLength || !hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
      Alert.alert("Error", "Please meet all password requirements.");
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

  const getInputStyle = (inputName) => [
    styles.loginInput,
    focusedInput === inputName && { borderColor: COLORS.primary, borderWidth: 1, backgroundColor: COLORS.white }
  ];

  const renderPasswordRequirement = (met, text) => (
    <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 10, marginBottom: 5}}>
      <Text style={{color: met ? COLORS.primary : '#ccc', marginRight: 4, fontSize: 12}}>{met ? '✓' : '○'}</Text>
      <Text style={{color: met ? COLORS.secondary : '#999', fontSize: 12}}>{text}</Text>
    </View>
  );

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
            style={getInputStyle('name')}
            placeholder="Full Name"
            placeholderTextColor="#aaa"
            value={name}
            onChangeText={setName}
            onFocus={() => setFocusedInput('name')}
            onBlur={() => setFocusedInput(null)}
          />

          <TextInput
            style={getInputStyle('phone')}
            placeholder="Phone Number"
            placeholderTextColor="#aaa"
            keyboardType="phone-pad"
            maxLength={10}
            value={phone}
            onChangeText={setPhone}
            onFocus={() => setFocusedInput('phone')}
            onBlur={() => setFocusedInput(null)}
          />

          <TextInput
            style={getInputStyle('email')}
            placeholder="Email"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            onFocus={() => setFocusedInput('email')}
            onBlur={() => setFocusedInput(null)}
          />
          
          <View style={[styles.passwordContainer, focusedInput === 'password' && { borderColor: COLORS.primary, borderWidth: 1, backgroundColor: COLORS.white }]}>
              <TextInput
                style={{flex: 1, fontSize: 16, color: COLORS.secondary, paddingVertical: 15}}
                placeholder="Password"
                placeholderTextColor="#aaa"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                onFocus={() => setFocusedInput('password')}
                onBlur={() => setFocusedInput(null)}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Text style={styles.eyeIcon}>{showPassword ? '🙈' : '👁️'}</Text>
              </TouchableOpacity>
          </View>

          {/* Password Strength Indicators */}
          <View style={{flexDirection: 'row', flexWrap: 'wrap', marginBottom: 15, paddingHorizontal: 10}}>
            {renderPasswordRequirement(hasMinLength, "9+ Chars")}
            {renderPasswordRequirement(hasUpperCase, "Uppercase")}
            {renderPasswordRequirement(hasLowerCase, "Lowercase")}
            {renderPasswordRequirement(hasNumber, "Number")}
            {renderPasswordRequirement(hasSpecialChar, "Special Char")}
          </View>

          <View style={[styles.passwordContainer, focusedInput === 'confirmPassword' && { borderColor: COLORS.primary, borderWidth: 1, backgroundColor: COLORS.white }]}>
              <TextInput
                style={{flex: 1, fontSize: 16, color: COLORS.secondary, paddingVertical: 15}}
                placeholder="Confirm Password"
                placeholderTextColor="#aaa"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                onFocus={() => setFocusedInput('confirmPassword')}
                onBlur={() => setFocusedInput(null)}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Text style={styles.eyeIcon}>{showConfirmPassword ? '🙈' : '👁️'}</Text>
              </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.loginBtn, {marginTop: 10}]} onPress={handleSignup}>
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
  const [selectedCategory, setSelectedCategory] = useState('All Services');

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

  const filteredServices = selectedCategory === 'All Services' 
    ? SERVICES 
    : SERVICES.filter(service => service.category === selectedCategory);

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.categoryTab, 
        selectedCategory === item && styles.activeCategoryTab
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text style={[
        styles.categoryTabText, 
        selectedCategory === item && styles.activeCategoryTabText
      ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

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
    <View style={styles.container}>
      <View style={styles.header}>
        {onBack && (
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        )}
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
      
      <View style={styles.categoryContainer}>
        <FlatList
          data={CATEGORIES}
          renderItem={renderCategoryItem}
          keyExtractor={item => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        />
      </View>

      <FlatList
        data={filteredServices}
        renderItem={renderServiceItem}
        keyExtractor={item => item.id}
        contentContainerStyle={[styles.serviceListContainer, { paddingBottom: 100 }]}
      />
    </View>
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

const ProfileScreen = ({ onBack, onLogout }) => {
  const MENU_ITEMS = [
    { id: '1', title: 'Address book', icon: '📖' },
    { id: '2', title: 'Share App', icon: '📤' },
    { id: '3', title: 'About Us', icon: 'ℹ️' },
    { id: '4', title: 'Rate Us', icon: '⭐' },
    { id: '5', title: 'Logout', icon: '🚪', isLogout: true },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        {onBack && (
          <TouchableOpacity onPress={onBack} style={styles.profileBackButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
        )}
        <View style={styles.profileInfoContainer}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileAvatarText}>👤</Text>
          </View>
          <Text style={styles.profileName}>Your Account</Text>
          <Text style={styles.profilePhone}>+91 98765 43210</Text>
        </View>
      </View>

      <ScrollView style={styles.profileContent} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.quickActionsRow}>
          <TouchableOpacity style={styles.quickActionItem}>
            <View style={styles.quickActionIconBox}>
              <Text style={styles.quickActionIcon}>📦</Text>
            </View>
            <Text style={styles.quickActionText}>Your orders</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionItem}>
            <View style={styles.quickActionIconBox}>
              <Text style={styles.quickActionIcon}>💰</Text>
            </View>
            <Text style={styles.quickActionText}>Zynkly Money</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionItem}>
            <View style={styles.quickActionIconBox}>
              <Text style={styles.quickActionIcon}>🎧</Text>
            </View>
            <Text style={styles.quickActionText}>Need Help</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.menuSectionTitle}>Your information</Text>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.menuItem}
              onPress={item.isLogout ? onLogout : null}
            >
              <View style={styles.menuItemLeft}>
                <Text style={styles.menuItemIcon}>{item.icon}</Text>
                <Text style={[styles.menuItemTitle, item.isLogout && { color: 'red' }]}>
                  {item.title}
                </Text>
              </View>
              <Text style={styles.menuItemArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const BottomNavBar = ({ currentScreen, onNavigate }) => {
  const tabs = [
    { id: 'dashboard', label: 'Home', icon: '🏠' },
    { id: 'booking', label: 'Booking', icon: '�️' },
    { id: 'profile', label: 'Account', icon: '👤' },
  ];

  return (
    <View style={styles.bottomNavContainer}>
      <View style={styles.bottomNav}>
        {tabs.map((tab) => {
          const isActive = currentScreen === tab.id;
          return (
            <TouchableOpacity 
              key={tab.id} 
              style={styles.navItem} 
              onPress={() => onNavigate(tab.id)}
            >
              <View style={[styles.navIconContainer, isActive && styles.activeNavIconContainer]}>
                <Text style={[styles.navIcon, isActive && styles.activeNavIcon]}>
                  {tab.icon}
                </Text>
              </View>
              <Text style={[styles.navLabel, isActive && styles.activeNavLabel]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const SplashScreen = ({ onFinish }) => {
  const [step, setStep] = useState(0); // 0: Zynkly, 1: Tagline
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    // Sequence 1: Show "Zynkly"
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    // Sequence 2: Switch to Tagline after delay
    const timer1 = setTimeout(() => {
        // Fade out Zynkly
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start(() => {
            setStep(1);
            scaleAnim.setValue(0.8); // Reset scale for next text
            // Fade in Tagline
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    friction: 4,
                    useNativeDriver: true,
                }),
            ]).start();
        });
    }, 1000);

    // Sequence 3: Finish
    const timer2 = setTimeout(() => {
        onFinish();
    }, 4000); // Total time

    return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
    };
  }, []);

  return (
    <View style={styles.splashContainer}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }], alignItems: 'center', paddingHorizontal: 20 }}>
        {step === 0 ? (
            <Text style={styles.splashLogoText}>Zynkly</Text>
        ) : (
            <Text style={styles.splashTagline}>
                Floor ho ya Bathroom , ya fir ho kapdo may gandagi. Book kro Zynkly !
            </Text>
        )}
      </Animated.View>
    </View>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [isOtpVerification, setIsOtpVerification] = useState(false);
  const [showSplash, setShowSplash] = useState(false);
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [cart, setCart] = useState([]);
  const isDarkMode = useColorScheme() === 'dark';

  const addToCart = (service) => {
    setCart([...cart, service]);
  };

  if (showSplash) {
    return <SplashScreen onFinish={() => { setShowSplash(false); setIsAuthenticated(true); }} />;
  }

  if (isGoogleLogin) {
    return (
      <GoogleLoginScreen 
        onSuccess={() => {
          setIsGoogleLogin(false);
          setShowSplash(true);
        }}
        onCancel={() => setIsGoogleLogin(false)}
      />
    );
  }

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
        onLogin={() => setShowSplash(true)} 
        onSignup={() => setIsSignup(true)} 
        onGoogleLogin={() => setIsGoogleLogin(true)}
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
      <TouchableOpacity style={styles.walletButton}>
        <Image 
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/214/214362.png' }} 
          style={{ width: 24, height: 24, tintColor: COLORS.primary }} 
        />
      </TouchableOpacity>
    </View>
  );

  const renderHero = () => (
    <View style={styles.heroContainer}>
      <Text style={styles.heroTitle}>India's 15 Minute House Help Service</Text>
      
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

  const renderMainContent = () => {
    if (currentScreen === 'booking') {
      return (
        <ServiceBookingScreen 
          cartCount={cart.length}
          onAdd={addToCart}
          onCartPress={() => setCurrentScreen('cart')}
        />
      );
    }
    
    if (currentScreen === 'profile') {
      return (
        <ProfileScreen 
          onLogout={() => {
            setIsAuthenticated(false);
            setCurrentScreen('dashboard');
          }}
        />
      );
    }

    return (
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {renderHero()}
        {renderFeatures()}
        {renderSteps()}
        {renderTestimonials()}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 Zynkly. All rights reserved.</Text>
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={COLORS.background} />
      {currentScreen === 'dashboard' && renderHeader()}
      <View style={{ flex: 1 }}>
        {renderMainContent()}
      </View>
      <BottomNavBar currentScreen={currentScreen} onNavigate={setCurrentScreen} />
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Glassmorphism effect
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  walletButton: {
    padding: 8,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  walletIcon: {
    fontSize: 20,
  },
  profileButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  profileIcon: {
    fontSize: 20,
  },
  heroContainer: {
    padding: 20,
    backgroundColor: 'transparent', // Let the gradient/background show through
    alignItems: 'center',
    marginBottom: 10,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 40,
    textShadowColor: 'rgba(22, 163, 74, 0.3)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
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
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 20,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '900',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    backgroundColor: COLORS.border,
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
    borderRadius: 20,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
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
    backgroundColor: COLORS.primaryLight,
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
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
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
    backgroundColor: COLORS.border,
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
    color: COLORS.primaryLight,
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
    backgroundColor: COLORS.primaryLight,
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
    backgroundColor: COLORS.background,
  },
  loginHeaderContainer: {
    height: 250,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
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
    color: COLORS.secondary,
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loginInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    marginBottom: 15,
    color: COLORS.secondary,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
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
  categoryContainer: {
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  categoryList: {
    paddingHorizontal: 16,
  },
  categoryTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 10,
    backgroundColor: COLORS.white,
  },
  activeCategoryTab: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryTabText: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: '500',
  },
  activeCategoryTabText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
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
    backgroundColor: COLORS.background,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: COLORS.border,
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
    backgroundColor: COLORS.background,
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
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  payBtnText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Profile Styles
  profileHeader: {
    backgroundColor: COLORS.white,
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  profileBackButton: {
    position: 'absolute',
    left: 20,
    top: 20,
    zIndex: 1,
  },
  profileInfoContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileAvatarText: {
    fontSize: 40,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: 4,
  },
  profilePhone: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  profileContent: {
    flex: 1,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: COLORS.white,
    marginBottom: 12,
  },
  quickActionItem: {
    alignItems: 'center',
    flex: 1,
  },
  quickActionIconBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  quickActionIcon: {
    fontSize: 24,
  },
  quickActionText: {
    fontSize: 12,
    color: COLORS.secondary,
    fontWeight: '600',
  },
  menuSection: {
    backgroundColor: COLORS.white,
    padding: 20,
  },
  menuSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    fontSize: 20,
    marginRight: 16,
    width: 24,
    textAlign: 'center',
  },
  menuItemTitle: {
    fontSize: 16,
    color: COLORS.secondary,
  },
  menuItemArrow: {
    fontSize: 20,
    color: COLORS.textLight,
  },
  // Bottom Nav Styles
  bottomNavContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    width: '90%',
    borderRadius: 35,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  activeNavIconContainer: {
    backgroundColor: '#86EFAC', // Darker green
    borderRadius: 20,
  },
  navIcon: {
    fontSize: 20,
    color: COLORS.textLight,
  },
  activeNavIcon: {
    color: COLORS.primary,
  },
  navLabel: {
    fontSize: 10,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  activeNavLabel: {
    color: COLORS.secondary,
    fontWeight: 'bold',
  },
  // Splash Screen Styles
  splashContainer: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashLogoText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: COLORS.white,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
  },
  splashTagline: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.white,
    textAlign: 'center',
    lineHeight: 36,
  },
});

export default App;