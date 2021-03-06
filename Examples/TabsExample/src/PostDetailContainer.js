import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { actionCreators } from 'react-native-renavigate';

class PostDetailContainer extends Component {

  componentDidMount() {
    console.log('mount detail');
  }

  componentWillUnmount() {
    console.log('unmount detail');
  }

  backToList = () => {
    this.props.dispatch(actionCreators.pop());
  }

  replaceWithEmpty = () => {
    this.props.dispatch(actionCreators.replace.EMPTY_VIEW());
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
          { this.props.text }
        </Text>
        <TouchableOpacity
          onPress={this.replaceWithEmpty}
          style={{ margin: 30 }}
        >
          <Text style={{ fontWeight: 'bold' }}>Go to empty view</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

PostDetailContainer.propTypes = {
  text: React.PropTypes.string.isRequired
};

export default connect()(PostDetailContainer);
