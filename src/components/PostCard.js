import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { COLORS, SPACING } from "../styles/theme";

export default function PostCard({ post, onPress }) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.topRow}>
        <Text style={styles.postNumber}>POST #{post.id}</Text>
        <Text style={styles.readMore}>Read more →</Text>
      </View>

      <Text style={styles.title} numberOfLines={2}>
        {post.title}
      </Text>

      <Text style={styles.body} numberOfLines={3}>
        {post.body}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.user}>User ID: {post.userId}</Text>
        <Text style={styles.details}>View details</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: 16,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  postNumber: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  readMore: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: "600",
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.text,
    textTransform: "capitalize",
    marginBottom: 8,
    lineHeight: 24,
  },
  body: {
    fontSize: 14,
    color: COLORS.secondaryText,
    lineHeight: 21,
  },
  footer: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  user: {
    fontSize: 12,
    color: COLORS.secondaryText,
  },
  details: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.primary,
  },
});