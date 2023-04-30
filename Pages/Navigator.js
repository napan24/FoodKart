import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import Home from "./Home";
import About from "./About";
import Order from "./Order"
import Login from "./Login"
export default function Navigator() {
    const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'home', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},
    { key: 'order', title: 'order', focusedIcon: 'album' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: Home,
    order: Order,
  });
  return (
    <>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </>
  );
}
