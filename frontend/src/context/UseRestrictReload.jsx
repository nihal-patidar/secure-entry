import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useRestrictReload = (restrictedPaths) => {
  const location = useLocation();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (restrictedPaths.includes(location.pathname)) {
        event.preventDefault();
        event.returnValue = ''; // Required for Chrome to show the reload prompt
      }
    };

    const handleNavigation = (event) => {
      if (restrictedPaths.includes(location.pathname)) {
        const confirmLeave = window.confirm(
          'Are you sure you want to leave this page? Unsaved changes may be lost.'
        );
        if (!confirmLeave) {
          event.preventDefault();
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handleNavigation);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handleNavigation);
    };
  }, [location.pathname, restrictedPaths]);
};

export default useRestrictReload;
