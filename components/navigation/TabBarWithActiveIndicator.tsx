/**
 * Custom tab bar with a thick green line above the active tab
 */

import { theme } from '@/constants/theme';
import { BottomTabBar, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Dimensions, StyleSheet, View } from 'react-native';

const TAB_COUNT = 5;
const INDICATOR_HEIGHT = 3;

export function TabBarWithActiveIndicator(props: BottomTabBarProps) {
  const { state } = props;
  const activeIndex = state.index;
  const { width } = Dimensions.get('window');
  const tabWidth = width / TAB_COUNT;

  return (
    <View style={styles.container}>
      {/* Green active indicator line above the active tab */}
      <View style={styles.indicatorRow}>
        <View
          style={[
            styles.activeIndicator,
            {
              width: tabWidth,
              left: activeIndex * tabWidth,
            },
          ]}
        />
      </View>
      {/* Default tab bar */}
      <BottomTabBar {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
  },
  indicatorRow: {
    height: INDICATOR_HEIGHT,
    width: '100%',
    position: 'relative',
    backgroundColor: 'transparent',
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    height: INDICATOR_HEIGHT,
    backgroundColor: theme.colors.primary[500],
  },
});
