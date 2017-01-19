import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { actionCreators as navigationActions } from 'react-native-renavigate';

import PostDetailContainer from './PostDetailContainer';
import PostListContainer from './PostListContainer';

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
          <Text>Back</Text>
        </TouchableOpacity>
      );
    },
    rightButton: () => {
      return <Text>FAV</Text>;
    },
    title: () => {
      return <Text>{ params.title }</Text>;
    }
  }),
  LIST: (params) => ({
    component: PostListContainer,
    params,
    navBarStyles: {
      backgroundColor: 'blue'
    }
  })
};
