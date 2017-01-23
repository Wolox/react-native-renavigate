import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { actionCreators as navigationActions } from 'react-native-renavigate';

import PostDetailContainer from './PostDetailContainer';
import PostListContainer from './PostListContainer';

const navButtonStyle = { padding: 5, color: 'blue' };
const titleStyle = { fontWeight: 'bold' };

export default {
  DETAIL: (params) => ({
    component: PostDetailContainer,
    params,
    leftButton: (dispatch) => {
      const goBack = () => {
        dispatch(navigationActions.pop());
      };
      return (
        <TouchableOpacity onPress={goBack}>
          <Text style={navButtonStyle}>Back</Text>
        </TouchableOpacity>
      );
    },
    rightButton: () => {
      return <Text style={navButtonStyle}>FAV</Text>;
    },
    title: () => {
      return <Text style={[navButtonStyle, titleStyle]}>{ params.title }</Text>;
    }
  }),
  LIST: (params) => ({
    component: PostListContainer,
    params,
    title: () => {
      return <Text style={[titleStyle, navButtonStyle]}>YOUR POSTS</Text>;
    }
  })
};
