import React from 'react';
import { View } from 'react-native';

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
  activeTab: React.PropTypes.number.isRequired,
  goToPage: React.PropTypes.func.isRequired,
  hidden: React.PropTypes.bool,
  tabIcons: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      imageOff: React.PropTypes.any.isRequired,
      imageOn: React.PropTypes.any.isRequired
    }).isRequired
  ).isRequired,
  tabs: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
};
