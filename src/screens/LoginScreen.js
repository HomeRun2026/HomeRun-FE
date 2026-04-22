import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  AppScreen,
  FormTextInput,
  PrimaryButton,
  SocialLoginButtons,
} from "../components";
import HomerunLogo from "../../assets/images/homerun_logo.svg";
import { colors, layout, typography } from "../theme";

export function LoginScreen({
  onLoginPress,
  onSignupPress,
  onFindPasswordPress,
}) {
  const [remember, setRemember] = useState(false);
  const handleLoginPress = () => {
    onLoginPress?.();
  };
  const handleSignupPress = () => {
    onSignupPress?.();
  };
  const handleFindPasswordPress = () => {
    onFindPasswordPress?.();
  };

  return (
    <AppScreen>
      <View style={styles.content}>
        <HomerunLogo
          accessibilityLabel="홈런"
          height={58}
          style={styles.logo}
          width={150}
        />

        <View style={styles.form}>
          <FormTextInput
            autoCapitalize="none"
            autoComplete="email"
            keyboardType="email-address"
            placeholder="이메일"
          />
          <FormTextInput
            autoCapitalize="none"
            autoComplete="password"
            placeholder="비밀번호"
            secureTextEntry
          />
          <PrimaryButton onPress={handleLoginPress} style={styles.loginButton}>
            로그인
          </PrimaryButton>
        </View>

        <View style={styles.options}>
          <Pressable
            accessibilityRole="checkbox"
            accessibilityState={{ checked: remember }}
            onPress={() => setRemember((value) => !value)}
            style={styles.remember}
          >
            <View style={[styles.check, remember && styles.checkOn]} />
            <Text style={styles.optionText}>로그인 유지</Text>
          </Pressable>

          <View style={styles.links}>
            <Pressable
              accessibilityRole="button"
              hitSlop={12}
              onPress={handleSignupPress}
              style={styles.linkButton}
            >
              <Text style={styles.optionText}>회원가입</Text>
            </Pressable>
            <View style={styles.divider} />
            <Pressable
              accessibilityRole="button"
              hitSlop={12}
              onPress={handleFindPasswordPress}
              style={styles.linkButton}
            >
              <Text style={styles.optionText}>비밀번호 찾기</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.simple}>
          <View style={styles.simpleLine} />
          <Text style={styles.simpleText}>간편 로그인</Text>
          <View style={styles.simpleLine} />
        </View>

        <SocialLoginButtons />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginHorizontal: layout.screenMargin,
    paddingTop: 204,
  },
  logo: {
    alignSelf: "center",
    marginBottom: 44,
  },
  form: {
    gap: 12,
  },
  loginButton: {
    marginTop: 4,
  },
  options: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  remember: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  check: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gray05,
    backgroundColor: colors.gray05,
  },
  checkOn: {
    borderColor: colors.main,
    backgroundColor: colors.main,
  },
  optionText: {
    ...typography.body03M,
    color: colors.gray07,
  },
  links: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },
  linkButton: {
    minHeight: 32,
    justifyContent: "center",
  },
  divider: {
    width: 1,
    height: 12,
    backgroundColor: colors.gray05,
  },
  simple: {
    marginTop: 36,
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  simpleLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray04,
  },
  simpleText: {
    ...typography.body03M,
    color: colors.gray06,
  },
});
