import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

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
  PrivacyPolicyScreen,
  SignupCompleteScreen,
  SignupScreen,
  TermsAgreementScreen,
  TermsOfServiceScreen,
} from "./src/screens";
import { routes } from "./src/navigation/routes";

const Stack = createNativeStackNavigator();

function resetTo(navigation, name, params) {
  navigation.reset({
    index: 0,
    routes: [{ name, params }],
  });
}

function goBackOrReset(navigation, fallbackRoute = routes.home, params) {
  if (navigation.canGoBack()) {
    navigation.goBack();
    return;
  }

  resetTo(navigation, fallbackRoute, params);
}

function LoginRoute({ navigation }) {
  return (
    <LoginScreen
      onFindPasswordPress={() => navigation.navigate(routes.findPassword)}
      onLoginPress={() => resetTo(navigation, routes.home)}
      onSignupPress={() => navigation.navigate(routes.signup)}
    />
  );
}

function SignupRoute({ navigation }) {
  return (
    <SignupScreen
      onBackPress={() => goBackOrReset(navigation, routes.login)}
      onNextPress={(signupForm) =>
        navigation.navigate(routes.termsAgreement, { signupForm })
      }
    />
  );
}

function TermsAgreementRoute({ navigation, route }) {
  return (
    <TermsAgreementScreen
      onBackPress={() => goBackOrReset(navigation, routes.signup)}
      onConfirmPress={() => navigation.navigate(routes.signupComplete)}
      signupForm={route.params?.signupForm}
    />
  );
}

function SignupCompleteRoute({ navigation }) {
  return (
    <SignupCompleteScreen
      onHomePress={() => resetTo(navigation, routes.home)}
      onLoginPress={() => resetTo(navigation, routes.login)}
    />
  );
}

function HomeRoute({ navigation, route }) {
  return (
    <HomeScreen
      initialTab={route.params?.initialTab ?? "home"}
      onOpenAccountInfo={() => navigation.navigate(routes.accountInfo)}
      onOpenContact={() => navigation.navigate(routes.inquiry)}
      onOpenNotices={() => navigation.navigate(routes.notices)}
      onOpenNotifications={() => navigation.navigate(routes.notifications)}
      onOpenPassword={() => navigation.navigate(routes.changePassword)}
      onOpenPrivacy={() => navigation.navigate(routes.privacyPolicy)}
      onOpenTerms={() => navigation.navigate(routes.termsOfService)}
    />
  );
}

function InquiryRoute({ navigation }) {
  return <InquiryScreen onBackPress={() => goBackOrReset(navigation)} />;
}

function NoticesRoute({ navigation }) {
  return (
    <NoticesScreen
      onBackPress={() => goBackOrReset(navigation)}
      onNoticePress={(notice) =>
        navigation.navigate(routes.noticeDetail, { notice })
      }
    />
  );
}

function NoticeDetailRoute({ navigation, route }) {
  return (
    <NoticeDetailScreen
      notice={route.params?.notice}
      onBackPress={() => goBackOrReset(navigation, routes.notices)}
    />
  );
}

function PrivacyPolicyRoute({ navigation }) {
  return <PrivacyPolicyScreen onBackPress={() => goBackOrReset(navigation)} />;
}

function TermsOfServiceRoute({ navigation }) {
  return <TermsOfServiceScreen onBackPress={() => goBackOrReset(navigation)} />;
}

function NotificationsRoute({ navigation }) {
  return <NotificationsScreen onBackPress={() => goBackOrReset(navigation)} />;
}

function AccountInfoRoute({ navigation }) {
  return (
    <AccountInfoScreen
      onBackPress={() => goBackOrReset(navigation)}
      onConfirmPress={() => goBackOrReset(navigation)}
    />
  );
}

function ChangePasswordRoute({ navigation }) {
  return (
    <ChangePasswordScreen
      onBackPress={() => goBackOrReset(navigation)}
      onConfirmPress={() => goBackOrReset(navigation)}
    />
  );
}

function FindPasswordRoute({ navigation }) {
  return (
    <FindEmailPasswordScreen
      onBackPress={() => goBackOrReset(navigation, routes.login)}
      onConfirmPress={() => goBackOrReset(navigation, routes.login)}
    />
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={routes.login}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen component={LoginRoute} name={routes.login} />
          <Stack.Screen component={SignupRoute} name={routes.signup} />
          <Stack.Screen
            component={TermsAgreementRoute}
            name={routes.termsAgreement}
          />
          <Stack.Screen
            component={SignupCompleteRoute}
            name={routes.signupComplete}
          />
          <Stack.Screen component={HomeRoute} name={routes.home} />
          <Stack.Screen component={InquiryRoute} name={routes.inquiry} />
          <Stack.Screen component={NoticesRoute} name={routes.notices} />
          <Stack.Screen
            component={NoticeDetailRoute}
            name={routes.noticeDetail}
          />
          <Stack.Screen
            component={PrivacyPolicyRoute}
            name={routes.privacyPolicy}
          />
          <Stack.Screen
            component={TermsOfServiceRoute}
            name={routes.termsOfService}
          />
          <Stack.Screen
            component={NotificationsRoute}
            name={routes.notifications}
          />
          <Stack.Screen component={AccountInfoRoute} name={routes.accountInfo} />
          <Stack.Screen
            component={ChangePasswordRoute}
            name={routes.changePassword}
          />
          <Stack.Screen component={FindPasswordRoute} name={routes.findPassword} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
