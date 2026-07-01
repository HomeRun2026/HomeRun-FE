import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import { AppScreen, Header, PrimaryButton } from "../components";
import BackIcon from "../../assets/images/L.svg";
import { colors, layout, typography } from "../theme";

export function AccountInfoScreen({ onBackPress, onConfirmPress }) {
  const [nickname, setNickname] = useState("");

  return (
    <AppScreen>
      <View style={styles.container}>
        <Header
          type="back"
          title="닉네임 변경"
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
              <TextInput
                cursorColor={colors.black}
                onChangeText={setNickname}
                placeholder="닉네임"
                placeholderTextColor={colors.gray06}
                selectionColor={colors.black}
                style={styles.input}
                underlineColorAndroid="transparent"
                value={nickname}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        <View style={styles.footer}>
          <PrimaryButton
            onPress={onConfirmPress}
            style={styles.confirmButton}
            textStyle={styles.confirmText}
          >
            확인
          </PrimaryButton>
        </View>
      </View>
    </AppScreen>
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
  input: {
    display: "flex",
    width: "100%",
    height: 54,
    padding: 16,
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: colors.gray03,
    borderRadius: 8,
    backgroundColor: colors.gray02,
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
  footer: {
    paddingHorizontal: layout.screenMargin,
    paddingBottom: 64,
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
