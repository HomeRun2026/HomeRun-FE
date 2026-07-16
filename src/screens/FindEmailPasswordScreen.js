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
  useWindowDimensions,
  View,
} from "react-native";

import { sendEmailVerificationCode } from "../../api/auth/email/send";
import { verifyEmailCode } from "../../api/auth/email/verify";
import { resetPassword } from "../../api/reset";
import HiddenIcon from "../../assets/images/icon_password_hidden.svg";
import VisibleIcon from "../../assets/images/icon_visible.svg";
import BackIcon from "../../assets/images/L.svg";
import { AppScreen, Header, PrimaryButton } from "../components";
import { colors, layout, typography } from "../theme";

export function FindEmailPasswordScreen({ onBackPress, onConfirmPress }) {
  const { height, width } = useWindowDimensions();
  const frameWidth = Math.min(width, layout.mobileFrameWidth);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPasswordConfirm, setShowNewPasswordConfirm] = useState(false);

  const trimmedEmail = email.trim();
  const trimmedVerificationCode = verificationCode.trim();
  const isEmailEntered = trimmedEmail.length > 0;
  const isVerificationCodeEntered = trimmedVerificationCode.length > 0;
  const isEmailVerified = Boolean(verifiedEmail && verifiedEmail === trimmedEmail);
  const availableContentWidth =
    frameWidth - layout.screenMargin * 2;
  const shouldShowInputPreview = availableContentWidth < 340;
  const shouldUseInlineFooter = frameWidth > height || height < 640;

  const handleEmailChange = (value) => {
    setEmail(value);
    setEmailStatus(null);

    if (verifiedEmail && value.trim() !== verifiedEmail) {
      setVerifiedEmail("");
    }
  };

  const handleSendEmailCode = async () => {
    if (!trimmedEmail) {
      setEmailStatus({
        type: "error",
        message: "이메일을 입력해 주세요.",
      });
      Alert.alert("비밀번호 찾기", "이메일을 입력해 주세요.");
      return;
    }

    setEmailStatus({
      type: "info",
      message: "인증번호를 요청하고 있습니다.",
    });
    setIsSendingEmail(true);

    try {
      await sendEmailVerificationCode({ email: trimmedEmail });
      setVerifiedEmail("");
      setEmailStatus({
        type: "success",
        message: "인증번호를 이메일로 보냈습니다.",
      });
      Alert.alert("비밀번호 찾기", "인증번호를 이메일로 보냈습니다.");
    } catch (error) {
      const errorMessage =
        error?.message ?? "인증번호 발송에 실패했습니다. 다시 시도해 주세요.";

      setEmailStatus({
        type: "error",
        message: errorMessage,
      });
      Alert.alert("비밀번호 찾기", errorMessage);
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleVerifyEmailCode = async () => {
    if (!trimmedEmail || !trimmedVerificationCode) {
      setEmailStatus({
        type: "error",
        message: "이메일과 인증번호를 입력해 주세요.",
      });
      Alert.alert("비밀번호 찾기", "이메일과 인증번호를 입력해 주세요.");
      return;
    }

    setEmailStatus({
      type: "info",
      message: "인증번호를 확인하고 있습니다.",
    });
    setIsVerifyingEmail(true);

    try {
      await verifyEmailCode({
        email: trimmedEmail,
        code: trimmedVerificationCode,
      });
      setVerifiedEmail(trimmedEmail);
      setEmailStatus({
        type: "success",
        message: "이메일 인증이 완료되었습니다.",
      });
      Alert.alert("비밀번호 찾기", "이메일 인증이 완료되었습니다.");
    } catch (error) {
      const errorMessage =
        error?.message ?? "인증번호 확인에 실패했습니다. 다시 시도해 주세요.";

      setVerifiedEmail("");
      setEmailStatus({
        type: "error",
        message: errorMessage,
      });
      Alert.alert("비밀번호 찾기", errorMessage);
    } finally {
      setIsVerifyingEmail(false);
    }
  };

  const handleConfirmPress = async () => {
    if (!trimmedEmail || !newPassword || !newPasswordConfirm) {
      Alert.alert("비밀번호 찾기", "필수 정보를 모두 입력해 주세요.");
      return;
    }

    if (!isEmailVerified) {
      Alert.alert("비밀번호 찾기", "이메일 인증을 완료해 주세요.");
      return;
    }

    if (newPassword !== newPasswordConfirm) {
      Alert.alert("비밀번호 찾기", "비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsSubmitting(true);

    try {
      await resetPassword({
        email: trimmedEmail,
        newPassword,
        newPasswordConfirm,
      });
      Alert.alert("비밀번호 찾기", "비밀번호가 변경되었습니다.", [
        {
          text: "확인",
          onPress: () => onConfirmPress?.(),
        },
      ]);
    } catch (error) {
      Alert.alert(
        "비밀번호 찾기",
        error?.message ?? "비밀번호 재설정에 실패했습니다. 다시 시도해 주세요.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmButton = (
    <PrimaryButton
      disabled={isSubmitting}
      onPress={handleConfirmPress}
      style={[styles.confirmButton, isSubmitting && styles.disabled]}
      textStyle={styles.confirmText}
    >
      {isSubmitting ? "처리 중" : "확인"}
    </PrimaryButton>
  );

  return (
    <AppScreen>
      <Header
        type="back"
        title="비밀번호 찾기"
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
                <FindPasswordInput
                  autoCapitalize="none"
                  autoComplete="email"
                  keyboardType="email-address"
                  onChangeText={handleEmailChange}
                  placeholder="이메일 *"
                  style={styles.emailInput}
                  value={email}
                />
                <SideButton
                  active={isEmailEntered}
                  disabled={isSendingEmail}
                  onPress={handleSendEmailCode}
                >
                  {isSendingEmail ? "전송" : "인증"}
                </SideButton>
              </View>
              {shouldShowInputPreview && trimmedEmail && (
                <Text style={styles.inputPreview}>이메일 : {trimmedEmail}</Text>
              )}
              <View style={styles.row}>
                <FindPasswordInput
                  keyboardType="number-pad"
                  onChangeText={setVerificationCode}
                  placeholder="인증번호 입력 *"
                  style={styles.emailInput}
                  value={verificationCode}
                />
                <SideButton
                  active={isVerificationCodeEntered}
                  disabled={isVerifyingEmail}
                  onPress={handleVerifyEmailCode}
                >
                  {isEmailVerified ? "완료" : isVerifyingEmail ? "확인" : "확인"}
                </SideButton>
              </View>
              {shouldShowInputPreview && trimmedVerificationCode && (
                <Text style={styles.inputPreview}>
                  인증번호: {trimmedVerificationCode}
                </Text>
              )}
              {emailStatus && (
                <Text
                  style={[
                    styles.emailStatus,
                    emailStatus.type === "success" && styles.emailStatusSuccess,
                    emailStatus.type === "error" && styles.emailStatusError,
                  ]}
                >
                  {emailStatus.message}
                </Text>
              )}
            </View>

            <View style={styles.passwordGroup}>
              <PasswordInput
                autoCapitalize="none"
                autoComplete="password"
                onChangeText={setNewPassword}
                onToggleVisibility={() =>
                  setShowNewPassword((value) => !value)
                }
                placeholder="새 비밀번호 *"
                secureTextEntry={!showNewPassword}
                style={styles.stretchInput}
                value={newPassword}
              />
              <PasswordInput
                autoCapitalize="none"
                autoComplete="password"
                onChangeText={setNewPasswordConfirm}
                onToggleVisibility={() =>
                  setShowNewPasswordConfirm((value) => !value)
                }
                placeholder="새 비밀번호 확인 *"
                secureTextEntry={!showNewPasswordConfirm}
                style={styles.stretchInput}
                value={newPasswordConfirm}
              />
            </View>

            <Text style={styles.helper}>
              (영문 대/소문자, 숫자/특수문자 중 2가지 이상 조합, 8~16자)
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
    </AppScreen>
  );
}

function FindPasswordInput({ style, ...props }) {
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

function SideButton({ active, children, disabled = false, onPress }) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.sideButton,
        active && styles.sideButtonActive,
        disabled && styles.disabled,
      ]}
    >
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
    gap: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  emailInput: {
    display: "flex",
    flex: 1,
    minWidth: 0,
    height: 54,
    padding: 16,
    alignItems: "center",
    gap: 10,
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
    flexShrink: 0,
    width: 72,
    height: 54,
    paddingHorizontal: 8,
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
  inputPreview: {
    ...typography.caption01M,
    lineHeight: 18,
    letterSpacing: -0.12,
    color: colors.gray06,
  },
  emailStatus: {
    ...typography.caption01M,
    lineHeight: 18,
    letterSpacing: -0.12,
    color: colors.gray07,
  },
  emailStatusSuccess: {
    color: colors.main,
  },
  emailStatusError: {
    color: colors.point,
  },
  disabled: {
    opacity: 0.6,
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
  confirmText: {
    ...typography.body01Sb,
    color: colors.white,
  },
});
