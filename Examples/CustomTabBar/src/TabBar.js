import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import TabBarItem from './TabBarItem';
import styles from './TabBar.styles';

export default function TabBar ({ style, tabIcons, activeTab, goToPage, tabs, hidden }) {
  return hidden ? null : (
    <View style={[style, styles.tabs]}>
      {
        tabs.map((tab, i) => {
          const tabImage = activeTab === i
            ? tabIcons[i].imageOn
            : tabIcons[i].imageOff;

          return (
            <TabBarItem
              key={tab}
              active={activeTab === i}
              label={tab}
              onTabItemPressed={() => goToPage(i)}
              image={tabImage}
            />
          );
        })
      }
    </View>
  );
}

TabBar.propTypes = {
  activeTab: PropTypes.number.isRequired,
  goToPage: PropTypes.func.isRequired,
  hidden: PropTypes.bool,
  tabIcons: PropTypes.arrayOf(
    PropTypes.shape({
      imageOff: PropTypes.any.isRequired,
      imageOn: PropTypes.any.isRequired
    }).isRequired
  ).isRequired,
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired
};
