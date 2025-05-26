// @/shared/hooks/useModalForm.ts
import { useState, useCallback } from 'react';

export function useModalForm<T>(initialVisible = false) {
  const [isVisible, setIsVisible] = useState(initialVisible);
  const open = () => {
    setIsVisible(true);
  }
  const close = () => {
    setIsVisible(false);
  }
  const toggle = () => setIsVisible(prev => !prev);


  return { isVisible, open, close, toggle };
}
