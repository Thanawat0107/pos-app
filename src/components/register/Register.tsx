import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { styles } from './Register.Style';
import { useAppNavigation } from '../../hooks/useAppNavigation';

const Register = () => {
    const navigation = useAppNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const phoneInputRef = useRef(null);
  const PhoneInputComponent = PhoneInput as unknown as React.ComponentType<any>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require("../../../assets/images/logo-noodle.jpg")} style={styles.logo} />

      <Text style={styles.title}>Create an account</Text>
      <Text style={styles.subtitle}>Connect with your friends today!</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        placeholderTextColor="#aaa"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={styles.input}
        placeholder="example@gmail.com"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <PhoneInputComponent
        ref={phoneInputRef}
        defaultValue={phone}
        defaultCode="EG"
        layout="first"
        onChangeFormattedText={(text: string) => {
          setPhone(text);
        }}
        containerStyle={styles.phoneContainer}
        textContainerStyle={styles.phoneTextContainer}
        textInputProps={{ placeholder: "XXX XXX XXXX" }}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Enter your password"
          placeholderTextColor="#aaa"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <MaterialIcons
            name={showPassword ? "visibility-off" : "visibility"}
            size={24}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.signupButton}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or with</Text>

      <View style={styles.socialButtons}>
        <FontAwesome name="facebook" size={32} color="#3b5998" />
        <FontAwesome name="google" size={32} color="#DB4437" />
      </View>

      <View style={styles.loginLinkContainer}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.push("Login")}>
          <Text style={styles.loginText}>Log in</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Register;
