import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Touchable,
} from 'react-native';
import {requestFetchDetailMovies} from '../../actions/detail';
import {fetchDetailMovies} from '../../net/config';
import Favorite from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

class MovieDetailScreen extends React.Component {
  constructor(props) {
    console.log('props', props);
    super(props);
    this.state = {
      poster_path: '',
      original_title: '',
      overview: '',
      textName: 'lehon',
      textHobby: 'main',
    };
  }

  _addFavorite = async data => {
    const addFavorite = [];
  addFavorite.push(data)

    // addFavorite = JSON.parse(AsyncStorage.getItem('favorite')) || [];
    // addFavorite.push(data);
    // console.log('add',addFavorite)
    AsyncStorage.setItem('favorite', JSON.stringify(addFavorite));
    // try {
    //   await AsyncStorage.setItem('favorite', JSON.stringify(addFavorite));

    // } catch (error) {
    //   console.log(error);
    // }
  };

  // getData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('favorite');
  //     console.log('value', value);
  //     if (value !== null) {
  //       // value previously stored
  //     }
  //   } catch (e) {
  //     // error reading value
  //   }
  // };

  componentDidMount() {
    // this.getData();

    requestFetchDetailMovies();

    fetchDetailMovies(this.props.route.params.slug)
      .then(result => {
        if (result && result) {
          this.setState({
            poster_path: result.poster_path,
            original_title: result.original_title,
            overview: result.overview,
          });
        }
      })
      .then(() => {
        if (cb) {
          cb();
        }
      });
  }

  render() {
    const source = {
      uri: `https://image.tmdb.org/t/p/w185/${this.state.poster_path}`,
    };
    const data = {
      original_title: this.state.original_title,
      poster_path: this.state.poster_path,
      overview: this.state.overview,
    };
    return (
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
});

function mapDispatchToProps(dispatch) {
  return {
    requestFetchDetailMovies: () => dispatch(requestFetchDetailMovies()),
  };
}

function mapStateToProps(state) {
  return {
    detailMovies: state.movies.detailMovies,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailScreen);
