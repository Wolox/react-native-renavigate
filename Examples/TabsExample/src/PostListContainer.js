import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { actionCreators } from 'react-native-renavigate';
import PropTypes from 'prop-types';

class PostListContainer extends Component {

  renderPostDetail = (post) => {
    this.props.dispatch(actionCreators.push.DETAIL(post));
  }

  changeTab = (index) => {
    this.props.dispatch(actionCreators.tabChanged(index));
  }

  render() {
    return (
      <ScrollView style={{ marginTop: 60, backgroundColor: 'white' }}>
        {
          this.props.posts.map((post, idx) => {
            return (
              <View key={idx}>
                <TouchableOpacity
                  style={{ margin: 15, borderWidth: 1, borderColor: 'blue', padding: 8, borderRadius: 4 }}
                  key={post.id}
                  onPress={() => this.renderPostDetail(post)}
                >
                  <Text>{ post.title }</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.changeTab(idx)}>
                  <Text>TAB: { idx }</Text>
                </TouchableOpacity>
              </View>
            );
          })
        }
      </ScrollView>
    );
  }
}

PostListContainer.propTypes = {
  posts: PropTypes.array.isRequired
};

export default connect()(PostListContainer);
