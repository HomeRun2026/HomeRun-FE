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
import { Feather } from "@expo/vector-icons";

import { AppScreen, Header, PrimaryButton } from "../components";
import { colors, layout, typography } from "../theme";

export function FindEmailPasswordScreen({ onBackPress, onConfirmPress }) {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPasswordConfirm, setShowNewPasswordConfirm] = useState(false);

  return (
    <AppScreen>
      <Header type="back" title="비밀번호 찾기" onBackPress={onBackPress} />

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
                  placeholder="이메일"
                  style={styles.flexInput}
                />
                <SideButton>인증</SideButton>
              </View>

              <View style={styles.row}>
                <FieldInput
                  keyboardType="number-pad"
                  placeholder="인증번호 입력"
                  style={styles.flexInput}
                />
                <SideButton>확인</SideButton>
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
              (영문 대/소문자, 숫자/특수문자 중 2가지 이상 조합, 8~16자)
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
      placeholderTextColor={colors.gray06}
      style={[styles.input, style]}
      {...props}
    />
  );
}

function PasswordInput({ onToggleVisibility, style, ...props }) {
  return (
    <View style={styles.passwordInputWrap}>
      <TextInput
        placeholderTextColor={colors.gray06}
        style={[styles.input, styles.passwordInput, style]}
        {...props}
      />
      <Pressable
        accessibilityRole="button"
        hitSlop={8}
        onPress={onToggleVisibility}
        style={styles.eyeButton}
      >
        <Feather color="#CDD7E1" name="eye" size={22} />
      </Pressable>
    </View>
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
  scroller: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  fieldGroup: {
    gap: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  flexInput: {
    flex: 1,
  },
  input: {
    height: 68,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray04,
    backgroundColor: colors.gray03,
    paddingHorizontal: 20,
    color: colors.gray09,
    ...typography.head01Sb,
    fontWeight: "500",
  },
  sideButton: {
    width: 106,
    height: 68,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray04,
    backgroundColor: colors.gray04,
    alignItems: "center",
    justifyContent: "center",
  },
  sideButtonText: {
    ...typography.head01Sb,
    color: colors.gray07,
    fontWeight: "500",
  },
  passwordGroup: {
    marginTop: 58,
    gap: 12,
  },
  passwordInputWrap: {
    justifyContent: "center",
  },
  passwordInput: {
    paddingRight: 58,
  },
  eyeButton: {
    position: "absolute",
    right: 18,
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  helper: {
    marginTop: 14,
    ...typography.body02M,
    color: colors.gray06,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 62,
  },
  confirmButton: {
    height: 68,
    borderRadius: 34,
  },
});
