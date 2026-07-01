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

import { sendEmailVerificationCode } from "../../api/auth/email/send";
import { verifyEmailCode } from "../../api/auth/email/verify";
import { AppScreen, Header, PrimaryButton } from "../components";
import BackIcon from "../../assets/images/L.svg";
import HiddenIcon from "../../assets/images/icon_password_hidden.svg";
import VisibleIcon from "../../assets/images/icon_visible.svg";
import { colors, layout, typography } from "../theme";

export function SignupScreen({ onBackPress, onNextPress }) {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);

  const trimmedEmail = email.trim();
  const trimmedNickname = nickname.trim();
  const trimmedVerificationCode = verificationCode.trim();
  const isEmailVerified = Boolean(verifiedEmail && verifiedEmail === trimmedEmail);

  const handleEmailChange = (value) => {
    setEmail(value);

    if (verifiedEmail && value.trim() !== verifiedEmail) {
      setVerifiedEmail("");
    }
  };

  const handleSendEmailCode = async () => {
    if (!trimmedEmail) {
      Alert.alert("회원가입", "이메일을 입력해 주세요.");
      return;
    }

    setIsSendingEmail(true);

    try {
      await sendEmailVerificationCode({ email: trimmedEmail });
      setVerifiedEmail("");
      Alert.alert("회원가입", "인증번호를 이메일로 보냈습니다.");
    } catch (error) {
      Alert.alert(
        "회원가입",
        error?.message ?? "인증번호 발송에 실패했습니다. 다시 시도해 주세요.",
      );
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleVerifyEmailCode = async () => {
    if (!trimmedEmail || !trimmedVerificationCode) {
      Alert.alert("회원가입", "이메일과 인증번호를 입력해 주세요.");
      return;
    }

    setIsVerifyingEmail(true);

    try {
      await verifyEmailCode({
        email: trimmedEmail,
        code: trimmedVerificationCode,
      });
      setVerifiedEmail(trimmedEmail);
      Alert.alert("회원가입", "이메일 인증이 완료되었습니다.");
    } catch (error) {
      setVerifiedEmail("");
      Alert.alert(
        "회원가입",
        error?.message ?? "인증번호 확인에 실패했습니다. 다시 시도해 주세요.",
      );
    } finally {
      setIsVerifyingEmail(false);
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const isEmailEntered = email.trim().length > 0;
  const isVerificationCodeEntered = verificationCode.trim().length > 0;

  const handleNextPress = () => {
    if (!trimmedEmail || !password || !passwordConfirm || !trimmedNickname) {
      Alert.alert("회원가입", "필수 정보를 모두 입력해 주세요.");
      return;
    }

    if (!isEmailVerified) {
      Alert.alert("회원가입", "이메일 인증을 완료해 주세요.");
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
      passwordConfirm,
    });
  };

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
                  onChangeText={handleEmailChange}
                  placeholder="이메일 *"
                  style={styles.emailInput}
                  value={email}
                />
                <SideButton>인증</SideButton>
              </View>
              <View style={styles.row}>
                <SignupInput
                  keyboardType="number-pad"
                  onChangeText={setVerificationCode}
                  placeholder="인증번호 입력 *"
                  style={styles.emailInput}
                  value={verificationCode}
                />
                <SideButton active={isVerificationCodeEntered}
                  disabled={isVerifyingEmail}
                  onPress={handleVerifyEmailCode}
                >
                  {isEmailVerified ? "완료" : isVerifyingEmail ? "확인" : "확인"}
                </SideButton>
              </View>
            </View>

            <View style={styles.passwordGroup}>
              <PasswordInput
                autoCapitalize="none"
                autoComplete="password"
                onChangeText={setPassword}
                onToggleVisibility={() => setShowPassword((value) => !value)}
                placeholder="비밀번호 *"
                secureTextEntry={!showPassword}
                style={styles.stretchInput}
                value={password}
              />
              <PasswordInput
                autoCapitalize="none"
                autoComplete="password"
                onChangeText={setPasswordConfirm}
                onToggleVisibility={() =>
                  setShowPasswordConfirm((value) => !value)
                }
                placeholder="비밀번호 확인 *"
                secureTextEntry={!showPasswordConfirm}
                style={styles.stretchInput}
                value={passwordConfirm}
              />
            </View>

            <Text style={styles.helper}>
              (영문 대/소문자, 숫자/특수문자 중 2가지 이상 조합, 8~16자)
            </Text>

            <SignupInput
              onChangeText={setNickname}
              placeholder="닉네임 *"
              style={[styles.stretchInput, styles.nicknameInput]}
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
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[[styles.sideButton, active && styles.sideButtonActive], disabled && styles.disabled]}
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
