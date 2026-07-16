import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";

import { AppScreen, Header, PrimaryButton } from "../components";
import BackIcon from "../../assets/images/L.svg";
import HiddenIcon from "../../assets/images/icon_password_hidden.svg";
import VisibleIcon from "../../assets/images/icon_visible.svg";
import { colors, layout, typography } from "../theme";

export function ChangePasswordScreen({ onBackPress, onConfirmPress }) {
  const { height, width } = useWindowDimensions();
  const frameWidth = Math.min(width, layout.mobileFrameWidth);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPasswordConfirm, setShowNewPasswordConfirm] = useState(false);
  const shouldUseInlineFooter = frameWidth > height || height < 640;
  const confirmButton = (
    <PrimaryButton onPress={onConfirmPress} style={styles.confirmButton}>
      확인
    </PrimaryButton>
  );

  return (
    <AppScreen>
      <View style={styles.container}>
        <Header
          type="back"
          title="비밀번호 변경"
          BackIcon={BackIcon}
          backButtonStyle={styles.backButton}
          backIconStyle={styles.backIcon}
          headerStyle={styles.headerBox}
          showRightPlaceholder={false}
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
              <View style={styles.currentPasswordGroup}>
                <PasswordInput
                  onToggleVisibility={() =>
                    setShowCurrentPassword((value) => !value)
                  }
                  placeholder="현재 비밀번호"
                  secureTextEntry={!showCurrentPassword}
                  withEye
                />
              </View>
              <View style={styles.passwordGroup}>
                <PasswordInput
                  onToggleVisibility={() =>
                    setShowNewPassword((value) => !value)
                  }
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
              </View>
              <Text style={styles.helper}>
                (영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 8자~16자)
              </Text>

              {shouldUseInlineFooter && (
                <View style={styles.inlineFooter}>{confirmButton}</View>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {!shouldUseInlineFooter && (
          <View style={styles.footer}>{confirmButton}</View>
        )}
      </View>
    </AppScreen>
  );
}

function PasswordInput({
  onToggleVisibility,
  secureTextEntry,
  style,
  withEye = false,
  ...props
}) {
  const VisibilityIcon = secureTextEntry ? HiddenIcon : VisibleIcon;

  return (
    <View style={styles.inputWrap}>
      <TextInput
        cursorColor={colors.gray06}
        placeholderTextColor={colors.gray06}
        selectionColor={colors.gray06}
        secureTextEntry={secureTextEntry}
        style={[styles.input, withEye && styles.inputWithEye, style]}
        underlineColorAndroid="transparent"
        {...props}
      />
      {withEye && (
        <Pressable
          accessibilityLabel={secureTextEntry ? "비밀번호 보기" : "비밀번호 숨기기"}
          accessibilityRole="button"
          hitSlop={8}
          onPress={onToggleVisibility}
          style={styles.eyeButton}
        >
          <VisibilityIcon />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerBox: {
    display: "flex",
    height: 54,
    paddingHorizontal: 16,
    alignItems: "center",
    gap: 12,
    justifyContent: "flex-start",
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
  scroller: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: layout.screenMargin,
    paddingTop: 24,
    paddingBottom: 24,
  },
  currentPasswordGroup: {
    marginBottom: 32,
  },
  passwordGroup: {
    gap: 8,
  },
  inputWrap: {
    justifyContent: "center",
  },
  input: {
    height: 54,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray03,
    backgroundColor: colors.gray02,
    paddingHorizontal: 16,
    color: colors.gray06,
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
  },
  inputWithEye: {
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
    fontFamily: typography.caption01M.fontFamily,
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: 19.2,
    letterSpacing: -0.12,
    color: colors.gray06,
  },
  footer: {
    paddingHorizontal: layout.screenMargin,
    paddingBottom: 64,
    alignItems: "center",
  },
  inlineFooter: {
    marginTop: 24,
    paddingBottom: 24,
    alignItems: "center",
  },
  confirmButton: {
    display: "flex",
    width: "100%",
    height: 54,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderRadius: 8,
    backgroundColor: colors.main,
  },
});
