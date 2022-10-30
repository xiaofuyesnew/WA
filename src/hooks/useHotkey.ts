import { useEffect, useCallback } from 'react';

export default function useHotkey() {
  const waKey = useCallback((e: KeyboardEvent, key: string, callback: Function) => {
    if ((e.key === key && e.metaKey) || (e.key === key && e.ctrlKey)) {
      callback();
    }
  }, []);

  const handle = useCallback((e: KeyboardEvent) => {
    waKey(e, 'ArrowUp', () => window.scroll({ top: 0, left: 0, behavior: 'smooth' }));
    waKey(e, 'ArrowDown', () => window.scroll({ top: document.body.scrollHeight, left: 0, behavior: 'smooth' }));
    waKey(e, '[', () => window.history.go(-1));
    waKey(e, ']', () => window.history.go(1));
    waKey(e, 'r', () => window.location.reload());
  }, []);

  useEffect(() => {
    document.addEventListener('keyup', handle);
    return () => document.removeEventListener('keyup', handle);
  }, []);
}
