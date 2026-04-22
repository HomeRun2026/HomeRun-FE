import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";

import packageJson from "../../package.json";
import { AppScreen } from "../components";

const appVersion = packageJson.version;

const MENU_ITEMS = [
  { key: "notice", label: "공지사항", icon: "message-circle" },
  { key: "contact", label: "문의하기", icon: "mail" },
  { key: "privacy", label: "개인정보 처리 방침", icon: "shield" },
  { key: "terms", label: "이용약관", icon: "file-text" },
];

export function MyPageScreen({ embedded = false, onProfilePress }) {
  const content = (
    <View style={styles.container}>
      <View style={styles.statusSpacer} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>마이페이지</Text>
        <Pressable hitSlop={8} style={styles.bellButton}>
          <Ionicons color="#CDD5DE" name="notifications" size={24} />
        </Pressable>
      </View>

      <View style={styles.body}>
        <View>
          <Pressable onPress={onProfilePress} style={styles.profileCard}>
            <View style={styles.profileTextWrap}>
              <Text style={styles.profileName}>홍길동님</Text>
              <Text style={styles.profileEmail}>abcdg@gmail.com</Text>
            </View>
            <Feather color="#BCC6D1" name="chevron-right" size={24} />
          </Pressable>

          <View style={styles.menuCard}>
            {MENU_ITEMS.map((item, index) => (
              <Pressable
                key={item.key}
                style={[
                  styles.menuRow,
                  index !== MENU_ITEMS.length - 1 && styles.menuDivider,
                ]}
              >
                <View style={styles.menuLeft}>
                  <View style={styles.menuIconWrap}>
                    <Feather color="#C8D1DA" name={item.icon} size={18} />
                  </View>
                  <Text style={styles.menuText}>{item.label}</Text>
                </View>
                <Feather color="#BCC6D1" name="chevron-right" size={22} />
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.bottomActions}>
          <Pressable style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>로그아웃</Text>
          </Pressable>

          <Pressable>
            <Text style={styles.withdrawText}>회원 탈퇴</Text>
          </Pressable>

          <Pressable style={styles.versionButton}>
            <Text style={styles.versionText}>앱 버전 {appVersion}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  if (embedded) {
    return content;
  }

  return <AppScreen>{content}</AppScreen>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FA",
  },
  statusSpacer: {
    height: 20,
    backgroundColor: "#F4F7FA",
  },
  header: {
    height: 50,
    paddingHorizontal: 22,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E3E8EE",
    backgroundColor: "#F4F7FA",
  },
  headerTitle: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "700",
    color: "#222222",
  },
  bellButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 30,
    paddingBottom: 20,
    justifyContent: "space-between",
  },
  profileCard: {
    height: 112,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E1E7EE",
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileTextWrap: {
    flex: 1,
    justifyContent: "center",
  },
  profileName: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "700",
    color: "#2B2B2B",
  },
  profileEmail: {
    marginTop: 8,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "500",
    color: "#91A0B1",
  },
  menuCard: {
    marginTop: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E1E7EE",
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 20,
  },
  menuRow: {
    minHeight: 68,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "#E8EDF3",
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIconWrap: {
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  menuText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
    color: "#3A3A3A",
  },
  bottomActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoutButton: {
    minWidth: 90,
    height: 36,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: "#BCC7D3",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutButtonText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  withdrawText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
    color: "#A9B4C0",
  },
  versionButton: {
    justifyContent: "center",
  },
  versionText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: "500",
    color: "#98A6B6",
    textDecorationLine: "underline",
  },
});
