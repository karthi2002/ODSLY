export const profileData = {
    profileCard: {
      name: "John Doe",
      email: "johndoe@gmail.com",
      avatarUrl: "https://randomuser.me/api/portraits/men/75.jpg",
      upgrade: {
        label: "Upgrade Now",
        action: "Upgrade" 
      }
    },
    profileNavigation: [
        { label: "Edit Profile", icon: "person", route: "EditProfile" },
        { label: "Sportsbook Account", icon: "wallet", route: "SportsbookAccount" },
        { label: "Betting Preferences", icon: "options", route: "BettingPreferences" },
        { label: "Notifications Settings", icon: "notifications", route: "Notification" },
        { label: "App Preferences", icon: "settings", route: "AppPreferences" },
        { label: "Privacy & Security", icon: "lock-closed", route: "PrivacySecurity" },
        { label: "Logout", icon: "log-out", route: "AuthStack" }
      ]
  };
  