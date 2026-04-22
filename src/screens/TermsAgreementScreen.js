import React, { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppScreen, PrimaryButton } from "../components";
import { colors, layout, typography } from "../theme";

const TERMS = [
  {
    id: "service",
    title: "서비스 이용약관 동의 (필수)",
    description:
      "서비스 이용약관 동의 여기다 작성",
  },
  {
    id: "privacy",
    title: "개인정보 수집 및 이용 동의 (필수)",
    description:
      "개인정보 수집 및 이용 동의 여기다 작성",
  },
];

export function TermsAgreementScreen({ onBackPress, onConfirmPress }) {
  const [checkedMap, setCheckedMap] = useState({
    service: false,
    privacy: false,
  });
  const [expandedMap, setExpandedMap] = useState({
    service: false,
    privacy: false,
  });

  const allChecked = useMemo(
    () => TERMS.every((term) => checkedMap[term.id]),
    [checkedMap],
  );

  const toggleCheck = (id) => {
    setCheckedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleExpand = (id) => {
    setExpandedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleAll = () => {
    const nextChecked = !allChecked;

    setCheckedMap(() =>
      TERMS.reduce(
        (acc, term) => ({
          ...acc,
          [term.id]: nextChecked,
        }),
        {},
      ),
    );
  };

  return (
    <AppScreen>
      <View style={styles.header}>
        <Pressable
          accessibilityLabel="뒤로가기"
          hitSlop={8}
          onPress={onBackPress}
          style={styles.backButton}
        >
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
        <Text style={styles.headerTitle}>회원가입</Text>
      </View>

      <View style={styles.container}>
        <View>
          <Text style={styles.title}>약관에 동의해 주세요.</Text>

          <View style={styles.termsList}>
            {TERMS.map((term) => {
              const checked = checkedMap[term.id];
              const expanded = expandedMap[term.id];

              return (
                <View key={term.id} style={styles.termItem}>
                  <View style={styles.termRow}>
                    <Pressable
                      accessibilityRole="checkbox"
                      accessibilityState={{ checked }}
                      hitSlop={8}
                      onPress={() => toggleCheck(term.id)}
                      style={styles.checkPressable}
                    >
                      <View style={[styles.check, checked && styles.checkOn]} />
                    </Pressable>

                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={`${term.title} ${expanded ? "접기" : "펼치기"}`}
                      onPress={() => toggleExpand(term.id)}
                      style={styles.termRowButton}
                    >
                      <Text style={styles.termTitle}>{term.title}</Text>
                      <Text style={styles.expandIcon}>{expanded ? "⌃" : "⌄"}</Text>
                    </Pressable>
                  </View>

                  {expanded && (
                    <View style={styles.detailBox}>
                      <Text style={styles.detailText}>{term.description}</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerDivider} />

          <Pressable
            accessibilityRole="checkbox"
            accessibilityState={{ checked: allChecked }}
            onPress={toggleAll}
            style={styles.allAgreeButton}
          >
            <View style={[styles.check, allChecked && styles.checkOn]} />
            <Text style={styles.allAgreeText}>전체 동의</Text>
          </Pressable>

          <PrimaryButton onPress={onConfirmPress} style={styles.confirmButton}>
            완료
          </PrimaryButton>
        </View>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: layout.screenMargin,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray04,
    backgroundColor: colors.white,
  },
  backButton: {
    width: 28,
    height: 40,
    justifyContent: "center",
  },
  backIcon: {
    fontSize: 35,
    lineHeight: 35,
    color: colors.gray07,
    fontWeight: "400",
  },
  headerTitle: {
    ...typography.head01Sb,
    color: colors.gray09,
  },
  container: {
    flex: 1,
    paddingHorizontal: layout.screenMargin,
    paddingTop: 30,
    justifyContent: "space-between",
  },
  title: {
    ...typography.head01Sb,
    color: colors.gray09,
  },
  termsList: {
    marginTop: 24,
    gap: 10,
  },
  termItem: {
    gap: 8,
  },
  termRow: {
    minHeight: 36,
    flexDirection: "row",
    alignItems: "center",
  },
  termRowButton: {
    flex: 1,
    minHeight: 36,
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  checkPressable: {
    padding: 2,
  },
  check: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray05,
    backgroundColor: colors.gray03,
  },
  checkOn: {
    borderColor: colors.main,
    backgroundColor: colors.main,
  },
  termTitle: {
    flex: 1,
    ...typography.body01R,
    color: colors.gray09,
  },
  expandIcon: {
    width: 24,
    textAlign: "center",
    fontSize: 18,
    lineHeight: 24,
    color: colors.gray06,
    fontWeight: "500",
  },
  detailBox: {
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: colors.gray03,
  },
  detailText: {
    ...typography.body02M,
    color: colors.gray07,
  },
  footer: {
    paddingBottom: 36,
  },
  footerDivider: {
    height: 1,
    backgroundColor: colors.gray04,
  },
  allAgreeButton: {
    marginTop: 26,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  allAgreeText: {
    ...typography.body01R,
    color: colors.gray07,
  },
  confirmButton: {
    marginTop: 20,
  },
});
