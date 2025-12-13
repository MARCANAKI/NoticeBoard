import { Ionicons } from "@expo/vector-icons";
import { Dislike, FilterEdit, Flag, Like1, Send2 } from "iconsax-react-native";
import React, { useState } from "react";
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Switch } from "react-native-gesture-handler";

import FilterSelectPopup from "../../components/FilterSelectPopup";
import MainFilterPopup from "../../components/MainFilterPopup";

import { router } from "expo-router";
import FilterData from "../../constants/FilterData";


interface Notice {
  id: number;
  message: string;
  type: "School Admin" | "Student" | "Lecturer" | "Class Rep";
  user: {
    id: number;
    name: string;
    profile_photo_url?: string | null;
    location_type: string;
  };
  school_name: string;
  created_at: string;
  class_level: string;
  notice_image?: string | null;
  notice_text?: string | null;
  font_type?: string | null;
  themed_notice: {
    id: number;
    name: string;
    primary_color: string;
    secondary_color: string;
    font_type: string;
  };
}

const notices: Notice[] = [
  {
    id: 1,
    message: "School assembly will hold tomorrow by 8 AM. All students must attend.",
    type: "School Admin",
    user: {
      id: 11,
      name: "Mrs. Adeola Johnson",
      profile_photo_url: "https://picsum.photos/seed/user1/200/300",
      location_type: "Lagos State Polytechnic"
    },
    school_name: "Bright Future Academy",
    created_at: "2025-01-15T09:24:00Z",
    class_level: "JSS 2",
    notice_image: "https://picsum.photos/seed/notice1/300/500",
    notice_text: "Please ensure punctuality.",
    font_type: "Roboto",
    themed_notice: {
      id: 101,
      name: "Blue Harmony",
      primary_color: "#1E3A8A",
      secondary_color: "#3B82F6",
      font_type: "Montserrat"
    }
  },

  {
    id: 2,
    message: "Congratulations to all students who participated in the Inter-House Sports competition!",
    type: "Class Rep",
    user: {
      id: 22,
      name: "Coach Emmanuel Udo",
      profile_photo_url: "https://picsum.photos/seed/user2/200/300",
      location_type: "staff"
    },
    school_name: "New Vision College",
    created_at: "2025-02-03T14:10:00Z",
    class_level: "SSS 1",
    notice_image: "https://picsum.photos/seed/notice2/320/480",
    notice_text: "You all made us proud!",
    font_type: "Poppins",
    themed_notice: {
      id: 102,
      name: "Sporty Theme",
      primary_color: "#10B981",
      secondary_color: "#6EE7B7",
      font_type: "Inter"
    }
  },

  {
    id: 3,
    message: "There will be a PTA meeting this Friday. Parents are expected to attend.",
    type: "Student",
    user: {
      id: 33,
      name: "Principal Okon",
      profile_photo_url: "https://picsum.photos/seed/user3/200/300",
      location_type: "admin"
    },
    school_name: "Unity International School",
    created_at: "2025-01-28T11:55:00Z",
    class_level: "ALL",
    notice_image: "https://picsum.photos/seed/notice3/280/420",
    notice_text: null,
    font_type: "Open Sans",
    themed_notice: {
      id: 103,
      name: "Serene Green",
      primary_color: "#065F46",
      secondary_color: "#34D399",
      font_type: "Lato"
    }
  },

  {
    id: 4,
    message: "Mid-term exams start next week. Make sure to complete revisions.",
    type: "Lecturer",
    user: {
      id: 44,
      name: "Mr. David Akpan",
      profile_photo_url: null,
      location_type: "teacher"
    },
    school_name: "Golden Heights School",
    created_at: "2025-02-10T08:00:00Z",
    class_level: "JSS 3",
    notice_image: "https://picsum.photos/seed/notice4/300/520",
    notice_text: "Study hard and avoid exam malpractice.",
    font_type: "Nunito",
    themed_notice: {
      id: 104,
      name: "Vibrant Orange",
      primary_color: "#EA580C",
      secondary_color: "#FDBA74",
      font_type: "Quicksand"
    }
  },

  {
    id: 5,
    message: "New hostel rules have been released. Students should check the notice board.",
    type: "School Admin",
    user: {
      id: 55,
      name: "Hostel Supervisor Grace",
      profile_photo_url: "https://picsum.photos/seed/user5/200/300",
      location_type: "staff"
    },
    school_name: "Crestwood Boarding School",
    created_at: "2025-02-20T17:40:00Z",
    class_level: "Boarders",
    notice_image: "https://picsum.photos/seed/notice5/310/500",
    notice_text: null,
    font_type: null,
    themed_notice: {
      id: 105,
      name: "Royal Purple",
      primary_color: "#6D28D9",
      secondary_color: "#C4B5FD",
      font_type: "Georgia"
    }
  }
];


// ----------------------
// COMPONENT
// ----------------------

const NoticeBoard = () => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [showMain, setShowMain] = useState(false);

  const [showSchool, setShowSchool] = useState(false);
  const [showFaculty, setShowFaculty] = useState(false);
  const [showDept, setShowDept] = useState(false);
  const [showClass, setShowClass] = useState(false);

  const [school, setSchool] = useState(null);
  const [faculty, setFaculty] = useState(null);
  const [department, setDepartment] = useState(null);
  const [classLevel, setClassLevel] = useState(null);


  /**
   * Formats a date as a relative time string (e.g., "5 minutes ago").
   *
   * @param {string | Date} date The date to format.
   * @returns {string} The formatted relative time string.
   */
  const formatDistanceToNow = (date: string | Date): string => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);

    const intervals: { [key: string]: number } = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    for (const interval in intervals) {
      const intervalInSeconds = intervals[interval];
      const count = Math.floor(diffInSeconds / intervalInSeconds);
      if (count >= 1) {
        return `${count} ${interval}${count !== 1 ? 's' : ''} ago`;
      }
    }

    return 'just now';
  }



  return (
    <ScrollView style={styles.container}>
      {/* Add Button */}
      <View>
        <View style={styles.addButton}>
          <TouchableOpacity
            style={styles.AddButtonCon}
            onPress={() => router.push("/(tabs)/explore")}
          >
            <Ionicons name="add-circle" size={20} color="#6A0DFF" />
            <Text style={styles.NoticesText}>My Notices</Text>
          </TouchableOpacity>

        </View>
      </View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Notice Board</Text>
        <View style={styles.filterButton}>
          <TouchableOpacity onPress={() => setShowMain(true)}>
            <FilterEdit size={24} variant="Linear" color="#697689" />
          </TouchableOpacity>
        </View>
      </View>

      {/* SELECTED FILTER TAGS */}
      <View style={styles.tagContainer}>
        {school && <View style={styles.tag}>
          <Text style={styles.tagText}>School: {school}</Text>
          <Ionicons onPress={() => setSchool(null)} name="close" size={20} color="#fff" />
        </View>}
        {faculty && <View style={styles.tag}>
          <Text style={styles.tagText}>Faculty: {faculty}</Text>
          <Ionicons onPress={() => setFaculty(null)} name="close" size={20} color="#fff" />
        </View>}
        {department && <View style={styles.tag}>
          <Text style={styles.tagText}>Department: {department}</Text>
          <Ionicons onPress={() => setDepartment(null)} name="close" size={20} color="#fff" />
        </View>}
        {classLevel && <View style={styles.tag}>
          <Text style={styles.tagText}>Class: {classLevel}</Text>
          <Ionicons onPress={() => setClassLevel(null)} name="close" size={20} color="#fff" />
        </View>}
      </View>

      <MainFilterPopup
        visible={showMain}
        onClose={() => setShowMain(false)}
        onSelectSchool={() => { setShowMain(false); setShowSchool(true); }}
        onSelectFaculty={() => { setShowMain(false); setShowFaculty(true); }}
        onSelectDept={() => { setShowMain(false); setShowDept(true); }}
        onSelectClass={() => { setShowMain(false); setShowClass(true); }}
        onApply={() => setShowMain(false)}
        school={school}
        faculty={faculty}
        department={department}
        className={classLevel}
      />

      <FilterSelectPopup
        visible={showSchool}
        title="School"
        data={FilterData.schoolList}
        onClose={() => setShowSchool(false)}
        onApply={setSchool}
      />

      <FilterSelectPopup
        visible={showFaculty}
        title="Faculty"
        data={FilterData.facultyList}
        onClose={() => setShowFaculty(false)}
        onApply={setFaculty}
      />

      <FilterSelectPopup
        visible={showDept}
        title="Department"
        data={FilterData.departmentList}
        onClose={() => setShowDept(false)}
        onApply={setDepartment}
      />

      <FilterSelectPopup
        visible={showClass}
        title="Class"
        data={FilterData.classList}
        onClose={() => setShowClass(false)}
        onApply={setClassLevel}
      />



      {/* DYNAMICALLY RENDER NOTICES */}
      {notices.map((item) => (
        <View key={item.id} style={styles.card}>
          {/* User info */}
          <View style={styles.row}>
            <Image
              source={{
                uri:
                  item.user.profile_photo_url ||
                  "https://picsum.photos/seed/default/200",
              }}
              style={styles.avatar}
            />

            <View style={{ marginLeft: 10 }}>
              <View style={styles.nameTime}>
                <Text style={styles.name}>{item.user.name}</Text>
                <Text style={styles.time}> • {formatDistanceToNow(item.created_at)}</Text>
              </View>
              <Text style={styles.time}>
                {item.user.location_type}
              </Text>
            </View>

            <View
              style={[
                styles.badge,
                { backgroundColor: item.themed_notice.secondary_color + "33" },
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  { color: item.themed_notice.primary_color },
                ]}
              >
                {item.type.toUpperCase()}
              </Text>
            </View>
          </View>

          {/* Notice Image */}
          {item.notice_image && (
            <Image source={{ uri: item.notice_image }} style={styles.postImage} />
          )}

          {/* Message */}
          <Text style={styles.caption}>{item.message}</Text>

          {/* ACTION BUTTONS */}
          <View style={styles.actions}>
            <View style={styles.actionItems}>
              <View style={styles.actionItem}>
                <Like1 size={18} color="#697689" />
                <Text style={styles.actionText}>Lik</Text>
              </View>
              <View style={styles.actionItem}>
                <Dislike size={18} color="#697689" />
                <Text style={styles.actionText}>1.2k</Text>
              </View>
              <View style={styles.actionItem}>
                <Send2 size={18} color="#697689" />
                <Text style={styles.actionText}></Text>
              </View>
            </View>
            <Flag size={18} color="#697689" />
          </View>
        </View>
      ))}

      {/* FILTER POPUP */}

      <Modal
        visible={filterVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>

            {/* HEADER */}
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setFilterVisible(false)}>
                <Ionicons name="close" size={22} color="#000" />
              </TouchableOpacity>

              <Text style={styles.modalTitle}>Filter by</Text>

              <TouchableOpacity>
                <Text style={styles.clearText}>Clear</Text>
              </TouchableOpacity>
            </View>

            {/* TOGGLE */}
            <View style={styles.toggleRow}>
              <View>
                <Text style={styles.toggleLabel}>For you</Text>
                <Text style={styles.toggleSubText}>
                  Based on your school, department, and class
                </Text>
              </View>
              <Switch />
            </View>

            {/* OPTIONS */}
            {["School", "Faculty", "Department", "Class"].map((item, index) => (
              <TouchableOpacity key={index} style={styles.optionRow}>
                <Text style={styles.optionText}>{item}</Text>
                <Ionicons name="chevron-forward" size={20} color="#333" />
              </TouchableOpacity>
            ))}

            {/* APPLY BUTTON */}
            <TouchableOpacity style={styles.applyBtn}>
              <Text style={styles.applyBtnText}>Apply</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default NoticeBoard;

// ----------------------
// STYLES
// ----------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 12,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 9,
    marginBottom: 32,
    elevation: 2,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 32,
    height: 32,
    borderRadius: 20,
  },

  name: {
    fontSize: 13,
    fontWeight: "600",
  },

  time: {
    fontSize: 10,
    color: "#777",
    marginTop: 3,


  },

  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    position: "absolute",
    right: 0,
  },

  badgeText: {
    fontSize: 10,
    fontWeight: "600",
  },

  postImage: {
    width: "100%",
    height: 380,
    borderRadius: 12,
    marginTop: 10,
  },

  caption: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: "600",
  },

  actions: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: 'space-between',
  },

  actionItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  actionText: {
    fontSize: 14,
    color: "#555",
  },

  addButton: {
    alignSelf: "flex-end",
    paddingTop: 30,
    paddingRight: 20,
  },

  filterButton: {
    alignSelf: "flex-end",
  },

  NoticesText: {
    alignSelf: 'flex-end',
    fontSize: 15,
    color: "#6A0DFF",
  },

  AddButtonCon: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,

  },

  actionFlag: {
    flexDirection: 'row',
    gap: 80,
  },

  actionItems: {
    flexDirection: 'row',
    gap: 12,
  },

  nameTime: {
    flexDirection: 'row'
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },

  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "65%",
  },

  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
  },

  clearText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6A0DFF",
  },

  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },

  toggleLabel: {
    fontSize: 16,
    fontWeight: "600",
  },

  toggleSubText: {
    fontSize: 12,
    color: "#777",
  },

  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },

  optionText: {
    fontSize: 15,
    fontWeight: "500",
  },

  applyBtn: {
    backgroundColor: "#6A0DFF",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 30,
  },

  applyBtnText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  filterBtn: {
    flexDirection: "row",
    backgroundColor: "#7A32FF",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  filterText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "700",
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 15,
    gap: 10,
    marginBottom: 20,
  },
  tag: {
    flexDirection: "row",
    backgroundColor: "#7A32FF",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    gap: 6,
    alignItems: "center",
  },
  tagText: {
    color: "#fff",
  },

});