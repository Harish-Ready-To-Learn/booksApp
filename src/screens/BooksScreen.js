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
  TextInput,
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
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

function BooksScreen({navigation}) {
  const [searchText, setSearchText] = useState('');
  const [bookList, setBookList] = useState([]);
  const [dummyArr, setDummyArr] = useState(Array.from(Array(50).keys()));
  const [loading, setLoading] = useState(true);
  const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

  useEffect(() => {
    fetchBooks('harry');
  }, []);
  const fetchBooks = async text => {
    setLoading(true);
    let response = await getBooksList(text);
    var temp_Arr = response.docs.map(item => {
      item['favorite_flag'] = false;
      return item;
    });
    setBookList(temp_Arr);
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchView}>
        <TextInput
          placeholder="Enter a word"
          onChangeText={setSearchText}
          style={styles.searchTextInput}
        />
        <TouchableOpacity
          onPress={() => {
            fetchBooks(searchText);
          }}>
          <Text>Search</Text>
        </TouchableOpacity>
      </View>
      {!loading && bookList.length > 0 ? (
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
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>
            No favorite List
          </Text>
        </View>
      )}
      {loading && (
        <>
          <FlatList
            data={dummyArr}
            renderItem={() => {
              return (
                <View
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ShimmerPlaceHolder
                    style={{
                      width: '95%',
                      height: 50,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 15,
                      alignItems: 'center',
                      borderRadius: 10,
                    }}></ShimmerPlaceHolder>
                </View>
              );
            }}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_BACKGROUND,
  },
  searchView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#fff',
    margin: 10,
    paddingHorizontal: 10,
  },
  searchTextInput: {
    flex: 1,
    height: 50,
  },
  searchButton: {},
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
