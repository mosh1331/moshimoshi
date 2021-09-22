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

const dummyFeed = [
  {
    id: '14124user',
    time: new Date(),
    name: 'Mosh',
    title: 'hello world !! ,moshi moshi',
    dp: 'https://images.pexels.com/photos/3411134/pexels-photo-3411134.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    likes: 5,
    images: [
      {
        id: 1,
        image:
          'https://images.pexels.com/photos/42415/pexels-photo-42415.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      },
      {
        id: 2,
        image:
          'https://images.pexels.com/photos/264905/pexels-photo-264905.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      },
      {
        id: 3,
        image:
          'https://images.pexels.com/photos/163077/mario-yoschi-figures-funny-163077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      },
    ],
  },
  {
    id: '14124usser',
    time: new Date(),
    name: 'gabriel',
    title: 'hello world !!  moshi',
    dp: 'https://images.pexels.com/photos/6898855/pexels-photo-6898855.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    likes: 7,
  },
  {
    id: '14s124usser',
    time: new Date(),
    name: 'gabriel',
    title: 'hello world !!  moshi',
    dp: 'https://images.pexels.com/photos/6898855/pexels-photo-6898855.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    likes: 8,
  },
  {
    id: '14s124ussser',
    time: new Date(),
    name: 'Dsouza',
    title: 'hello world !!  moshi',
    dp: 'https://images.pexels.com/photos/3760790/pexels-photo-3760790.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    likes: 8,
  },
];
const baseColor = '#E63571';

const Feed = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={baseColor} />

      <View style={styles.header}>
        <View style={styles.dp}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://images.pexels.com/photos/5952647/pexels-photo-5952647.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            }}
          />
        </View>
        <View style={styles.search}></View>
      </View>
      <View style={styles.feed}>
        <Text style={styles.subhead}>Showing latest</Text>
        <ScrollView>
          {dummyFeed.map(i => (
            <View style={styles.post} key={i.id}>
              <View style={styles.posttop}>
                <View style={styles.rowContainer}>
                  <View style={styles.postDp}>
                    <Image source={{uri: i.dp}} style={styles.image} />
                  </View>
                  <View>
                    <Text style={styles.username}>{i.name}</Text>
                    <Text style={styles.posttime}>2 mins ago</Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <Icon name={'dots-horizontal'} size={30} color={'#ccc'} />
                </TouchableOpacity>
              </View>
              <Text style={styles.text}>{i.title}</Text>
              {i.images && i.images.length > 0 ? (
                <View style={styles.postImages}>
                  {i.images.map(i => (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.postImage}
                      key={i.id}>
                      <Image source={{uri: i.image}} style={styles.image} />
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <></>
              )}
              <View
                style={[
                  styles.postLeftBtns,
                  {justifyContent: 'space-between'},
                ]}>
                <View style={styles.postLeftBtns}>
                  <TouchableOpacity style={styles.iconContainer}>
                    <Icon name={'paw'} size={18} color={'grey'} />
                    <Text
                      style={{
                        fontFamily: 'Nunito-Bold',
                        fontSize: 12,
                        marginLeft: 2,
                      }}>
                      {i.likes}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.iconContainer, {marginLeft: 20}]}>
                    <Icon name={'comment-quote'} size={18} color={'grey'} />
                    <Text style={styles.PostbtnText}>{i.likes}</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity>
                  <Icon name={'export-variant'} size={18} color={'grey'} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Feed;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },
  header: {
    backgroundColor: baseColor,
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  search: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '90%',
  },
  feed: {
    flex: 9,
    backgroundColor: '#fff',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    marginTop: -20,
    padding: 20,
  },
  subhead: {
    fontFamily: 'Nunito-Bold',
    marginBottom: 20,
  },
  post: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
  },
  postDp: {
    width: 40,
    height: 40,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
  },
  btn: {
    padding: 20,
    backgroundColor: 'tomato',
    marginBottom: 20,
  },
  image: {
    width: null,
    height: null,
    resizeMode: 'cover',
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  posttop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  username: {
    fontFamily: 'Nunito-Bold',
    textTransform: 'capitalize',
    fontSize: 13,
  },
  text: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
  },
  posttime: {
    fontFamily: 'Nunito-Regular',
    fontSize: 10,
  },
  postImages: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  postImage: {
    width: '32%',
    height: 150,
    marginBottom: 5,
  },
  PostbtnText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 12,
    marginLeft: 2,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postLeftBtns: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  dp: {
    width: 50,
    height: 50,
    borderRadius: 10,
    overflow: 'hidden',
  },
});
