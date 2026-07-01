import React from "react";
import { StyleSheet, TextInput } from "react-native";

import { colors, typography } from "../theme";

export function FormTextInput({ style, ...props }) {
  return (
    <TextInput
      placeholderTextColor={colors.gray06}
      selectionColor={colors.gray06}
      style={[styles.input, style]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    display: "flex",
    height: 54,
    padding: 16,
    alignItems: "center",
    gap: 10,
    alignSelf: "stretch",
    borderWidth: 1,
    borderColor: colors.gray03,
    borderRadius: 8,
    backgroundColor: colors.gray02,
    color: colors.black,
    ...typography.body01Sb,
    fontStyle: "normal",
    letterSpacing: -0.16,
    textAlign: "left",
  },
});
