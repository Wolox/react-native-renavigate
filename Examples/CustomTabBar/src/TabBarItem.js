import React from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './TabBarItem.styles';

export default function TabBarItem({ active, label, image, onTabItemPressed }) {
  return (
    <TouchableOpacity
      onPress={onTabItemPressed}
      style={styles.tab}
    >
      <Image
        source={image}
        style={styles.tabImage}
      />
      <Text style={{ color: active ? '#40C4FE' : 'rgba(0, 0, 0, 0.38)' }}>
        { label }
      </Text>
    </TouchableOpacity>
  );
}

TabBarItem.propTypes = {
  active: PropTypes.bool.isRequired,
  image: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
  onTabItemPressed: PropTypes.func.isRequired
};
