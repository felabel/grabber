/**
 * Profile Screen
 *
 * User profile: avatar, name, email, one address (inline), Orders, Settings, Log out.
 */

import { theme } from '@/constants/theme';
import { useUserStore } from '@/store';
import type { Address } from '@/types';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DEFAULT_ADDRESS: Address = {
  id: 'addr-default',
  type: 'home',
  label: 'Home',
  street: '123 Main St',
  city: 'Lagos',
  state: 'Lagos',
  zipCode: '100001',
  country: 'Nigeria',
  isDefault: true,
};

function formatAddress(addr: Address): string {
  return [addr.street, addr.city, addr.state, addr.zipCode, addr.country]
    .filter(Boolean)
    .join(', ');
}

interface MenuRowProps {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  onPress: () => void;
}

function MenuRow({ icon, label, onPress }: MenuRowProps) {
  return (
    <TouchableOpacity style={styles.menuRow} onPress={onPress} activeOpacity={0.7}>
      <Feather name={icon} size={22} color={theme.colors.text.primary} />
      <Text style={styles.menuLabel}>{label}</Text>
      <Feather name="chevron-right" size={20} color={theme.colors.text.muted} />
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const profile = useUserStore((state) => state.profile);
  const logout = useUserStore((state) => state.logout);

  const displayName = user
    ? [user.firstName, user.lastName].filter(Boolean).join(' ') || 'User'
    : 'User';
  const displayEmail = user?.email ?? 'user@example.com';

  const address =
    profile?.addresses?.find((a) => a.isDefault) ??
    profile?.addresses?.[0] ??
    DEFAULT_ADDRESS;

  const handleOrders = () => router.push('/orders');
  const handleSettings = () => router.push('/settings');

  const handleLogout = () => {
    Alert.alert('Log out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log out',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/(tabs)/home');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {displayName.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.name}>{displayName}</Text>
          <Text style={styles.email}>{displayEmail}</Text>
        </View>

        <View style={styles.addressSection}>
          <View style={styles.addressHeader}>
            <Feather name="map-pin" size={18} color={theme.colors.primary[500]} />
            <Text style={styles.addressLabel}>{address.label}</Text>
          </View>
          <Text style={styles.addressText}>{formatAddress(address)}</Text>
        </View>

        <View style={styles.menuSection}>
          <MenuRow icon="file-text" label="Orders" onPress={handleOrders} />
          <MenuRow icon="settings" label="Settings" onPress={handleSettings} />
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Feather name="log-out" size={20} color={theme.colors.error[500]} />
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.lg,
    paddingBottom: 32,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  avatarText: {
    fontSize: theme.typography.fontSize['2xl'],
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary[500],
  },
  name: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text.dark,
    marginBottom: theme.spacing.xs,
  },
  email: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
  },
  addressSection: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  addressLabel: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semiBold,
    color: theme.colors.text.dark,
  },
  addressText: {
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.secondary,
    lineHeight: 20,
  },
  menuSection: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: theme.spacing.lg,
    ...theme.shadows.sm,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  menuLabel: {
    flex: 1,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.text.primary,
    fontWeight: theme.typography.fontWeight.medium,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.md,
  },
  logoutText: {
    fontSize: theme.typography.fontSize.base,
    fontWeight: theme.typography.fontWeight.semiBold,
    color: theme.colors.error[500],
  },
});
