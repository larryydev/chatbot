import { Text, View } from "react-native";

import IntroAnimation from "@/components/IntroAnimation";
import BottomLoginModal from "@/components/BottomLoginModal";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >

    <IntroAnimation /> 
    <BottomLoginModal />
    </View>
  );
}
