import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

import { login } from "../../api/auth/login";
import { startGoogleAuth } from "../../api/google";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleLoginPress = async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      Alert.alert("로그인", "이메일과 비밀번호를 입력해 주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      await login({
        email: trimmedEmail,
        password,
      });

      onLoginPress?.();
    } catch (error) {
      Alert.alert(
        "로그인",
        error?.message ?? "로그인에 실패했습니다. 다시 시도해 주세요.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignupPress = () => {
    onSignupPress?.();
  };

  const handleFindPasswordPress = () => {
    onFindPasswordPress?.();
  };

  const handleGooglePress = async () => {
    setIsGoogleLoading(true);

    try {
      await startGoogleAuth();
    } catch {
      Alert.alert("구글 로그인", "구글 로그인을 시작하지 못했습니다. 다시 시도해 주세요.");
    } finally {
      setIsGoogleLoading(false);
    }
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
            onChangeText={setEmail}
            placeholder="이메일"
            value={email}
          />
          <FormTextInput
            autoCapitalize="none"
            autoComplete="password"
            onChangeText={setPassword}
            placeholder="비밀번호"
            secureTextEntry
            value={password}
          />
          <PrimaryButton
            disabled={isSubmitting}
            onPress={handleLoginPress}
            style={[styles.loginButton, isSubmitting && styles.disabled]}
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

        <SocialLoginButtons
          isGoogleLoading={isGoogleLoading}
          onGooglePress={handleGooglePress}
        />
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
  disabled: {
    opacity: 0.6,
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
