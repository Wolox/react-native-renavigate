import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import { actionCreators } from 'react-native-renavigate';

class EmptyView extends Component {

  backToList = () => {
    this.props.dispatch(actionCreators.pop());
  }

  render() {
    return (
      <View style={{ marginTop: 60, backgroundColor: 'white' }}>
        <TouchableOpacity
          onPress={this.backToList}
          style={{ margin: 30 }}
        >
          <Text style={{ fontWeight: 'bold' }}>Go back to list</Text>
        </TouchableOpacity>
        <Text style={{ margin: 30 }}>
          This view is empty
        </Text>
      </View>
    );
  }
}

export default connect()(EmptyView);
