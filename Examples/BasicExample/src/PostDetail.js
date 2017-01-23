import React, { Component } from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { actionCreators } from 'react-native-renavigate';

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    backgroundColor: 'white'
  },
  goBackButton: {
    padding: 30,
    fontWeight: 'bold'
  },
  postContent: {
    margin: 30
  }
});


class PostDetail extends Component {

  backToList = () => {
    this.props.dispatch(actionCreators.pop());
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.backToList}>
          <Text style={styles.goBackButton}>Go back to list</Text>
        </TouchableOpacity>
        <Text style={styles.postContent}>
          { this.props.post.text }
        </Text>
      </View>
    );
  }
}

PostDetail.propTypes = {
  post: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    text: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired
  }).isRequired
};

export default connect()(PostDetail);
