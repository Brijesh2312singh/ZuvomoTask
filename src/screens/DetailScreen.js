import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { COLORS, SPACING } from "../styles/theme";

export default function DetailScreen({ route, navigation }) {
  const { post } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Post Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.postNumber}>POST #{post.id}</Text>

          <Text style={styles.title}>{post.title}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.body}>{post.body}</Text>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Post Information</Text>

            <View style={styles.infoRow}>
              <Text style={styles.infoKey}>Post ID</Text>
              <Text style={styles.infoValue}>{post.id}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoKey}>User ID</Text>
              <Text style={styles.infoValue}>{post.userId}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    paddingVertical: 8,
    paddingRight: 10,
  },
  backText: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 15,
  },
  headerTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "700",
  },
  placeholder: {
    width: 55,
  },
  content: {
    padding: SPACING.lg,
  },
  postNumber: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 16,
  },
  title: {
    color: COLORS.text,
    fontSize: 25,
    fontWeight: "800",
    lineHeight: 34,
    textTransform: "capitalize",
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 12,
  },
  body: {
    fontSize: 16,
    color: COLORS.secondaryText,
    lineHeight: 27,
  },
  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    padding: SPACING.md,
    marginTop: 30,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  infoLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  infoKey: {
    color: COLORS.secondaryText,
    fontSize: 14,
  },
  infoValue: {
    color: COLORS.text,
    fontWeight: "700",
    fontSize: 14,
  },
});