import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import ChaIn from "../../assets/images/Cha_in.svg";
import ChaOut from "../../assets/images/Cha_out.svg";
import HomeIn from "../../assets/images/Home_in.svg";
import HomeOut from "../../assets/images/Home_out.svg";
import MypageIn from "../../assets/images/Mypage_in.svg";
import MypageOut from "../../assets/images/Mypage_out.svg";
import { Header } from "../components";
import { MyPageScreen } from "./MyPageScreen";
import { colors, layout, typography } from "../theme";

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

export function HomeScreen({
  notificationCount = 0,
  initialTab = "home",
  onOpenAccountInfo,
  onOpenPassword,
  onOpenNotifications,
  onOpenNotices,
  onOpenContact,
  onOpenPrivacy,
  onOpenTerms,
}) {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" backgroundColor={homeBackground} />
      <View style={styles.phone}>
        <View style={styles.content}>
          {activeTab === "myPage" ? null : (
            <Header
              type="main"
              notificationCount={notificationCount}
              onBellPress={onOpenNotifications}
            />
          )}

          {activeTab === "myPage" ? (
            <MyPageScreen
              embedded
              onProfilePress={onOpenAccountInfo}
              onOpenNotifications={onOpenNotifications}
              onOpenPassword={onOpenPassword}
              onOpenContact={onOpenContact}
              onOpenNotices={onOpenNotices}
              onOpenPrivacy={onOpenPrivacy}
              onOpenTerms={onOpenTerms}
              notificationCount={notificationCount}
            />
          ) : activeTab === "character" ? (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderTitle}>캐릭터</Text>
            </View>
          ) : null}
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
                  <Icon height={tabIconSize} width={tabIconSize} />
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
    backgroundColor: homeBackground,
    bottom: 26,
    left: 0,
    position: "absolute",
    right: 0,
  },
  tabBarShadow: {
    position: "absolute",
    width: "100%",
    maxWidth: layout.maxPhoneWidth,
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
    maxWidth: layout.maxPhoneWidth,
    paddingTop: 16,
    paddingRight: 38,
    paddingBottom: 24,
    paddingLeft: 38,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
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
