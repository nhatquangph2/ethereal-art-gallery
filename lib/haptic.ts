'use client';

/**
 * Haptic feedback utilities for mobile devices
 * Provides tactile feedback for user interactions
 */

export type HapticFeedbackType = 'light' | 'medium' | 'heavy' | 'selection' | 'success' | 'warning' | 'error';

/**
 * Check if device supports haptic feedback
 */
export function isHapticSupported(): boolean {
  return 'vibrate' in navigator || 'mozVibrate' in navigator || 'webkitVibrate' in navigator;
}

/**
 * Vibration patterns for different feedback types
 */
const vibrationPatterns: Record<HapticFeedbackType, number | number[]> = {
  light: 10,
  medium: 20,
  heavy: 50,
  selection: 5,
  success: [10, 50, 10],
  warning: [30, 50, 30],
  error: [50, 100, 50, 100, 50],
};

/**
 * Trigger haptic feedback
 */
export function triggerHaptic(type: HapticFeedbackType = 'light'): void {
  if (!isHapticSupported()) {
    return;
  }

  try {
    const pattern = vibrationPatterns[type];
    navigator.vibrate(pattern);
  } catch (error) {
    console.warn('Haptic feedback failed:', error);
  }
}

/**
 * React hook for haptic feedback
 */
export function useHaptic() {
  const isSupported = isHapticSupported();

  const trigger = (type: HapticFeedbackType = 'light') => {
    if (isSupported) {
      triggerHaptic(type);
    }
  };

  const onTap = () => trigger('light');
  const onSelect = () => trigger('selection');
  const onSuccess = () => trigger('success');
  const onError = () => trigger('error');
  const onWarning = () => trigger('warning');

  return {
    trigger,
    onTap,
    onSelect,
    onSuccess,
    onError,
    onWarning,
    isSupported,
  };
}

/**
 * Haptic-enabled button wrapper
 */
export function withHaptic<T extends (...args: any[]) => void>(
  callback: T,
  hapticType: HapticFeedbackType = 'light'
): T {
  return ((...args: any[]) => {
    triggerHaptic(hapticType);
    return callback(...args);
  }) as T;
}
