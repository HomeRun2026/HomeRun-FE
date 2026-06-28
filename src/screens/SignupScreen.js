import React, { useState } from "react";
import {
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
import BackIcon from "../../assets/images/L.svg";
import HiddenIcon from "../../assets/images/icon_password_hidden.svg";
import VisibleIcon from "../../assets/images/icon_visible.svg";
import { colors, layout, typography } from "../theme";

export function SignupScreen({ onBackPress, onNextPress }) {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const isEmailEntered = email.trim().length > 0;
  const isVerificationCodeEntered = verificationCode.trim().length > 0;

  return (
    <AppScreen>
      <Header
        type="back"
        title="회원가입"
        BackIcon={BackIcon}
        backButtonStyle={styles.backButton}
        backIconStyle={styles.backIcon}
        headerStyle={styles.headerBox}
        titleStyle={styles.headerTitle}
        onBackPress={onBackPress}
      />

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
                  style={styles.emailInput}
                  value={email}
                />
                <SideButton active={isEmailEntered}>인증</SideButton>
              </View>
              <View style={styles.row}>
                <SignupInput
                  keyboardType="number-pad"
                  onChangeText={setVerificationCode}
                  placeholder="인증번호 입력 *"
                  style={styles.emailInput}
                  value={verificationCode}
                />
                <SideButton active={isVerificationCodeEntered}>확인</SideButton>
              </View>
            </View>

            <View style={styles.passwordGroup}>
              <PasswordInput
                autoCapitalize="none"
                autoComplete="password"
                onToggleVisibility={() => setShowPassword((value) => !value)}
                placeholder="비밀번호 *"
                secureTextEntry={!showPassword}
                style={styles.stretchInput}
              />
              <PasswordInput
                autoCapitalize="none"
                autoComplete="password"
                onToggleVisibility={() =>
                  setShowPasswordConfirm((value) => !value)
                }
                placeholder="비밀번호 확인 *"
                secureTextEntry={!showPasswordConfirm}
                style={styles.stretchInput}
              />
            </View>

            <Text style={styles.helper}>
              (영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 8자~16자)
            </Text>

            <SignupInput
              placeholder="닉네임 *"
              style={[styles.stretchInput, styles.nicknameInput]}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <PrimaryButton
          onPress={onNextPress}
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
      cursorColor={colors.black}
      placeholderTextColor={colors.gray06}
      selectionColor={colors.black}
      style={[styles.input, style]}
      underlineColorAndroid="transparent"
      {...props}
    />
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
      <TextInput
        cursorColor={colors.black}
        placeholderTextColor={colors.gray06}
        selectionColor={colors.black}
        secureTextEntry={secureTextEntry}
        style={[styles.input, style, styles.passwordInput]}
        underlineColorAndroid="transparent"
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

function SideButton({ active, children }) {
  return (
    <Pressable style={[styles.sideButton, active && styles.sideButtonActive]}>
      <Text
        style={[styles.sideButtonText, active && styles.sideButtonTextActive]}
      >
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  headerBox: {
    display: "flex",
    height: 54,
    paddingHorizontal: 16,
    alignItems: "center",
    gap: 12,
    alignSelf: "stretch",
    borderBottomColor: colors.gray03,
  },
  headerTitle: {
    ...typography.head01Sb,
    marginLeft: 0,
    color: colors.black,
  },
  backButton: {
    width: 24,
    height: 24,
  },
  backIcon: {
    width: 24,
    height: 24,
    aspectRatio: 1,
  },
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
  emailInput: {
    display: "flex",
    width: 236,
    height: 54,
    padding: 16,
    alignItems: "center",
    gap: 10,
    flexShrink: 0,
  },
  stretchInput: {
    display: "flex",
    height: 54,
    padding: 16,
    alignItems: "center",
    gap: 10,
    alignSelf: "stretch",
  },
  input: {
    height: 54,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.gray03,
    borderRadius: 8,
    backgroundColor: colors.gray02,
    ...Platform.select({
      web: {
        outlineColor: "transparent",
        outlineStyle: "none",
        outlineWidth: 0,
        boxShadow: "none",
      },
    }),
    ...typography.body01Sb,
    fontStyle: "normal",
    letterSpacing: -0.16,
    textAlign: "left",
    color: colors.black,
  },
  sideButton: {
    display: "flex",
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    height: 54,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderRadius: 8,
    backgroundColor: colors.gray04,
  },
  sideButtonActive: {
    backgroundColor: colors.main,
  },
  sideButtonText: {
    ...typography.body01Sb,
    fontStyle: "normal",
    letterSpacing: -0.16,
    textAlign: "center",
    color: colors.gray07,
  },
  sideButtonTextActive: {
    color: colors.white,
  },
  passwordGroup: {
    marginTop: 32,
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
  helper: {
    marginTop: 8,
    ...typography.caption01M,
    fontStyle: "normal",
    lineHeight: 19.2,
    letterSpacing: -0.12,
    color: colors.gray06,
  },
  nicknameInput: {
    marginTop: 32,
  },
  footer: {
    paddingHorizontal: layout.screenMargin,
    paddingBottom: 64,
    alignItems: "center",
  },
  nextButton: {
    display: "flex",
    width: 328,
    maxWidth: "100%",
    height: 54,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderRadius: 8,
    backgroundColor: colors.main,
  },
  nextText: {
    ...typography.body01Sb,
    color: colors.white,
  },
});
