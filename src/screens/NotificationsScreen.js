import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppScreen, Header } from "../components";

const DEFAULT_NOTIFICATIONS = [
  {
    id: "bus-departed",
    type: "success",
    title: "버스가 출고지에서 출발했어요!",
    description: "",
    timeLabel: "방금",
    routeKey: "busTracking",
    payload: { busId: "sample-bus-id" },
  },
  {
    id: "last-train-warning",
    type: "danger",
    title: "막차가 10분 남았어요!",
    description: "지금 출발 안하면 택시비가 12,600원 나와요",
    timeLabel: "어제",
    routeKey: "lastTrainGuide",
    payload: { stationId: "sample-station-id" },
  },
];

/**
 * 알림 페이지
 * - notifications: 서버 응답을 화면용 모델로 매핑해서 주입할 수 있도록 분리한 데이터 소스
 * - onNotificationPress: 카드 클릭 시 routeKey/payload를 기반으로 상세 화면 이동에 사용
 */
export function NotificationsScreen({
  notifications = DEFAULT_NOTIFICATIONS,
  onBackPress,
  onNotificationPress,
}) {
  return (
    <AppScreen>
      <View style={styles.container}>
        <Header type="back" title="알림" onBackPress={onBackPress} />

        <View style={styles.list}>
          {notifications.map((item) => {
            const isDanger = item.type === "danger";

            return (
              <Pressable
                key={item.id}
                onPress={() => onNotificationPress?.(item)}
                style={[
                  styles.card,
                  isDanger ? styles.cardDanger : styles.cardSuccess,
                ]}
              >
                <View style={styles.cardTopRow}>
                  <View style={styles.titleWrap}>
                    <View
                      style={[
                        styles.statusDot,
                        isDanger ? styles.dotDanger : styles.dotSuccess,
                      ]}
                    />
                    <Text style={styles.cardTitle}>{item.title}</Text>
                  </View>
                  <Text style={styles.cardTime}>{item.timeLabel}</Text>
                </View>

                {item.description ? (
                  <Text
                    style={[
                      styles.cardDescription,
                      isDanger && styles.cardDescriptionDanger,
                    ]}
                  >
                    {item.description}
                  </Text>
                ) : null}
              </Pressable>
            );
          })}
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
  list: {
    paddingHorizontal: 18,
    paddingTop: 16,
    gap: 14,
  },
  card: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  cardSuccess: {
    backgroundColor: "#D8EDDD",
    borderColor: "#BFE4C8",
  },
  cardDanger: {
    backgroundColor: "#F7E7E9",
    borderColor: "#EFD3D7",
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 12,
  },
  statusDot: {
    width: 15,
    height: 15,
    borderRadius: 8,
    marginRight: 10,
  },
  dotSuccess: {
    backgroundColor: "#35C777",
  },
  dotDanger: {
    backgroundColor: "#F4666D",
  },
  cardTitle: {
    flex: 1,
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "600",
    color: "#2E3338",
  },
  cardTime: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    color: "#92A0AE",
  },
  cardDescription: {
    marginTop: 8,
    marginLeft: 25,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    color: "#7F8B97",
  },
  cardDescriptionDanger: {
    color: "#F26E75",
  },
});
