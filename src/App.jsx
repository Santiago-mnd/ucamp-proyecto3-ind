import { useState } from 'react';

import ArtistInfo from './components/ArtistInfo';
import SearchBar from './components/SearchBar';
import GeneralLayout from './layout/GeneralLayout';

const App = () => {
  const [artist, setArtist] = useState('');

  return (
    <GeneralLayout>
      <SearchBar setArtist={setArtist} />
      {artist ? <ArtistInfo artist={artist} /> : null}
    </GeneralLayout>
  );
};

export default App;
