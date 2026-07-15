import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import SettingIcon from "../../public/images/setting.svg";
import { colors, typography } from "../theme";

export function CustomAlarmScreen() {
  return (
    <View style={styles.body}>
      <View style={styles.noticeCard}>
        <View style={styles.noticeHeader}>
          <Text style={styles.noticeTitle}>맞춤 알림</Text>
          <SettingIcon height={20} width={20} />
        </View>
        <Text style={styles.noticeDescription}>
          필요한 시간에 맞춰 출발 알림을 설정해보세요
        </Text>
        <Pressable accessibilityRole="button" style={styles.noticeAction}>
          <Text style={styles.noticeActionText}>알림 설정하기</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 11,
    paddingBottom: 142,
  },
  noticeCard: {
    padding: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray04,
    borderRadius: 8,
  },
  noticeHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  noticeTitle: {
    ...typography.body01Sb,
    color: colors.gray09,
  },
  noticeDescription: {
    ...typography.caption01M,
    marginTop: 12,
    color: colors.gray07,
  },
  noticeAction: {
    height: 48,
    marginTop: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.main,
    borderRadius: 8,
  },
  noticeActionText: {
    ...typography.body02M,
    color: colors.white,
  },
});
