// This code implements a sidebar state management using Zustand
// It handles the sidebar's open/closed state, hover state, and settings

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { produce } from "immer";

// Type definitions for sidebar settings and store
type SidebarSettings = { disabled: boolean; isHoverOpen: boolean };
type SidebarStore = {
  isOpen: boolean; // Controls if sidebar is expanded
  isHover: boolean; // Tracks hover state
  settings: SidebarSettings; // Configurable settings
  toggleOpen: () => void; // Toggle expanded state
  setIsOpen: (isOpen: boolean) => void; // Directly set expanded state
  setIsHover: (isHover: boolean) => void; // Set hover state
  getOpenState: () => boolean; // Get current open state considering hover
  setSettings: (settings: Partial<SidebarSettings>) => void; // Update settings
};

// Create persisted Zustand store for sidebar state
export const useSidebar = create(
  persist<SidebarStore>(
    (set, get) => ({
      isOpen: true, // Initially expanded
      isHover: false, // Initially not hovered
      settings: { disabled: false, isHoverOpen: false }, // Default settings
      toggleOpen: () => {
        set({ isOpen: !get().isOpen }); // Toggle open/closed
      },
      setIsOpen: (isOpen: boolean) => {
        set({ isOpen }); // Set open state directly
      },
      setIsHover: (isHover: boolean) => {
        set({ isHover }); // Set hover state
      },
      getOpenState: () => {
        const state = get();
        return state.isOpen || (state.settings.isHoverOpen && state.isHover); // Open if expanded or hover-enabled
      },
      setSettings: (settings: Partial<SidebarSettings>) => {
        set(
          produce((state: SidebarStore) => {
            state.settings = { ...state.settings, ...settings }; // Update settings immutably
          })
        );
      }
    }),
    {
      name: "sidebar", // Storage key
      storage: createJSONStorage(() => localStorage) // Persist in localStorage
    }
  )
);