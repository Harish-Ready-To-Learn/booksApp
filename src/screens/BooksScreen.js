/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {getBooksData, getBooksList} from '../api';
import {
  BACKGROUND,
  PRIMARY_BACKGROUND,
  SECONDARY_BACKGROUND,
} from '../constants/colors';
import {ARROW_ICON} from '../assets';
import BookListItem from '../components/BookListItem';

function BooksScreen({navigation}) {
  const [bookList, setBookList] = useState([]);
  useEffect(() => {
    fetchBooks();
  }, []);
  const fetchBooks = async () => {
    let response = await getBooksList();
    var temp_Arr = response.docs.map(item => {
      item['favorite_flag'] = false;
      return item;
    });
    setBookList(temp_Arr);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          data={bookList}
          keyExtractor={(item, index) => index}
          renderItem={({item, index}) => {
            return (
              <BookListItem
                bookData={item}
                title={item.title}
                authorName={item.author_name[0]}
                key_id={item.key}
                index={index}
                bookList={bookList}
                favorite_flag={item.favorite_flag}
              />
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_BACKGROUND,
  },
  bookItemContainer: {
    backgroundColor: SECONDARY_BACKGROUND,
    margin: 10,
    paddingLeft: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BooksScreen;
