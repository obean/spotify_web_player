import { useState } from 'react';

const useQuickFindModals = () => {
  const [playlisterShowing, setShowPlaylister] = useState(false);

  function togglePlaylister() {
    setShowPlaylister(!playlisterShowing);
  }

  return {
    playlisterShowing,
    togglePlaylister,
  }
};

export default useQuickFindModals;