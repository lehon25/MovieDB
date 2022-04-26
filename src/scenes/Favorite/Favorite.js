import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
} from 'react-native';
import {requestFetchDetailMovies} from '../../actions/detail';
import Favorite from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const searchIcon = require('../../assets/static/Search.png');
class FavoriteScreen extends React.Component {
  constructor(props) {
    console.log('props', props);
    super(props);
    this.state = {
      poster_path: '',
      original_title: '',
      overview: '',
    };
  }

  getData = async () => {
    try {
      const value = JSON.parse(await AsyncStorage.getItem('favorite'));
      if (value !== '') {
        this.setState({
          poster_path: value.poster_path,
          original_title: value.original_title,
          overview: value.overview,
        });
      }
    } catch (e) {}
  };

  componentDidMount() {
    this.getData();

    requestFetchDetailMovies();
  }

  render() {
    const source = {
      uri: `https://image.tmdb.org/t/p/w185/${this.state.poster_path}`,
    };
    console.log('dfsf', this.state.original_title);
    return (
      <View style={{flex: 1, backgroundColor: '#000000'}}>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder={'Search Movies...'}
            placeholderTextColor={'#fff'}
            style={styles.searchInput}
            returnKeyType={'search'}
            clearButtonMode={'always'}
          />
          <Image source={searchIcon} style={styles.searchIcon} />
        </View>

        <View style={styles.movieContainer}>
          <Image source={source} style={styles.moviePoster} />

          <View style={styles.textContainer}>
            <Text style={styles.movieText}>{this.state.original_title}</Text>
            <Text style={styles.subText} numberOfLines={3}>
              {this.state.overview}
            </Text>
            <Pressable onPress={() => this._addFavorite(data)}>
              <Favorite name="favorite" size={30} color={'yellow'}></Favorite>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  movieContainer: {
    padding: 6,
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#2C3C52',
    alignItems: 'center',
    borderRadius: 10,
  },
  moviePoster: {
    height: 69,
    width: 46,
  },
  movieText: {
    fontSize: 16,
    color: '#fff',
  },
  textContainer: {
    flex: 1,
    padding: 8,
    flexDirection: 'column',
    alignSelf: 'stretch',
  },
  subText: {
    color: '#D3D3D3',
    fontSize: 14,
  },
  header: {
    padding: 16,
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
  },
  searchContainer: {
    flex: 1,
    backgroundColor: 'grey',
    flexDirection: 'row',
    maxHeight: 40,
    paddingLeft: 16,
    paddingRight: 16,
    margin: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  searchIcon: {
    width: 22,
    height: 21,
    marginLeft: 10,
  },
});

export default FavoriteScreen;
