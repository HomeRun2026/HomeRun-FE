import React, { useState } from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import ArrowRightIcon from "../../assets/images/R.svg";
import ChangeIcon from "../../public/images/change.svg";
import LoadIcon from "../../public/images/load.svg";
import SettingIcon from "../../public/images/setting.svg";
import { HomeTopSection, MainTabBar } from "../components";
import { CustomAlarmScreen } from "./CustomAlarmScreen";
import { MyPageScreen } from "./MyPageScreen";
import { colors, layout, typography } from "../theme";

const homeBackground = colors.gray01;

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
  onTabPress,
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeHomeTab, setActiveHomeTab] = useState("firstLast");

  const handleTabPress = (tabKey) => {
    if (onTabPress?.(tabKey)) {
      return;
    }

    setActiveTab(tabKey);
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" backgroundColor={homeBackground} />
      <View style={styles.phone}>
        <View style={styles.content}>
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
            <>
              <HomeTopSection
                notificationCount={notificationCount}
                onBellPress={onOpenNotifications}
                showAddress={false}
                showTabs={false}
              />
              <View style={styles.placeholder}>
                <Text style={styles.placeholderTitle}>캐릭터</Text>
              </View>
            </>
          ) : activeTab === "home" ? (
            <HomeDashboard
              activeHomeTab={activeHomeTab}
              notificationCount={notificationCount}
              onBellPress={onOpenNotifications}
              onHomeTabPress={setActiveHomeTab}
            />
          ) : null}
        </View>

        <MainTabBar activeTab={activeTab} onTabPress={handleTabPress} />
      </View>
    </View>
  );
}

function HomeDashboard({
  activeHomeTab,
  notificationCount,
  onBellPress,
  onHomeTabPress,
}) {
  return (
    <>
      <HomeTopSection
        activeTab={activeHomeTab}
        notificationCount={notificationCount}
        onBellPress={onBellPress}
        onTabPress={onHomeTabPress}
      />
      {activeHomeTab === "customAlarm" ? (
        <CustomAlarmScreen />
      ) : (
        <FirstLastRouteScreen />
      )}
    </>
  );
}

function FirstLastRouteScreen() {
  const [isLastRouteFirst, setIsLastRouteFirst] = useState(false);

  return (
    <View style={styles.homeBody}>
      <View style={styles.routeCard}>
        <View style={styles.routeCardPanel}>
          <View style={styles.routeCardTop}>
            <View style={styles.routeTitleGroup}>
              <Text
                style={[
                  styles.routeTitle,
                  isLastRouteFirst && styles.routeTitleMuted,
                ]}
              >
                첫차
              </Text>
              <Pressable
                accessibilityLabel="첫차 막차 전환"
                accessibilityRole="button"
                hitSlop={8}
                onPress={() => setIsLastRouteFirst((current) => !current)}
              >
                <ChangeIcon height={16} width={16} />
              </Pressable>
              <Text
                style={[
                  styles.routeTitleMuted,
                  isLastRouteFirst && styles.routeTitle,
                ]}
              >
                막차
              </Text>
            </View>
            <Pressable accessibilityRole="button" style={styles.resetButton}>
              <LoadIcon height={16} width={16} />
              <Text style={styles.resetText}>경로 재설정</Text>
            </Pressable>
          </View>

          <View style={styles.routeSectionDivider} />

          <View style={styles.routeEmpty}>
            <Text style={styles.routeEmptyText}>버스 경로를 설정해보세요</Text>
          </View>
        </View>

        <Pressable accessibilityRole="button" style={styles.routeAction}>
          <Text style={styles.routeActionText}>경로 설정하기</Text>
          <ArrowRightIcon height={24} style={styles.routeActionIcon} width={24} />
        </Pressable>
      </View>

      <View style={styles.noticeRow}>
        <View style={styles.characterBadge}>
          <View style={styles.characterCircle}>
            <Text style={styles.characterText}>캐릭터1</Text>
          </View>
        </View>
        <View style={styles.noticeBubble}>
          <Text style={styles.noticeText}>출발 전 미리 알림을 설정할 수 있어요!</Text>
          <SettingIcon height={20} width={20} />
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
    width: "100%",
    backgroundColor: homeBackground,
    ...Platform.select({
      web: {
        alignSelf: "center",
        maxWidth: layout.mobileFrameWidth,
      },
    }),
  },
  content: {
    flex: 1,
    backgroundColor: homeBackground,
  },
  homeBody: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 11,
    paddingBottom: 142,
  },
  routeCard: {
    alignSelf: "center",
    width: 328,
    flexDirection: "column",
    alignItems: "flex-start",
    overflow: "hidden",
    borderRadius: 16,
    backgroundColor: colors.white,
    shadowColor: "#3D445E",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.02,
    shadowRadius: 12,
    elevation: 1,
  },
  routeCardPanel: {
    alignSelf: "stretch",
    padding: 16,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 12,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: colors.gray04,
    backgroundColor: colors.white,
  },
  routeCardTop: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  routeSectionDivider: {
    height: 1,
    alignSelf: "stretch",
    backgroundColor: colors.gray03,
  },
  routeTitleGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  routeTitle: {
    fontFamily: "SUIT",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 22.4,
    letterSpacing: -0.16,
    color: colors.gray08,
  },
  routeTitleMuted: {
    fontFamily: "SUIT",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 22.4,
    letterSpacing: -0.16,
    color: colors.gray05,
  },
  resetButton: {
    height: 32,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderWidth: 1,
    borderColor: colors.gray04,
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  resetText: {
    fontFamily: "SUIT",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 19.6,
    letterSpacing: -0.14,
    textAlign: "center",
    color: colors.gray07,
  },
  routeEmpty: {
    width: "100%",
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  routeEmptyText: {
    fontFamily: "SUIT",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 19.6,
    letterSpacing: -0.14,
    color: colors.gray06,
  },
  routeAction: {
    width: 328,
    height: 54,
    paddingVertical: 4,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.main,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  routeActionText: {
    fontFamily: "SUIT",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 22.4,
    letterSpacing: -0.16,
    color: colors.white,
  },
  routeActionIcon: {
    color: colors.white,
  },
  noticeRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  characterBadge: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors.gray03,
    backgroundColor: colors.sub,
  },
  characterCircle: {
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 17,
    backgroundColor: "#D9F7E3",
  },
  characterText: {
    fontFamily: typography.caption02M.fontFamily,
    fontSize: 7,
    fontWeight: "600",
    lineHeight: 9,
    color: colors.gray08,
  },
  noticeBubble: {
    width: 276,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.gray03,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 0,
    backgroundColor: colors.gray02,
  },
  noticeText: {
    fontFamily: "SUIT",
    fontSize: 13,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 18.2,
    letterSpacing: -0.13,
    flex: 1,
    color: colors.gray08,
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
});
