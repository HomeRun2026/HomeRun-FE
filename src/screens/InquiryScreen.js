import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import { AppScreen, Header, PrimaryButton } from "../components";
import { colors, typography } from "../theme";

export function InquiryScreen({ onBackPress }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const isSubmitDisabled = !title.trim() || !content.trim();

  const handleSubmit = async () => {
    if (isSubmitDisabled) {
      Alert.alert("문의하기", "제목과 문의 내용을 모두 입력해주세요.");
      return;
    }

    const recipient =
      process.env.EXPO_PUBLIC_INQUIRY_EMAIL ?? "contact@homerun.app";
    const subject = `[홈런 문의] ${title.trim()}`;
    const body = content.trim();
    const mailUrl = `mailto:${recipient}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    try {
      await Linking.openURL(mailUrl);
    } catch {
      Alert.alert("메일 앱을 열 수 없어요", "기기에 메일 앱 설정을 확인해주세요.");
    }
  };

  return (
    <AppScreen>
      <View style={styles.container}>
        <Header type="back" title="문의하기" onBackPress={onBackPress} />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
          >
            <TextInput
              onChangeText={setTitle}
              placeholder="제목"
              placeholderTextColor={colors.gray06}
              style={styles.titleInput}
              value={title}
            />

            <TextInput
              multiline
              onChangeText={setContent}
              placeholder="문의 내용을 작성해주세요"
              placeholderTextColor={colors.gray06}
              style={styles.contentInput}
              textAlignVertical="top"
              value={content}
            />

            <PrimaryButton
              onPress={handleSubmit}
              style={styles.submitButton}
              textStyle={styles.submitText}
            >
              등록
            </PrimaryButton>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 26,
    paddingTop: 40,
    paddingBottom: 38,
  },
  titleInput: {
    height: 54,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.gray04,
    borderRadius: 8,
    backgroundColor: colors.gray02,
    color: colors.gray09,
    ...typography.body01Sb,
  },
  contentInput: {
    flex: 1,
    minHeight: 430,
    marginTop: 20,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    borderWidth: 1,
    borderColor: colors.gray04,
    borderRadius: 8,
    backgroundColor: colors.gray02,
    color: colors.gray09,
    ...typography.body01Sb,
  },
  submitButton: {
    marginTop: 38,
    display: "flex",
    width: 328,
    maxWidth: "100%",
    height: 54,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    alignSelf: "center",
    borderRadius: 8,
    backgroundColor: colors.main,
  },
  submitText: {
    ...typography.body01Sb,
    color: colors.white,
  },
});
