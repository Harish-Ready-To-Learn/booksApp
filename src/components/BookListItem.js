import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {ARROW_ICON} from '../assets';
import {SECONDARY_BACKGROUND} from '../constants/colors';
import {useNavigation} from '@react-navigation/core';

const BookListItem = ({
  title,
  authorName,
  key_id,
  index,
  bookList,
  favorite_flag,
  bookData,
}) => {
  const navigation = useNavigation();
  return (
    <View
      style={[
        styles.bookItemContainer,
        {marginBottom: bookList?.length - 1 == index ? 60 : 0},
      ]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flex: 1}}>
          <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
            {title}
          </Text>
          {authorName && (
            <Text
              style={{
                color: '#fff',
                marginTop: 5,
                fontSize: 10,
                fontWeight: '400',
              }}>
              {authorName}
            </Text>
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('BookDetailsScreen', {
              id: key_id,
              favorite_flag: favorite_flag,
              bookData: bookData,
            });
          }}>
          <Image style={{width: 50, height: 50}} source={ARROW_ICON} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookListItem;

const styles = StyleSheet.create({
  bookItemContainer: {
    backgroundColor: SECONDARY_BACKGROUND,
    margin: 10,
    paddingLeft: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
