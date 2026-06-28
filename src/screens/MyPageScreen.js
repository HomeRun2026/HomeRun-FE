import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import BellIcon from "../../assets/images/icon_bell.svg";
import BellNoneIcon from "../../assets/images/icon_bell_none.svg";
import MailIcon from "../../assets/images/icon_mail.svg";
import MessageIcon from "../../assets/images/icon_message.svg";
import MypageIcon from "../../assets/images/icon_mypage.svg";
import NoteIcon from "../../assets/images/icon_note.svg";
import PenIcon from "../../assets/images/icon_pen.svg";
import LockIcon from "../../assets/images/icon_lock.svg";
import RightIcon from "../../assets/images/R.svg";
import packageJson from "../../package.json";
import { AppScreen } from "../components";
import { colors, layout, typography } from "../theme";

const appVersion = packageJson.version;

const ACCOUNT_ITEMS = [
  { key: "nickname", label: "닉네임 변경", Icon: PenIcon },
  { key: "password", label: "비밀번호 변경", Icon: LockIcon },
];

const SERVICE_ITEMS = [
  { key: "notice", label: "공지사항", Icon: MessageIcon },
  { key: "contact", label: "문의하기", Icon: MailIcon },
  {
    key: "privacy",
    label: "개인정보 처리 방침",
    Icon: MypageIcon,
  },
  { key: "terms", label: "이용약관", Icon: NoteIcon },
];

export function MyPageScreen({
  embedded = false,
  onProfilePress,
  showHeader = true,
  notificationCount = 0,
  onOpenNotifications,
  onOpenNotices,
  onOpenContact,
  onOpenPassword,
  onOpenPrivacy,
  onOpenTerms,
}) {
  const HeaderBellIcon = notificationCount > 0 ? BellIcon : BellNoneIcon;

  const handleMenuPress = (menuKey) => {
    if (menuKey === "nickname") {
      onProfilePress?.();
    }

    if (menuKey === "password") {
      onOpenPassword?.();
    }

    if (menuKey === "notice") {
      onOpenNotices?.();
    }

    if (menuKey === "contact") {
      onOpenContact?.();
    }

    if (menuKey === "privacy") {
      onOpenPrivacy?.();
    }

    if (menuKey === "terms") {
      onOpenTerms?.();
    }
  };

  const content = (
    <View style={styles.container}>
      {showHeader ? (
        <>
          <View style={styles.topSpacer} />
          <View style={styles.header}>
            <Text style={styles.headerTitle}>마이페이지</Text>
            <Pressable
              accessibilityLabel="알림"
              accessibilityRole="button"
              hitSlop={12}
              onPress={onOpenNotifications}
              style={styles.bellButton}
            >
              <HeaderBellIcon height={31} width={36} />
            </Pressable>
          </View>
        </>
      ) : null}

      <View style={styles.body}>
        <View style={styles.contentGroup}>
          <View style={styles.card}>
            <View style={styles.profileTextWrap}>
              <Text style={styles.profileName}>홈런</Text>
              <Text style={styles.profileEmail}>abcdg@gmail.com</Text>
            </View>

            {ACCOUNT_ITEMS.map((item, index) => (
              <Pressable
                key={item.key}
                onPress={() => handleMenuPress(item.key)}
                style={[
                  styles.menuRow,
                  styles.accountRow,
                  index !== ACCOUNT_ITEMS.length - 1 && styles.menuDivider,
                ]}
              >
                <View style={styles.menuLeft}>
                  <View style={styles.menuIconWrap}>
                    <item.Icon height={24} width={24} />
                  </View>
                  <Text style={styles.menuText}>{item.label}</Text>
                </View>
                <RightIcon height={18} width={18} />
              </Pressable>
            ))}
          </View>

          <View style={[styles.card, styles.serviceCard]}>
            {SERVICE_ITEMS.map((item, index) => (
              <Pressable
                key={item.key}
                onPress={() => handleMenuPress(item.key)}
                style={[
                  styles.menuRow,
                  styles.serviceRow,
                  index !== SERVICE_ITEMS.length - 1 && styles.menuDivider,
                ]}
              >
                <View style={styles.menuLeft}>
                  <View style={styles.menuIconWrap}>
                    <item.Icon height={24} width={24} />
                  </View>
                  <Text style={styles.menuText}>{item.label}</Text>
                </View>
                <RightIcon height={18} width={18} />
              </Pressable>
            ))}
          </View>
        </View>

          <View style={styles.bottomActions}>
            <View style={styles.accountActions}>
              <Pressable style={styles.logoutButton}>
                <Text style={styles.logoutButtonText}>로그아웃</Text>
              </Pressable>

              <Pressable>
                <Text style={styles.withdrawText}>회원 탈퇴</Text>
              </Pressable>
            </View>

            <Pressable style={styles.versionButton}>
              <Text style={styles.versionText}>{`앱 버전 ${appVersion}`}</Text>
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
    backgroundColor: colors.gray01,
  },
  topSpacer: {
    height: 24,
    backgroundColor: colors.gray01,
  },
  header: {
    alignSelf: "center",
    width: "100%",
    maxWidth: layout.maxPhoneWidth,
    height: 58,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.gray03,
    backgroundColor: colors.gray01,
  },
  headerTitle: {
    ...typography.head01Sb,
    color: colors.black,
  },
  bellButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 29,
    paddingBottom: 17,
  },
  contentGroup: {
    alignSelf: "stretch",
  },
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.gray03,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  profileTextWrap: {
    paddingTop: 22,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray03,
  },
  profileName: {
    ...typography.body01Sb,
    color: colors.gray09,
  },
  profileEmail: {
    marginTop: 4,
    ...typography.body02M,
    color: colors.gray07,
  },
  serviceCard: {
    marginTop: 14,
    paddingBottom: 0,
  },
  menuRow: {
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  accountRow: {
    alignSelf: "stretch",
    height: 58,
    minHeight: 58,
    paddingVertical: 20,
  },
  serviceRow: {
    alignSelf: "stretch",
    height: 58,
    minHeight: 58,
    paddingVertical: 20,
  },
  menuDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray03,
  },
  menuLeft: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  menuIconWrap: {
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 22,
  },
  menuText: {
    ...typography.body02M,
    color: colors.gray09,
  },
  bottomActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "stretch",
    marginTop: 12,
  },
  accountActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logoutButton: {
    minWidth: 72,
    height: 27,
    paddingHorizontal: 13,
    borderRadius: 999,
    backgroundColor: colors.gray06,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutButtonText: {
    ...typography.caption01M,
    color: colors.white,
  },
  withdrawText: {
    ...typography.caption01M,
    color: colors.gray06,
  },
  versionButton: {
    justifyContent: "center",
  },
  versionText: {
    ...typography.caption01Underline,
    color: colors.gray07,
    textDecorationLine: "underline",
  },
});
