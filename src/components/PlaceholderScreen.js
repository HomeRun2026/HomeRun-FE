import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { AppScreen } from "./AppScreen";
import { Header } from "./Header";
import { colors, layout, typography } from "../theme";

export function PlaceholderScreen({ title, onBackPress }) {
  return (
    <AppScreen>
      <View style={styles.container}>
        <Header type="back" title={title} onBackPress={onBackPress} />

        <View style={styles.content}>
          <Text style={styles.message}>준비 중인 화면입니다.</Text>
        </View>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginHorizontal: layout.screenMargin,
    justifyContent: "center",
  },
  message: {
    ...typography.head01Sb,
    color: colors.gray09,
    textAlign: "center",
  },
});
