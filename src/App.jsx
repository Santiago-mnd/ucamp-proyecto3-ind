import { useState } from 'react';

import ArtistInfo from './components/ArtistInfo';
import SearchBar from './components/SearchBar';
import GeneralLayout from './layout/GeneralLayout';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  const [artist, setArtist] = useState('');

  return (
    <GeneralLayout>
      <SearchBar setArtist={setArtist} />
      <ErrorBoundary>
        {artist ? <ArtistInfo artist={artist} /> : null}
      </ErrorBoundary>
    </GeneralLayout>
  );
};

export default App;
