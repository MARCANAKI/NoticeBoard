import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const FilterSelectPopup = ({ visible, title, data, onClose, onApply }) => {
  const [selected, setSelected] = useState(null);

  const clearSelection = () => setSelected(null);

  const handleApply = () => {
    onApply(selected);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          
          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} />
            </TouchableOpacity>

            <Text style={styles.title}>{title}</Text>

            <TouchableOpacity onPress={clearSelection}>
              <Text style={styles.clear}>Clear</Text>
            </TouchableOpacity>
          </View>

          {/* LIST */}
          <FlatList
            data={data}
            keyExtractor={(item) => item}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.row}
                onPress={() => setSelected(item)}
              >
                <Text style={styles.rowText}>{item}</Text>

                <Ionicons
                  name={
                    selected === item
                      ? "radio-button-on"
                      : "radio-button-off"
                  }
                  size={22}
                  color="#7A32FF"
                />
              </TouchableOpacity>
            )}
          />

          {/* APPLY */}
          <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
            <Text style={styles.applyText}>Apply</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

export default FilterSelectPopup;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#fff",
    height: "85%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  clear: {
    color: "#7A32FF",
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 0.4,
    borderColor: "#ddd",
  },
  rowText: {
    fontSize: 16,
  },
  applyBtn: {
    backgroundColor: "#7A32FF",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 30,
  },
  applyText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
});
