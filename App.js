import React, { useState } from "react";

import { HomeScreen, LoginScreen, SignupScreen } from "./src/screens";

export default function App() {
  const [screen, setScreen] = useState("login");

  if (screen === "signup") {
    return <SignupScreen onBackPress={() => setScreen("login")} />;
  }

  if (screen === "home") {
    return <HomeScreen />;
  }

  return (
    <LoginScreen
      onLoginPress={() => setScreen("home")}
      onSignupPress={() => setScreen("signup")}
    />
  );
}
