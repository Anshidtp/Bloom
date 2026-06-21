import { create } from 'zustand'

/**
 * uiStore — miscellaneous UI flags (modals, loaders, toasts …)
 */
export const useUiStore = create((set) => ({
  isLoading:      false,
  toastMessage:   null,
  toastType:      'success',   // 'success' | 'error' | 'info'
  isMobileMenuOpen: false,

  setLoading:        (v)     => set({ isLoading: v }),
  showToast:         (msg, type = 'success') =>
    set({ toastMessage: msg, toastType: type }),
  clearToast:        ()      => set({ toastMessage: null }),
  toggleMobileMenu:  ()      => set((s) => ({ isMobileMenuOpen: !s.isMobileMenuOpen })),
  closeMobileMenu:   ()      => set({ isMobileMenuOpen: false }),
}))
