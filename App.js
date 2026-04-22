import React, { useState } from "react";

import {
  AccountInfoScreen,
  ChangePasswordScreen,
  FindEmailPasswordScreen,
  HomeScreen,
  LoginScreen,
  SignupCompleteScreen,
  SignupScreen,
  TermsAgreementScreen,
} from "./src/screens";

export default function App() {
  const [screen, setScreen] = useState("login");

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
        onHomePress={() => setScreen("home")}
        onLoginPress={() => setScreen("login")}
      />
    );
  }

  if (screen === "home") {
    return <HomeScreen onOpenAccountInfo={() => setScreen("accountInfo")} />;
  }

  if (screen === "homeMyPage") {
    return (
      <HomeScreen
        initialTab="myPage"
        onOpenAccountInfo={() => setScreen("accountInfo")}
      />
    );
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
