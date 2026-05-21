import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { AppScreen, Header, PrimaryButton } from "../components";
import { colors, layout, typography } from "../theme";

export function SignupScreen({ onBackPress, onNextPress }) {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");

  const handleNextPress = () => {
    const trimmedEmail = email.trim();
    const trimmedNickname = nickname.trim();

    if (!trimmedEmail || !password || !passwordConfirm || !trimmedNickname) {
      Alert.alert("회원가입", "필수 정보를 모두 입력해 주세요.");
      return;
    }

    if (password !== passwordConfirm) {
      Alert.alert("회원가입", "비밀번호가 일치하지 않습니다.");
      return;
    }

    onNextPress?.({
      email: trimmedEmail,
      nickname: trimmedNickname,
      password,
    });
  };

  return (
    <AppScreen>
      <Header type="back" title="회원가입" onBackPress={onBackPress} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardContainer}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={styles.scroller}
        >
          <View style={styles.content}>
            <View style={styles.emailGroup}>
              <View style={styles.row}>
                <SignupInput
                  autoCapitalize="none"
                  autoComplete="email"
                  keyboardType="email-address"
                  onChangeText={setEmail}
                  placeholder="이메일 *"
                  style={styles.flexInput}
                  value={email}
                />
                <SideButton>인증</SideButton>
              </View>
              <View style={styles.row}>
                <SignupInput
                  keyboardType="number-pad"
                  onChangeText={setVerificationCode}
                  placeholder="인증번호 입력 *"
                  style={styles.flexInput}
                  value={verificationCode}
                />
                <SideButton>확인</SideButton>
              </View>
            </View>

            <View style={styles.passwordGroup}>
              <SignupInput
                autoCapitalize="none"
                autoComplete="password"
                onChangeText={setPassword}
                placeholder="비밀번호 *"
                secureTextEntry
                value={password}
              />
              <SignupInput
                autoCapitalize="none"
                autoComplete="password"
                onChangeText={setPasswordConfirm}
                placeholder="비밀번호 확인 *"
                secureTextEntry
                value={passwordConfirm}
              />
            </View>

            <Text style={styles.helper}>
              (영문 대/소문자, 숫자/특수문자 중 2가지 이상 조합, 8~16자)
            </Text>

            <SignupInput
              onChangeText={setNickname}
              placeholder="닉네임 *"
              style={styles.nicknameInput}
              value={nickname}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <PrimaryButton
          onPress={handleNextPress}
          style={styles.nextButton}
          textStyle={styles.nextText}
        >
          다음
        </PrimaryButton>
      </View>
    </AppScreen>
  );
}

function SignupInput({ style, ...props }) {
  return (
    <TextInput
      placeholderTextColor={colors.gray06}
      style={[styles.input, style]}
      {...props}
    />
  );
}

function SideButton({ children }) {
  return (
    <Pressable style={styles.sideButton}>
      <Text style={styles.sideButtonText}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  scroller: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: layout.screenMargin,
    paddingTop: 24,
    paddingBottom: 24,
  },
  emailGroup: {
    height: 116,
    gap: 8,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
  },
  flexInput: {
    flex: 1,
  },
  input: {
    height: 54,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.gray04,
    borderRadius: 8,
    backgroundColor: colors.gray02,
    color: colors.gray09,
    ...typography.body01Sb,
  },
  sideButton: {
    width: 76,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: colors.gray04,
  },
  sideButtonText: {
    ...typography.body02M,
    color: colors.gray07,
  },
  passwordGroup: {
    marginTop: 32,
    gap: 8,
  },
  helper: {
    marginTop: 8,
    ...typography.caption02M,
    color: colors.gray07,
  },
  nicknameInput: {
    marginTop: 32,
  },
  footer: {
    paddingHorizontal: layout.screenMargin,
    paddingBottom: 64,
  },
  nextButton: {
    height: 48,
    borderRadius: 24,
  },
  nextText: {
    ...typography.body01Sb,
    color: colors.white,
  },
});
