import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const baseColor = '#E63571';

const Login = () => {
  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);

  const signUp = async () => {
    auth()
      .createUserWithEmailAndPassword(
        'john.doe@example.com',
        'SuperSecretPassword!',
      )
      .then(e => {
        //forward to homepage
        console.log(e, 'User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          //user email already exists  so try login
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          //show message  and state 0
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };
  const login = async () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(e => {
        console.log(e, 'User signed in!');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const signout = () => {
    auth()
      .signOut()
      .then(e => console.log(e, 'User signed out!'));
  };
  return (
    <View style={styles.container}>
      <View style={styles.upperbody}>
        <Text>もしもし</Text>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/kitty.png')}
            style={styles.image}
          />
        </View>
      </View>
      <View style={styles.lowerbody}>
        <View style={styles.inputField}>
          <View style={styles.iconContainer}>
            <Icon name={'account-outline'} size={30} color={'grey'} />
          </View>
          <TextInput
            placeholder={'Email ID'}
            style={styles.input}
            placeholderTextColor={'grey'}
            keyboardType={'email-address'}
          />
        </View>
        <View style={styles.inputField}>
          <View style={styles.iconContainer}>
            <Icon name={'lock'} size={30} color={'grey'} />
          </View>
          <TextInput
            placeholder={'Password'}
            style={styles.input}
            placeholderTextColor={'grey'}
          />
        </View>
        <TouchableOpacity onPress={() => login()} style={styles.btn}>
          <Text style={styles.btnText}>Login</Text>
          <Icon name={'arrow-right'} size={30} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.registerText}>Register Here </Text>
        </TouchableOpacity>
      </View>
      {/* /// body ends */}
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    backgroundColor: baseColor,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperbody: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 100,
    height: 100,
  },
  image: {
    width: null,
    height: null,
    resizeMode: 'cover',
    flex: 1,
  },
  lowerbody: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
  inputField: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: 'grey',
    width: '15%',
  },
  input: {
    // padding: 0,
    color: '#000',
    width: '85%',
    fontFamily: 'Nunito-Light',
    letterSpacing: 1.5,
    paddingLeft: 10,
    fontSize: 16,
  },
  btn: {
    padding: 10,
    backgroundColor: baseColor,
    marginBottom: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btnText: {
    fontFamily: 'Nunito-Bold',
    color: '#fff',
    marginRight: 20,
    fontSize: 20,
  },
  registerText: {
    fontFamily: 'Nunito-Bold',
    color: 'blue',
  },
});
