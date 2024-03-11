import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getAuthorName, getBookDetails} from '../api';
import {
  ICON_TINT_COLOR,
  PRIMARY_BACKGROUND,
  SECONDARY_BACKGROUND,
  TERTIARY_BACKGROUND,
} from '../constants/colors';
import {BackArrow, FAVORITE_ICON, follow_select} from '../assets';
import {getFavoriteList, setFavoriteList} from '../localStorage/LocalStorage';

const BookDetailsScreen = ({route, navigation}) => {
  const [bookDetails, setBookDetails] = useState({});
  const [authorName, setAuthorName] = useState({});
  const [favoriteFlag, setFavoriteFlag] = useState(route.params.favorite_flag);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookDetails();
  }, []);
  const fetchBookDetails = async () => {
    let response = await getBookDetails(route.params.id);
    setBookDetails(response);
    let author_name = await getAuthorName(response.authors[0].author.key);
    setAuthorName(author_name);
    setLoading(false);
  };

  const onPressFavoriteFlag = async () => {
    if (favoriteFlag == false) {
      var oldFavoriteList = await getFavoriteList();
      var newFavoriteList = oldFavoriteList.map(item => {
        if (item?.key != route.params.bookData.key) {
          return item;
        }
      });
      newFavoriteList.push(route.params.bookData);
      var stringfy = await setFavoriteList(newFavoriteList);
      setFavoriteFlag(!favoriteFlag);
    } else {
      var oldFavoriteListForRemove = await getFavoriteList();
      var newFavoriteListForRemove = oldFavoriteListForRemove.map(item => {
        if (item) {
          if (item.key != route.params.id) return item;
        }
      });
      var stringfy = await setFavoriteList(newFavoriteListForRemove);
      setFavoriteFlag(!favoriteFlag);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            style={{width: 25, height: 25, tintColor: TERTIARY_BACKGROUND}}
            source={BackArrow}
          />
        </Pressable>
        <Pressable
          onPress={() => {
            onPressFavoriteFlag();
          }}>
          <Image
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
              tintColor: TERTIARY_BACKGROUND,
            }}
            source={favoriteFlag ? follow_select : FAVORITE_ICON}
          />
        </Pressable>
      </View>
      {!loading ? (
        <View style={styles.detailView}>
          {bookDetails?.covers?.length > 0 && (
            <Image
              style={styles.imageView}
              source={{
                uri: `https://covers.openlibrary.org/b/id/${bookDetails.covers[0]}-L.jpg`,
              }}
              resizeMode="cover"
            />
          )}
          <Text style={styles.bookTitle}>{bookDetails?.title}</Text>
          <Text style={styles.authorName}>
            {authorName ? authorName.name : ''}
          </Text>
          <ScrollView style={styles.descView}>
            <View
              style={{
                backgroundColor: SECONDARY_BACKGROUND,
                padding: 5,
              }}>
              <Text style={styles.description}>
                {bookDetails?.description?.value
                  ? bookDetails?.description?.value
                  : bookDetails?.description}
              </Text>
            </View>
          </ScrollView>
        </View>
      ) : (
        <View style={styles.detailView}>
          <Text>Loading...</Text>
        </View>
      )}
    </View>
  );
};

export default BookDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_BACKGROUND,
  },
  headerView: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  detailView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  imageView: {
    width: 150,
    height: 225,
  },
  bookTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  authorName: {
    fontSize: 14,
  },
  descView: {
    padding: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    height: 100,
    marginBottom: 20,
  },
  description: {
    fontSize: 14,
    letterSpacing: 0,
    fontWeight: '500',
    marginBottom: 15,
    textAlign: 'left',
  },
});
