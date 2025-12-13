import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import PostOptionsMenu from "./PostOptionsMenu";

const NoticeCard = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <View style={styles.card}>
      {/* 3-dot button */}
      <TouchableOpacity
        style={styles.moreBtn}
        onPress={() => setShowMenu(true)}
      >
        <Ionicons name="ellipsis-vertical-outline" size={18} />
      </TouchableOpacity>

      {/* Popup */}
      <PostOptionsMenu
        visible={showMenu}
        onClose={() => setShowMenu(false)}
        onEdit={() => {
          setShowMenu(false);
          console.log("Edit");
        }}
        onShare={() => {
          setShowMenu(false);
          console.log("Share");
        }}
        onDelete={() => {
          setShowMenu(false);
          console.log("Delete");
        }}
      />
    </View>
  );
};

export default NoticeCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    position: "relative",
    marginLeft: 90,
  },

  moreBtn: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 10,
  },
});
