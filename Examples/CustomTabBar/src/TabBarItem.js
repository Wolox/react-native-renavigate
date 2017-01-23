import React from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';

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
  active: React.PropTypes.bool.isRequired,
  image: React.PropTypes.any.isRequired,
  label: React.PropTypes.string.isRequired,
  onTabItemPressed: React.PropTypes.func.isRequired
};
