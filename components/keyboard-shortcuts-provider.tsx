'use client';

import { useGlobalKeyboardShortcuts } from '@/lib/use-keyboard-shortcuts';

export function KeyboardShortcutsProvider() {
  useGlobalKeyboardShortcuts();
  return null;
}
