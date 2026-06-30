import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  AppScreen,
  FormTextInput,
  PrimaryButton,
  SocialLoginButtons,
} from "../components";
import HomerunLogo from "../../assets/images/homerun_logo.svg";
import HiddenIcon from "../../assets/images/icon_password_hidden.svg";
import VisibleIcon from "../../assets/images/icon_visible.svg";
import { colors, layout, typography } from "../theme";

export function LoginScreen({
  onLoginPress,
  onSignupPress,
  onFindPasswordPress,
}) {
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
          <PasswordInput
            autoCapitalize="none"
            autoComplete="password"
            onToggleVisibility={() => setShowPassword((value) => !value)}
            placeholder="비밀번호"
            secureTextEntry={!showPassword}
          />
          <PrimaryButton
            onPress={handleLoginPress}
            style={styles.loginButton}
            textStyle={styles.loginButtonText}
          >
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

function PasswordInput({
  onToggleVisibility,
  secureTextEntry,
  style,
  ...props
}) {
  const VisibilityIcon = secureTextEntry ? HiddenIcon : VisibleIcon;

  return (
    <View style={styles.passwordInputWrap}>
      <FormTextInput
        secureTextEntry={secureTextEntry}
        style={[styles.passwordInput, style]}
        {...props}
      />
      <Pressable
        accessibilityLabel={secureTextEntry ? "비밀번호 보기" : "비밀번호 숨기기"}
        accessibilityRole="button"
        hitSlop={8}
        onPress={onToggleVisibility}
        style={styles.eyeButton}
      >
        <VisibilityIcon />
      </Pressable>
    </View>
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
    gap: 8,
  },
  passwordInputWrap: {
    justifyContent: "center",
  },
  passwordInput: {
    paddingRight: 58,
  },
  eyeButton: {
    position: "absolute",
    right: 16,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButton: {
    display: "flex",
    height: 54,
    marginTop: 4,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    alignSelf: "stretch",
    borderRadius: 8,
    backgroundColor: colors.main,
  },
  loginButtonText: {
    ...typography.body01Sb,
    color: colors.white,
    fontStyle: "normal",
    letterSpacing: -0.16,
    textAlign: "center",
  },
  options: {
    marginTop: 12,
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
    width: 14,
    height: 14,
    aspectRatio: 1,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: colors.gray04,
    backgroundColor: colors.gray03,
  },
  checkOn: {
    borderColor: colors.main,
    backgroundColor: colors.main,
  },
  optionText: {
    ...typography.caption01M,
    color: colors.gray07,
    fontStyle: "normal",
    lineHeight: 19.2,
    letterSpacing: -0.12,
    textAlign: "center",
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
    ...typography.caption01M,
    color: colors.gray06,
    fontStyle: "normal",
    lineHeight: 19.2,
    letterSpacing: -0.12,
    textAlign: "center",
  },
});
