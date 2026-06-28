import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import BellIcon from "../../assets/images/icon_bell.svg";
import BellNoneIcon from "../../assets/images/icon_bell_none.svg";
import HomerunLogo from "../../assets/images/homerun_logo.svg";
import { colors, layout } from "../theme";

const MAIN_BACKGROUND = "#FCFDFE";
const SUB_BACKGROUND = MAIN_BACKGROUND;

export function Header({
  type = "main",
  title,
  notificationCount = 0,
  BackIcon,
  backIconStyle,
  backButtonStyle,
  headerStyle,
  titleStyle,
  topSpacerStyle,
  onBellPress,
  onBackPress,
}) {
  const HeaderBellIcon = notificationCount > 0 ? BellIcon : BellNoneIcon;
  const isMain = type === "main";

  return (
    <>
      <View
        style={[
          styles.topSpacer,
          isMain ? styles.mainBg : styles.subBg,
          topSpacerStyle,
        ]}
      />
      <View
        style={[
          styles.header,
          isMain ? styles.mainBg : styles.subBg,
          headerStyle,
        ]}
      >
        {isMain ? (
          <>
            <HomerunLogo accessibilityLabel="홈런" height={39} width={102} />
            <Pressable
              accessibilityLabel="알림"
              accessibilityRole="button"
              hitSlop={12}
              onPress={onBellPress}
              style={styles.iconButton}
            >
              <HeaderBellIcon height={31} width={36} />
            </Pressable>
          </>
        ) : (
          <>
            <Pressable
              accessibilityLabel="뒤로가기"
              accessibilityRole="button"
              hitSlop={12}
              onPress={onBackPress}
              style={[styles.iconButton, backButtonStyle]}
            >
              {BackIcon ? (
                <BackIcon
                  height={24}
                  style={[styles.backIcon, backIconStyle]}
                  width={24}
                />
              ) : (
                <Feather color="#9AA8B7" name="chevron-left" size={26} />
              )}
            </Pressable>
            <Text numberOfLines={1} style={[styles.title, titleStyle]}>
              {title}
            </Text>
            <View style={styles.iconButton} />
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  topSpacer: {
    height: 24,
  },
  header: {
    alignSelf: "center",
    width: "100%",
    maxWidth: layout.maxPhoneWidth,
    height: 70,
    paddingHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.gray04,
  },
  mainBg: {
    backgroundColor: MAIN_BACKGROUND,
  },
  subBg: {
    backgroundColor: SUB_BACKGROUND,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    width: 24,
    height: 24,
    aspectRatio: 1,
  },
  title: {
    flex: 1,
    marginLeft: 8,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "700",
    color: "#232323",
  },
});
