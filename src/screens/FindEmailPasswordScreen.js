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

import VisibleIcon from "../../assets/images/icon_visible.svg";
import { AppScreen, Header, PrimaryButton } from "../components";
import { colors, layout, typography } from "../theme";

export function FindEmailPasswordScreen({ onBackPress, onConfirmPress }) {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPasswordConfirm, setShowNewPasswordConfirm] = useState(false);
  const isEmailEntered = email.trim().length > 0;
  const isVerificationCodeEntered = verificationCode.trim().length > 0;

  return (
    <AppScreen>
      <Header
        type="back"
        title="비밀번호 찾기"
        headerStyle={styles.findPasswordHeader}
        titleStyle={styles.findPasswordTitle}
        topSpacerStyle={styles.findPasswordHeaderSpacer}
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
            <View style={styles.fieldGroup}>
              <View style={styles.row}>
                <FieldInput
                  autoCapitalize="none"
                  autoComplete="email"
                  keyboardType="email-address"
                  onChangeText={setEmail}
                  placeholder="이메일"
                  style={styles.flexInput}
                  value={email}
                />
                <SideButton active={isEmailEntered}>인증</SideButton>
              </View>

              <View style={styles.row}>
                <FieldInput
                  keyboardType="number-pad"
                  onChangeText={setVerificationCode}
                  placeholder="인증번호 입력"
                  style={styles.flexInput}
                  value={verificationCode}
                />
                <SideButton active={isVerificationCodeEntered}>확인</SideButton>
              </View>
            </View>

            <View style={styles.passwordGroup}>
              <PasswordInput
                placeholder="새 비밀번호"
                secureTextEntry={!showNewPassword}
                onToggleVisibility={() =>
                  setShowNewPassword((value) => !value)
                }
              />
              <PasswordInput
                placeholder="새 비밀번호 확인"
                secureTextEntry={!showNewPasswordConfirm}
                onToggleVisibility={() =>
                  setShowNewPasswordConfirm((value) => !value)
                }
              />
            </View>

            <Text style={styles.helper}>
              (영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 8자~16자)
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <PrimaryButton onPress={onConfirmPress} style={styles.confirmButton}>
          확인
        </PrimaryButton>
      </View>
    </AppScreen>
  );
}

function FieldInput({ style, ...props }) {
  return (
    <TextInput
      cursorColor={colors.black}
      placeholderTextColor={colors.gray06}
      selectionColor={colors.black}
      underlineColorAndroid="transparent"
      style={[styles.input, style]}
      {...props}
    />
  );
}

function PasswordInput({ onToggleVisibility, style, ...props }) {
  return (
    <View style={styles.passwordInputWrap}>
      <TextInput
        cursorColor={colors.black}
        placeholderTextColor={colors.gray06}
        selectionColor={colors.black}
        underlineColorAndroid="transparent"
        style={[styles.input, styles.passwordInput, style]}
        {...props}
      />
      <Pressable
        accessibilityRole="button"
        hitSlop={8}
        onPress={onToggleVisibility}
        style={styles.eyeButton}
      >
        <VisibleIcon />
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
  findPasswordHeaderSpacer: {
    backgroundColor: colors.white,
  },
  findPasswordHeader: {
    alignSelf: "stretch",
    height: 54,
    paddingHorizontal: 16,
    alignItems: "center",
    gap: 12,
    justifyContent: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: colors.gray03,
    backgroundColor: colors.white,
  },
  findPasswordTitle: {
    color: colors.black,
    fontFamily: "SUIT",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: 20,
    letterSpacing: -0.2,
  },
  keyboardContainer: {
    flex: 1,
  },
  scroller: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  fieldGroup: {
    gap: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  flexInput: {
    flex: 1,
  },
  input: {
    height: 54,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray04,
    ...Platform.select({
      web: {
        outlineColor: "transparent",
        outlineStyle: "none",
        outlineWidth: 0,
        boxShadow: "none",
      },
    }),
    backgroundColor: colors.gray02,
    paddingHorizontal: 16,
    color: colors.black,
    ...typography.body01Sb,
    fontStyle: "normal",
    letterSpacing: -0.16,
  },
  sideButton: {
    width: 76,
    height: 54,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray04,
    backgroundColor: colors.gray04,
    alignItems: "center",
    justifyContent: "center",
  },
  sideButtonActive: {
    borderColor: colors.main,
    backgroundColor: colors.main,
  },
  sideButtonText: {
    color: colors.gray07,
    textAlign: "center",
    ...typography.body01Sb,
    fontStyle: "normal",
    letterSpacing: -0.16,
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
    color: colors.gray06,
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  confirmButton: {
    height: 54,
    borderRadius: 50,
  },
});
