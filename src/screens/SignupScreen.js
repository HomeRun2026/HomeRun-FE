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
                  onChangeText={handleEmailChange}
                  placeholder="이메일 *"
                  style={styles.flexInput}
                  value={email}
                />
                <SideButton
                  disabled={isSendingEmail}
                  onPress={handleSendEmailCode}
                >
                  {isSendingEmail ? "전송" : "인증"}
                </SideButton>
              </View>
              <View style={styles.row}>
                <SignupInput
                  keyboardType="number-pad"
                  onChangeText={setVerificationCode}
                  placeholder="인증번호 입력 *"
                  style={styles.flexInput}
                  value={verificationCode}
                />
                <SideButton
                  disabled={isVerifyingEmail}
                  onPress={handleVerifyEmailCode}
                >
                  {isEmailVerified ? "완료" : isVerifyingEmail ? "확인" : "확인"}
                </SideButton>
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
              영문 대/소문자, 숫자, 특수문자 중 2가지 이상 조합, 8~16자
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

function SideButton({ children, disabled = false, onPress }) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[styles.sideButton, disabled && styles.disabled]}
    >
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
  disabled: {
    opacity: 0.6,
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
