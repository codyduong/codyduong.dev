export const NAV_ORDER = ['/', '/sandbox'] as const;

const firstSegment = (pathname: string): string => {
  const seg = pathname.split('/')[1] ?? '';
  return seg ? `/${seg}` : '/';
};

export const getNavDirection = (from: string, to: string): 'forward' | 'back' | null => {
  const order = NAV_ORDER as readonly string[];
  const fromIdx = order.indexOf(firstSegment(from));
  const toIdx = order.indexOf(firstSegment(to));
  if (fromIdx === toIdx) {
    return null;
  }
  return toIdx > fromIdx ? 'forward' : 'back';
};
