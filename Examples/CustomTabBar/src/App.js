import React from 'react';
import { TabsContainer } from 'react-native-renavigate';

import routeDefs from './routes';
import TabBar from './TabBar';

import Tab1OnImg from './assets/tabbar_dashboard_on.png';
import Tab1OffImg from './assets/tabbar_dashboard_off.png';
import Tab2OnImg from './assets/tabbar_customer_support_on.png';
import Tab2OffImage from './assets/tabbar_customer_support_off.png';
import Tab3OnImg from './assets/tabbar_energy_advisor_on.png';
import Tab3OffImg from './assets/tabbar_energy_advisor_off.png';

/* eslint-disable max-len */
const posts = [
  {
    id: 1,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    title: 'Lorem Ipsum'
  },
  {
    id: 2,
    text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
    title: 'de Finibus Bonorum et Malorum 1.10.32'
  },
  {
    id: 3,
    text: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
    title: 'de Finibus Bonorum et Malorum 1.10.33'
  }
];
/* eslint-enable max-len */

const TABS = [
  {
    label: 'Tab 1',
    initialRoute: routeDefs.LIST({ posts }),
    imageOff: Tab1OffImg,
    imageOn: Tab1OnImg
  },
  {
    label: 'Tab 2',
    initialRoute: routeDefs.LIST({ posts }),
    imageOff: Tab2OffImage,
    imageOn: Tab2OnImg
  },
  {
    label: 'Tab 3',
    initialRoute: routeDefs.LIST({ posts }),
    imageOff: Tab3OffImg,
    imageOn: Tab3OnImg
  }
];

export default function app() {
  const scrollableTabsProps = {
    tabBarPosition: 'bottom',
    locked: true,
    contentProps: { keyboardShouldPersistTaps: 'always' },
    prerenderingSiblingsNumber: 1,
    scrollWithoutAnimation: true,
    renderTabBar: (props) => {
      return (
        <TabBar
          tabIcons={TABS.map((tab) => ({ imageOff: tab.imageOff, imageOn: tab.imageOn }))}
          {...props}
        />
      );
    }
  };

  return (
    <TabsContainer
      tabs={TABS}
      routeDefs={routeDefs}
      initialTab={1}
      tabsComponentProps={scrollableTabsProps}
    />
  );
}
