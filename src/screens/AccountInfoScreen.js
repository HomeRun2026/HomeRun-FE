import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { AppScreen } from "../components";

export function AccountInfoScreen({ onBackPress, onPasswordPress }) {
  const [nickname, setNickname] = useState("홍길동");
  const [nicknameDraft, setNicknameDraft] = useState("");
  const [nicknameEditMode, setNicknameEditMode] = useState(false);

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
          <Text style={styles.headerTitle}>계정 정보</Text>
        </View>

        <View style={styles.body}>
          <Pressable
            onPress={() => {
              setNicknameDraft("");
              setNicknameEditMode(true);
            }}
            style={styles.fieldRow}
          >
            <View>
              <Text style={styles.fieldLabel}>닉네임</Text>
              {nicknameEditMode ? (
                <TextInput
                  autoFocus
                  onBlur={() => {
                    if (nicknameDraft.trim()) {
                      setNickname(nicknameDraft.trim());
                    }
                  }}
                  onChangeText={setNicknameDraft}
                  placeholder="이름수정"
                  placeholderTextColor="#A7B5C3"
                  style={styles.nicknameInput}
                  value={nicknameDraft}
                />
              ) : (
                <Text style={styles.fieldValue}>{nickname}</Text>
              )}
            </View>
            <Feather color="#BCC6D1" name="chevron-right" size={24} />
          </Pressable>

          <Pressable style={styles.fieldRow}>
            <View>
              <Text style={styles.fieldLabel}>이메일</Text>
              <Text style={styles.fieldValue}>abcdg@gmail.com</Text>
            </View>
            <Feather color="#BCC6D1" name="chevron-right" size={24} />
          </Pressable>

          <Pressable onPress={onPasswordPress} style={styles.fieldRow}>
            <View>
              <Text style={styles.fieldLabel}>비밀번호</Text>
              <Text style={styles.fieldValue}>************</Text>
            </View>
            <Feather color="#BCC6D1" name="chevron-right" size={24} />
          </Pressable>
        </View>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FA",
  },
  statusSpacer: {
    height: 14,
    backgroundColor: "#F4F7FA",
  },
  header: {
    height: 44,
    paddingHorizontal: 20,
    paddingBottom: 8,
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
    fontSize: 18,
    lineHeight: 22,
    fontWeight: "700",
    color: "#232323",
  },
  body: {
    paddingTop: 4,
  },
  fieldRow: {
    minHeight: 92,
    paddingLeft: 24,
    paddingRight: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  fieldLabel: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "700",
    color: "#464D56",
  },
  fieldValue: {
    marginTop: 2,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "500",
    color: "#8A9BAC",
  },
  nicknameInput: {
    marginTop: 4,
    width: 160,
    height: 34,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E2E8EF",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "500",
    color: "#46515D",
  },
});
