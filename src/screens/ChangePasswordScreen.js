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

export function ChangePasswordScreen({ onBackPress, onConfirmPress }) {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPasswordConfirm, setShowNewPasswordConfirm] = useState(false);

  return (
    <AppScreen>
      <View style={styles.container}>
        <Header type="back" title="비밀번호 변경" onBackPress={onBackPress} />

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
              <PasswordInput placeholder="현재 비밀번호" secureTextEntry />
              <PasswordInput
                onToggleVisibility={() => setShowNewPassword((value) => !value)}
                placeholder="새 비밀번호"
                secureTextEntry={!showNewPassword}
                withEye
              />
              <PasswordInput
                onToggleVisibility={() =>
                  setShowNewPasswordConfirm((value) => !value)
                }
                placeholder="새 비밀번호 확인"
                secureTextEntry={!showNewPasswordConfirm}
                withEye
              />
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
      </View>
    </AppScreen>
  );
}

function PasswordInput({ onToggleVisibility, style, withEye = false, ...props }) {
  return (
    <View style={styles.inputWrap}>
      <TextInput
        placeholderTextColor="#B4C0CC"
        style={[styles.input, withEye && styles.inputWithEye, style]}
        {...props}
      />
      {withEye && (
        <Pressable
          accessibilityRole="button"
          hitSlop={8}
          onPress={onToggleVisibility}
          style={styles.eyeButton}
        >
          <Feather color="#CDD7E1" name="eye" size={22} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FA",
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
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  inputWrap: {
    justifyContent: "center",
    marginBottom: 12,
  },
  input: {
    height: 58,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E2E8EF",
    backgroundColor: "#EEF3F7",
    paddingHorizontal: 16,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "600",
    color: "#45515E",
  },
  inputWithEye: {
    paddingRight: 56,
  },
  eyeButton: {
    position: "absolute",
    right: 14,
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  helper: {
    marginTop: -2,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    color: "#A3B1BF",
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 28,
  },
  confirmButton: {
    height: 58,
    borderRadius: 29,
    backgroundColor: "#33D878",
  },
});
