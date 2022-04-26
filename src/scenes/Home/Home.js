import React from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import {connect} from 'react-redux';

import NowPlaying from '../../components/NowPlaying';
import SearchBar from '../../components/SearchBar';
import SearchResults from '../../components/SearchResults';
import {requestFetchTrendingMovies} from '../../actions/movies';
import {searchMovies} from '../../net/config';
import {TouchableOpacity} from 'react-native-gesture-handler';

const tmdb = require('../../assets/static/TMDB.png');

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trendingMovies: [],
      text: '',
      numPages: 1,
      page: 1,
      total_results: 0,
      results: [],
      showResults: false,
      loading: true,
    };
  }

  componentDidMount() {
    this.props.requestFetchTrendingMovies();
  }
  UNSAFE_componentWillReceiveProps(newProps) {
    if (newProps && newProps.trendingMovies) {
      this.setState({
        trendingMovies: newProps.trendingMovies,
        loading: false,
      });
    }
  }

  searchForMovie = cb => {
    this.setState({loading: true});
    searchMovies(this.state.text, this.state.page)
      .then(result => {
        if (result && result) {
          const {total_pages, total_results, results} = result;
          this.setState({
            total_pages,
            total_results,
            results,
            showResults: true,
            loading: false,
          });
        }
      })
      .then(() => {
        if (cb) {
          cb();
        }
      });
  };

  onChangeText = text => {
    this.setState({text});
  };

  clearSearch = () => {
    this.setState({
      numPages: 1,
      page: 1,
      total_results: 0,
      results: [],
      showResults: false,
    });
  };

  renderMovieList() {
    if (this.state.showResults) {
      return this.renderSearchResults();
    }
    return this.renderTrendingMovies();
  }

  renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <Image source={tmdb} style={{height: 113, width: 104}} />
        <Text style={{fontSize: 16, color: '#fff'}}>Loading...</Text>
      </View>
    );
  }

  renderTrendingMovies() {
    if (this.state.loading) {
      return this.renderLoading();
    }
    return (
      <NowPlaying movies={this.state.trendingMovies} navigation={this.props} />
    );
  }

  renderSearchResults() {
    if (this.state.loading) {
      return this.renderLoading();
    }
    return (
      <SearchResults
        movies={this.state.results}
        page={this.state.page}
        totalPages={this.state.total_pages}
        totalResults={this.state.total_results}
        query={this.state.text}
        clearSearch={this.clearSearch}
      />
    );
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1, backgroundColor: '#000000'}}>
        <SearchBar
          onSearch={this.searchForMovie}
          onChangeText={this.onChangeText}
          value={this.state.text}
        />

        {this.renderMovieList()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(128,128,128, 0.5)',
  },
});

function mapDispatchToProps(dispatch) {
  return {
    requestFetchTrendingMovies: () => dispatch(requestFetchTrendingMovies()),
  };
}

function mapStateToProps(state) {
  return {
    trendingMovies: state.movies.trendingMovies,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
