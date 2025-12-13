import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Modal,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const MainFilterPopup = ({
  visible,
  onClose,
  onSelectSchool,
  onSelectFaculty,
  onSelectDept,
  onSelectClass,
  onApply,
  school,
  faculty,
  department,
  className,
}) => {
  const [forYou, setForYou] = useState(true);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>

          {/* HEADER */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={28} />
            </TouchableOpacity>

            <Text style={styles.title}>Filter by</Text>

            <TouchableOpacity>
              <Text style={styles.clear}>Clear</Text>
            </TouchableOpacity>
          </View>

          {/* TOGGLE */}
          <View style={styles.row}>
            <View>
              <Text style={styles.label}>For you</Text>
              <Text style={styles.subtitle}>
                Based on your school, department, and class
              </Text>
            </View>
            <Switch value={forYou} onValueChange={setForYou} />
          </View>

          {/* NAVIGATION ITEMS */}
          {[
            { label: "School", action: onSelectSchool, name: school },
            { label: "Faculty", action: onSelectFaculty, name: faculty },
            { label: "Department", action: onSelectDept, name: department },
            { label: "Class", action: onSelectClass, name: className },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionRow}
              onPress={item.action}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10, justifyContent:"space-between"}}>
                <Text style={styles.optionText}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={20} />
              </View>
              {item.name &&
                <Text style={styles.subtitle}>
                  {item.name}
                </Text>
              }
            </TouchableOpacity>
          ))}

          {/* APPLY */}
          <TouchableOpacity style={styles.applyBtn} onPress={onApply}>
            <Text style={styles.applyText}>Apply</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
};

export default MainFilterPopup;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  container: {
    backgroundColor: "#fff",
    padding: 20,
    height: "65%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  subtitle: {
    color: "#777",
    fontSize: 12,
  },
  optionRow: {
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 0.4,
    borderColor: "#ddd",
  },
  optionText: {
    fontSize: 16,
  },
  applyBtn: {
    backgroundColor: "#7A32FF",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 30,
  },
  applyText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
