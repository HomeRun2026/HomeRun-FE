import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import ChaIn from "../../assets/images/Cha_in.svg";
import ChaOut from "../../assets/images/Cha_out.svg";
import HomeIn from "../../assets/images/Home_in.svg";
import HomeOut from "../../assets/images/Home_out.svg";
import MypageIn from "../../assets/images/Mypage_in.svg";
import MypageOut from "../../assets/images/Mypage_out.svg";
import BellIcon from "../../assets/images/icon_bell.svg";
import HomerunLogo from "../../assets/images/homerun_logo.svg";
import { colors, layout, typography } from "../theme";

const homeBackground = "#FCFDFE";
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

export function HomeScreen() {
  const [activeTab, setActiveTab] = useState("home");
  const activeTitle = useMemo(
    () => tabs.find((tab) => tab.key === activeTab)?.label,
    [activeTab]
  );

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" backgroundColor={homeBackground} />
      <View style={styles.phone}>
        <View style={styles.content}>
          {activeTab === "home" ? (
            <>
              <View style={styles.topSpacer} />
              <View style={styles.header}>
                <HomerunLogo accessibilityLabel="홈런" height={39} width={102} />
                <Pressable
                  accessibilityLabel="알림"
                  accessibilityRole="button"
                  hitSlop={12}
                  style={styles.bellButton}
                >
                  <BellIcon height={31} width={36} />
                </Pressable>
              </View>
            </>
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderTitle}>{activeTitle}</Text>
            </View>
          )}
        </View>

        <View style={styles.tabBarWrap}>
          <View pointerEvents="none" style={[styles.tabBarShadow, styles.topShadow]}>
            {topShadowOpacities.map((opacity) => (
              <View
                key={opacity}
                style={[styles.shadowStrip, { opacity }]}
              />
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
                  onPress={() => setActiveTab(key)}
                  style={styles.tabItem}
                >
                  <Icon height={42} width={42} />
                  <Text
                    style={[styles.tabLabel, selected && styles.tabLabelOn]}
                  >
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
              <View
                key={opacity}
                style={[styles.shadowStrip, { opacity }]}
              />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.gray03,
  },
  phone: {
    flex: 1,
    alignSelf: "center",
    width: "100%",
    maxWidth: layout.maxPhoneWidth,
    backgroundColor: homeBackground,
  },
  content: {
    flex: 1,
    backgroundColor: homeBackground,
  },
  topSpacer: {
    height: 40,
  },
  header: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 360,
    height: 54,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: homeBackground,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray03,
  },
  bellButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderTitle: {
    ...typography.head01Sb,
    color: colors.gray09,
  },
  tabBarWrap: {
    alignItems: "center",
    paddingBottom: 48,
    backgroundColor: homeBackground,
    position: "relative",
  },
  tabBarShadow: {
    position: "absolute",
    width: "100%",
    maxWidth: 360,
    height: 12,
    overflow: "hidden",
  },
  topShadow: {
    top: -12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  bottomShadow: {
    top: 101,
  },
  shadowStrip: {
    flex: 1,
    backgroundColor: "#B9C8D0",
  },
  tabBar: {
    width: "100%",
    maxWidth: 360,
    paddingTop: 16,
    paddingRight: 44,
    paddingBottom: 24,
    paddingLeft: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 28,
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  tabItem: {
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
