import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';

import { actionCreators } from './src/actions';

class PostListContainer extends Component {

  renderPostDetail = (post) => {
    this.props.dispatch(actionCreators.push.DETAIL(post));
  }

  render() {
    return (
      <ScrollView style={{ marginTop: 60 }}>
        {
          this.props.posts.map((post) => {
            return (
              <TouchableOpacity
                style={{ margin: 30, borderWidth: 1, borderColor: 'blue' }}
                key={post.id}
                onPress={() => this.renderPostDetail(post)}
              >
                <Text>{ post.title }</Text>
              </TouchableOpacity>
            );
          })
        }
      </ScrollView>
    );
  }
}

PostListContainer.propTypes = {
  posts: React.PropTypes.array.isRequired
};

export default connect()(PostListContainer);
