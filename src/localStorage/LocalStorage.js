import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setFavoriteList(data) {
  var stringfy = '';
  try {
    console.log('DTARAR', data);
    stringfy = JSON.stringify(data);
    await AsyncStorage.setItem('favoriteList', stringfy);
  } catch (error) {
    console.log('error', error);
  }
  return stringfy ? stringfy : [];
}

export async function getFavoriteList() {
  var favoriteList = [];
  try {
    var data = await AsyncStorage.getItem('favoriteList');
    favoriteList = JSON.parse(data);
  } catch (error) {}
  return favoriteList ? favoriteList : [];
}
