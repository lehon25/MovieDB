import React from 'react';
import {StyleSheet, View, FlatList, Text, Image} from 'react-native';

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
    backgroundColor: 'grey',
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
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
  },
  backButton: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomNav: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    alignSelf: 'stretch',
  },
  left: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingLeft: 16,
    flexDirection: 'row',
  },
  right: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingRight: 16,
    flexDirection: 'row',
  },
});

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.resultRef = null;
  }

  flipPage = direction => {
    this.props.changePage(direction, () => {
      if (this.resultRef) {
        this.resultRef.scrollToOffset({x: 0, y: 0, animated: true});
      }
    });
  };

  renderMovieItem = ({item}) => {
    const {original_title, id, poster_path, name, original_name, overview} =
      item;
    let titleText = original_title ? original_title : name;
    titleText = titleText.length > 0 ? titleText : original_name;
    const source = {uri: `https://image.tmdb.org/t/p/w185/${poster_path}`};
    source.cache = 'force-cache';
    return (
      <View key={id} style={styles.movieContainer}>
        <Image source={source} style={styles.moviePoster} />
        <View style={styles.textContainer}>
          <Text style={styles.movieText}>{titleText}</Text>
          <Text style={styles.subText} numberOfLines={3}>
            {overview}
          </Text>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          ref={c => (this.resultRef = c)}
          keyExtractor={item => `${item.id}`}
          key={'SEARCH_RESULT_LIST'}
          style={styles.list}
          data={this.props.movies}
          renderItem={this.renderMovieItem}
          //   ListFooterComponent={this.renderPageNav}
        />
      </View>
    );
  }
}
