import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import ChaIn from "../../assets/images/Cha_in.svg";
import ChaOut from "../../assets/images/Cha_out.svg";
import HomeIn from "../../assets/images/Home_in.svg";
import HomeOut from "../../assets/images/Home_out.svg";
import MypageIn from "../../assets/images/Mypage_in.svg";
import MypageOut from "../../assets/images/Mypage_out.svg";
import { colors, typography } from "../theme";

const homeBackground = colors.gray01;
const tabIconSize = 32;
const topShadowOpacities = [0.01, 0.02, 0.03, 0.04, 0.055, 0.07];
const bottomShadowOpacities = [0.05, 0.04, 0.03, 0.02, 0.01];

const tabs = [
  {
    key: "character",
    label: "캐릭터",
    ActiveIcon: ChaIn,
    InactiveIcon: ChaOut,
  },
  {
    key: "home",
    label: "홈",
    ActiveIcon: HomeIn,
    InactiveIcon: HomeOut,
  },
  {
    key: "myPage",
    label: "마이페이지",
    ActiveIcon: MypageIn,
    InactiveIcon: MypageOut,
  },
];

export function MainTabBar({ activeTab, onTabPress }) {
  return (
    <View style={styles.tabBarWrap}>
      <View pointerEvents="none" style={[styles.tabBarShadow, styles.topShadow]}>
        {topShadowOpacities.map((opacity) => (
          <View key={opacity} style={[styles.shadowStrip, { opacity }]} />
        ))}
      </View>
      <View style={styles.tabBar}>
        {tabs.map(({ key, label, ActiveIcon, InactiveIcon }) => {
          const selected = activeTab === key;
          const Icon = selected ? ActiveIcon : InactiveIcon;

          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected }}
              key={key}
              onPress={() => onTabPress?.(key)}
              style={styles.tabItem}
            >
              <Icon height={tabIconSize} width={tabIconSize} />
              <Text style={[styles.tabLabel, selected && styles.tabLabelOn]}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <View
        pointerEvents="none"
        style={[styles.tabBarShadow, styles.bottomShadow]}
      >
        {bottomShadowOpacities.map((opacity) => (
          <View key={opacity} style={[styles.shadowStrip, { opacity }]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarWrap: {
    alignItems: "center",
    backgroundColor: homeBackground,
    bottom: 26,
    left: 0,
    position: "absolute",
    right: 0,
  },
  tabBarShadow: {
    position: "absolute",
    width: "100%",
    height: 12,
    overflow: "hidden",
  },
  topShadow: {
    top: -12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  bottomShadow: {
    top: 111,
  },
  shadowStrip: {
    flex: 1,
    backgroundColor: "#B9C8D0",
  },
  tabBar: {
    width: "100%",
    paddingTop: 16,
    paddingRight: 38,
    paddingBottom: 24,
    paddingLeft: 38,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 22,
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  tabItem: {
    display: "flex",
    width: 80,
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    flexShrink: 0,
  },
  tabLabel: {
    ...typography.caption02M,
    color: colors.gray07,
    textAlign: "center",
  },
  tabLabelOn: {
    color: colors.main,
  },
});
