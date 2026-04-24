import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { AppScreen, Header } from "../components";
import { DEFAULT_NOTICE_ITEMS } from "./NoticesScreen";

const FALLBACK_NOTICE = DEFAULT_NOTICE_ITEMS[0];

/**
 * 공지 상세 페이지
 * - notice: 목록에서 선택된 공지 객체
 * - 본문 렌더링은 서버에서 내려주는 markdown/html 포맷으로 교체 가능
 */
export function NoticeDetailScreen({ notice = FALLBACK_NOTICE, onBackPress }) {
  return (
    <AppScreen>
      <View style={styles.container}>
        <Header type="back" title="공지사항" onBackPress={onBackPress} />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>{notice.title}</Text>

          <View style={styles.metaRow}>
            <Text style={styles.metaText}>{notice.dateText}</Text>
            <Text style={styles.metaDivider}>|</Text>
            <Text style={styles.metaText}>조회수 {notice.viewCount}</Text>
            <Text style={styles.metaDivider}>|</Text>
            <Text style={styles.metaText}>{notice.author}</Text>
          </View>

          <Text style={styles.body}>{notice.content}</Text>
        </ScrollView>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FA",
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: "700",
    color: "#4A525A",
  },
  metaRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  metaText: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "500",
    color: "#B3BFCA",
  },
  metaDivider: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "500",
    color: "#D1D9E1",
  },
  body: {
    marginTop: 26,
    fontSize: 17,
    lineHeight: 30,
    fontWeight: "500",
    color: "#4A525A",
  },
});
