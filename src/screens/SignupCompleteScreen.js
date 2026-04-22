import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppScreen, PrimaryButton } from "../components";
import { colors, layout, typography } from "../theme";

export function SignupCompleteScreen({ onHomePress, onLoginPress }) {
  return (
    <AppScreen>
      <View style={styles.statusSpacer} />
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>회원가입이 완료되었어요!</Text>
          <Text style={styles.description}>
            홈런에 오신 걸 환영합니다.
            {"\n"}
            지금 바로 다양한 서비스를 이용해 보세요!
          </Text>

          <View style={styles.graphicPlaceholder} />
          <Text style={styles.graphicGuide}>(그래픽 추후 추가)</Text>
        </View>

        <View style={styles.footer}>
          <PrimaryButton
            onPress={onLoginPress}
            style={styles.loginButton}
            textStyle={styles.loginButtonText}
          >
            로그인하기
          </PrimaryButton>

          <Pressable onPress={onHomePress} style={styles.homeButton}>
            <Text style={styles.homeButtonText}>홈으로</Text>
          </Pressable>
        </View>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  statusSpacer: {
    height: 40,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    paddingHorizontal: layout.screenMargin,
    paddingBottom: 48,
    justifyContent: "space-between",
  },
  content: {
    alignItems: "center",
    paddingTop: 116,
  },
  title: {
    ...typography.head01Sb,
    color: colors.gray09,
    textAlign: "center",
  },
  description: {
    marginTop: 26,
    ...typography.body01R,
    color: colors.gray07,
    textAlign: "center",
  },
  graphicPlaceholder: {
    marginTop: 58,
    width: "78%",
    maxWidth: 320,
    aspectRatio: 1,
    borderRadius: 160,
    backgroundColor: colors.gray03,
  },
  graphicGuide: {
    marginTop: 32,
    ...typography.body01R,
    color: "#FF6565",
  },
  footer: {
    gap: 20,
  },
  loginButton: {
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.main,
  },
  loginButtonText: {
    ...typography.head01Sb,
    color: colors.white,
  },
  homeButton: {
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.gray05,
  },
  homeButtonText: {
    ...typography.head01Sb,
    color: colors.gray07,
  },
});
