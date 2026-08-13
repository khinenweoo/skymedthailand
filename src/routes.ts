export type View = 'landing' | 'about' | 'services' | 'contact' | 'dashboard';

/** Single source of truth for the URL <-> view mapping. */
const VIEW_PATHS: Record<View, string> = {
  landing: '/',
  about: '/about',
  services: '/services',
  contact: '/contact',
  dashboard: '/dashboard',
};

export const viewToPath = (view: View): string => VIEW_PATHS[view];

export const pathToView = (pathname: string): View => {
  // Tolerate trailing slashes and casing so /About/ resolves like /about.
  const normalized = ('/' + pathname.replace(/^\/+|\/+$/g, '')).toLowerCase();
  const match = (Object.keys(VIEW_PATHS) as View[]).find(
    (view) => VIEW_PATHS[view] === normalized
  );
  return match ?? 'landing';
};
