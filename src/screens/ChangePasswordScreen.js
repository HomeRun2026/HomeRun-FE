// 비밀번호 변경 화면
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

import { AppScreen, PrimaryButton } from "../components";

export function ChangePasswordScreen({ onBackPress, onConfirmPress }) {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPasswordConfirm, setShowNewPasswordConfirm] = useState(false);

  return (
    <AppScreen>
      <View style={styles.container}>
        <View style={styles.statusSpacer} />

        <View style={styles.header}>
          <Pressable
            accessibilityLabel="뒤로가기"
            hitSlop={8}
            onPress={onBackPress}
            style={styles.backButton}
          >
            <Text style={styles.backIcon}>{"<"}</Text>
          </Pressable>
          <Text style={styles.headerTitle}>비밀번호 변경</Text>
        </View>

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
  statusSpacer: {
    height: 10,
    backgroundColor: "#F4F7FA",
  },
  header: {
    height: 72,
    paddingHorizontal: 22,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "flex-end",
    borderBottomWidth: 1,
    borderBottomColor: "#E3E8EE",
    backgroundColor: "#F4F7FA",
  },
  backButton: {
    width: 28,
    height: 30,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  backIcon: {
    color: "#9AA8B7",
    fontSize: 30,
    lineHeight: 30,
    fontWeight: "300",
  },
  headerTitle: {
    marginLeft: 8,
    fontSize: 34 / 2,
    lineHeight: 44 / 2,
    fontWeight: "700",
    color: "#232323",
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
