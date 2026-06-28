import React, { useState } from "react";

import {
  AccountInfoScreen,
  ChangePasswordScreen,
  FindEmailPasswordScreen,
  HomeScreen,
  InquiryScreen,
  LoginScreen,
  NoticeDetailScreen,
  NoticesScreen,
  NotificationsScreen,
  SignupCompleteScreen,
  SignupScreen,
  TermsAgreementScreen,
} from "./src/screens";

export default function App() {
  const [screen, setScreen] = useState("login");
  const [selectedNotice, setSelectedNotice] = useState(null);

  if (screen === "signup") {
    return (
      <SignupScreen
        onBackPress={() => setScreen("login")}
        onNextPress={() => setScreen("termsAgreement")}
      />
    );
  }

  if (screen === "termsAgreement") {
    return (
      <TermsAgreementScreen
        onBackPress={() => setScreen("signup")}
        onConfirmPress={() => setScreen("signupComplete")}
      />
    );
  }

  if (screen === "signupComplete") {
    return (
      <SignupCompleteScreen
        onBackPress={() => setScreen("termsAgreement")}
        onHomePress={() => setScreen("home")}
        onLoginPress={() => setScreen("login")}
      />
    );
  }

  if (screen === "home") {
    return (
      <HomeScreen
        onOpenAccountInfo={() => setScreen("accountInfo")}
        onOpenContact={() => setScreen("inquiryHomeMyPage")}
        onOpenNotices={() => setScreen("noticesHomeMyPage")}
        onOpenNotifications={() => setScreen("notificationsHome")}
        onOpenPassword={() => setScreen("changePasswordHomeMyPage")}
      />
    );
  }

  if (screen === "homeMyPage") {
    return (
      <HomeScreen
        initialTab="myPage"
        onOpenAccountInfo={() => setScreen("accountInfo")}
        onOpenContact={() => setScreen("inquiryHomeMyPage")}
        onOpenNotices={() => setScreen("noticesHomeMyPage")}
        onOpenNotifications={() => setScreen("notificationsHomeMyPage")}
        onOpenPassword={() => setScreen("changePasswordHomeMyPage")}
      />
    );
  }

  if (screen === "inquiryHomeMyPage") {
    return <InquiryScreen onBackPress={() => setScreen("homeMyPage")} />;
  }

  if (screen === "noticesHomeMyPage") {
    return (
      <NoticesScreen
        onBackPress={() => setScreen("homeMyPage")}
        onNoticePress={(notice) => {
          setSelectedNotice(notice);
          setScreen("noticeDetailHomeMyPage");
        }}
      />
    );
  }

  if (screen === "noticeDetailHomeMyPage") {
    return (
      <NoticeDetailScreen
        notice={selectedNotice}
        onBackPress={() => setScreen("noticesHomeMyPage")}
      />
    );
  }

  if (screen === "notificationsHome") {
    return <NotificationsScreen onBackPress={() => setScreen("home")} />;
  }

  if (screen === "notificationsHomeMyPage") {
    return <NotificationsScreen onBackPress={() => setScreen("homeMyPage")} />;
  }

  if (screen === "accountInfo") {
    return (
      <AccountInfoScreen
        onBackPress={() => setScreen("homeMyPage")}
        onPasswordPress={() => setScreen("changePassword")}
      />
    );
  }

  if (screen === "changePassword") {
    return (
      <ChangePasswordScreen
        onBackPress={() => setScreen("accountInfo")}
        onConfirmPress={() => setScreen("accountInfo")}
      />
    );
  }

  if (screen === "changePasswordHomeMyPage") {
    return (
      <ChangePasswordScreen
        onBackPress={() => setScreen("homeMyPage")}
        onConfirmPress={() => setScreen("homeMyPage")}
      />
    );
  }

  if (screen === "findPassword") {
    return (
      <FindEmailPasswordScreen
        onBackPress={() => setScreen("login")}
        onConfirmPress={() => setScreen("login")}
      />
    );
  }

  return (
    <LoginScreen
      onFindPasswordPress={() => setScreen("findPassword")}
      onLoginPress={() => setScreen("home")}
      onSignupPress={() => setScreen("signup")}
    />
  );
}
