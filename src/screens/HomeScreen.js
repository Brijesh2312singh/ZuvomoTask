import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import PostCard from "../components/PostCard";
import { fetchPosts } from "../services/api";
import { COLORS, SPACING } from "../styles/theme";

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const controllerRef = useRef(null);
  const mountedRef = useRef(true);

  const loadPosts = useCallback(async (isRefresh = false) => {
    controllerRef.current?.abort();

    const controller = new AbortController();
    controllerRef.current = controller;

    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    try {
      const data = await fetchPosts(controller.signal);

      if (mountedRef.current) {
        setPosts(data);
      }
    } catch (err) {
      if (err.name !== "AbortError" && mountedRef.current) {
        setError(
          posts.length > 0
            ? "Could not refresh posts. Please try again."
            : "Unable to load posts. Please check your internet connection."
        );
      }
    } finally {
      if (mountedRef.current && controllerRef.current === controller) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  }, [posts.length]);

  useEffect(() => {
    mountedRef.current = true;
    loadPosts();

    return () => {
      mountedRef.current = false;
      controllerRef.current?.abort();
    };
  }, [loadPosts]);

  const renderPost = ({ item }) => (
    <PostCard
      post={item}
      onPress={() => navigation.navigate("Detail", { post: item })}
    />
  );

  if (loading && posts.length === 0) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading posts...</Text>
      </SafeAreaView>
    );
  }

  if (error && posts.length === 0) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.errorTitle}>Something went wrong</Text>
        <Text style={styles.errorText}>{error}</Text>

        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => loadPosts()}
        >
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={styles.header}>
        <View>
          <Text style={styles.heading}>Explore Posts</Text>
          <Text style={styles.subtitle}>Discover something interesting</Text>
        </View>

        <View style={styles.countBadge}>
          <Text style={styles.countText}>{posts.length}</Text>
        </View>
      </View>

      {error ? (
        <TouchableOpacity
          style={styles.warning}
          onPress={() => loadPosts(true)}
        >
          <Text style={styles.warningText}>{error} Tap to retry.</Text>
        </TouchableOpacity>
      ) : null}

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderPost}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadPosts(true)}
            tintColor={COLORS.primary}
            colors={[COLORS.primary]}
          />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No posts found.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centerContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.lg,
  },
  header: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.secondaryText,
    marginTop: 5,
  },
  countBadge: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  countText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "800",
  },
  listContent: {
    padding: SPACING.md,
    paddingTop: 4,
    flexGrow: 1,
  },
  loadingText: {
    color: COLORS.secondaryText,
    marginTop: 12,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 8,
  },
  errorText: {
    color: COLORS.secondaryText,
    textAlign: "center",
    lineHeight: 22,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 28,
    paddingVertical: 13,
    borderRadius: 10,
    marginTop: 20,
  },
  retryText: {
    color: COLORS.white,
    fontWeight: "700",
  },
  warning: {
    backgroundColor: "#FEF2F2",
    padding: 12,
    marginHorizontal: SPACING.md,
    borderRadius: 8,
  },
  warningText: {
    color: COLORS.error,
    fontSize: 12,
  },
  emptyText: {
    textAlign: "center",
    color: COLORS.secondaryText,
    marginTop: 40,
  },
});