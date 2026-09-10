import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';

interface RecentlyViewedContextType {
  recentIds: string[];
  addViewed: (productId: string) => void;
}

const RecentlyViewedContext = createContext<
  RecentlyViewedContextType | undefined
>(undefined);

const RECENTLY_VIEWED_KEY = 'vasthram_recently_viewed';
const MAX_RECENT = 10;

export function RecentlyViewedProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [recentIds, setRecentIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        RECENTLY_VIEWED_KEY,
        JSON.stringify(recentIds)
      );
    } catch {
      // Silently fail
    }
  }, [recentIds]);

  const addViewed = (productId: string) => {
    setRecentIds((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, MAX_RECENT);
    });
  };

  return (
    <RecentlyViewedContext.Provider value={{ recentIds, addViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed(): RecentlyViewedContextType {
  const context = useContext(RecentlyViewedContext);
  if (!context) {
    throw new Error(
      'useRecentlyViewed must be used within a RecentlyViewedProvider'
    );
  }
  return context;
}
