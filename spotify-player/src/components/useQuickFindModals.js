import { useState } from 'react';

const useQuickFindModals = () => {
  const [playlisterShowing, setShowPlaylister] = useState(false);
  const [searcherShowing, setShowSearcher ] = useState(false);

  function togglePlaylister() {
    setShowPlaylister(!playlisterShowing);
  }

  function toggleSearcher() {
    setShowSearcher(!searcherShowing)
  }

  return {
    playlisterShowing,
    togglePlaylister,
    searcherShowing,
    toggleSearcher
  }
};

export default useQuickFindModals;