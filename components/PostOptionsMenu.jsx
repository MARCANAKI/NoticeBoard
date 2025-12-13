import { Ionicons } from "@expo/vector-icons";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const PostOptionsMenu = ({ visible, onClose, onEdit, onShare, onDelete }) => {
  if (!visible) return null;

  return (
    <TouchableOpacity style={styles.overlay} onPress={onClose} activeOpacity={1}>
      <View style={styles.menu}>
        {/* Edit */}
        <TouchableOpacity style={styles.menuItem} onPress={onEdit}>
          <Text style={styles.menuText}>Edit</Text>
          <Ionicons name="pencil-outline" size={18} color="#444" />
        </TouchableOpacity>

        {/* Share */}
        <TouchableOpacity style={styles.menuItem} onPress={onShare}>
          <Text style={styles.menuText}>Share</Text>
          <Ionicons name="paper-plane-outline" size={18} color="#444" />
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Delete */}
        <TouchableOpacity style={styles.menuItem} onPress={onDelete}>
          <Text style={[styles.menuText, { color: "#E53935" }]}>
            Delete
          </Text>
          <Ionicons name="trash-outline" size={18} color="#E53935" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default PostOptionsMenu;
const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 100,
  },

  menu: {
    position: "absolute",
    top: 40,
    right: 12,
    width: 150,
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingVertical: 6,
    elevation: 5,
  },

  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 10,
    alignItems: "center",
  },

  menuText: {
    fontSize: 14,
    color: "#333",
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 4,
  },
});
