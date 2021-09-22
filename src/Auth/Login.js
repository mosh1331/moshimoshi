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
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader from '../assets/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseColor = '#E63571';
// const baseColor = '#888a85';

const Login = ({navigation}) => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [logging, setLogging] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);
  const [validmail, setvalidmail] = useState(false);

  useEffect(() => {
    if (email.length > 0 && password.length > 0 && validmail) {
      setDisableBtn(false);
    } else {
      setDisableBtn(true);
    }
  }, [email, password, validmail]);

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
    setLogging(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(e => {
        console.log(e, 'User signed in!');
        setLogging(false);
        saveUser(e);
      })
      .catch(error => {
        setLogging(false);
        Alert.alert(error.message);

        console.error(error);
      });
  };

  const saveUser = async user => {
    console.log(user, 'user');
    //set in async
    const jsonValue = JSON.stringify(user);
    await AsyncStorage.setItem('@user', jsonValue).then(() =>
      navigation.reset({
        index: 0,
        routes: [{name: 'Feed'}],
      }),
    );
  };

  const signout = () => {
    auth()
      .signOut()
      .then(e => console.log(e, 'User signed out!'));
  };

  const mailValidator = () => {
    {
      let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (email.match(regexEmail)) {
        setvalidmail(true);
      } else {
        setvalidmail(false);
      }
    }
  };

  const formCopulate = async (text, type) => {
    if (type === 'mail') {
      setemail(text);
    } else {
      setpassword(text);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={baseColor} />
      <View style={styles.upperbody}>
        <Text style={{color: '#fff', fontWeight: 'bold'}}>もしもし</Text>
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
            onChangeText={e => formCopulate(e, 'mail')}
            onBlur={() => mailValidator()}
            onSubmitEditing={() => mailValidator()}
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
            // secureTextEntry={true}
            secureTextEntry
            onChangeText={e => formCopulate(e, 'password')}
          />
        </View>

        {logging ? (
          <View style={styles.loading}>
            <Loader />
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => login()}
            disabled={disableBtn}
            style={[styles.btn, disableBtn && {backgroundColor: 'grey'}]}>
            <Text style={styles.btnText}>Login</Text>
            <Icon name={'arrow-right'} size={30} color={'white'} />
          </TouchableOpacity>
        )}
        <TouchableOpacity>
          <Text style={styles.registerText}>Register Here </Text>
        </TouchableOpacity>
        <View style={styles.centered}>
          <Text style={styles.text}>-- Or login with --</Text>
        </View>
        <View style={[styles.centered, {flexDirection: 'row'}]}>
          <TouchableOpacity style={styles.socialIcon}>
            <Image
              source={require('../assets/images/search.png')}
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <Image
              source={require('../assets/images/facebook.png')}
              style={styles.image}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialIcon}>
            <Image
              source={require('../assets/images/twitter.png')}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
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
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  btn: {
    backgroundColor: baseColor,
    marginBottom: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 50,
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
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Nunito-Regular',
    marginBottom: 20,
  },
  socialIcon: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
  },
});
