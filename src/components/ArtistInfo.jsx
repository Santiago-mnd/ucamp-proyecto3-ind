import { useEffect, useState } from 'react';
import BarChart from './BarChart';
import PieChart from './PieChart';
import Loader from './Loader';

const ArtistInfo = ({ artist }) => {
  // const sanitizedArtist = artist.trim().replaceAll(' ', '_').toLowerCase();
  const [artistData, setArtistData] = useState([]);
  const [artistTopTracks, setArtistTopTracks] = useState([]);
  const [artistAlbums, setArtistAlbums] = useState([]);
  useEffect(() => {
    const fetchArtistAlbums = async () => {
      setArtistAlbums([]);
      const URL = `https://theaudiodb.p.rapidapi.com/searchalbum.php?s=${artist}`;
      const APIKEY = import.meta.env.VITE_APIKEY;

      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': APIKEY,
          'X-RapidAPI-Host': 'theaudiodb.p.rapidapi.com',
        },
      };

      const response = await fetch(URL, options);
      const data = await response.json();

      if (!data?.album) return;

      const albumGeneralData = data?.album.map(
        ({ intYearReleased, strAlbum, strAlbumThumb, intScore }) => ({
          year: intYearReleased,
          album: strAlbum,
          image: strAlbumThumb,
          score: intScore,
        })
      );
      setArtistAlbums(albumGeneralData);
    };

    const fetchArtistData = async () => {
      setArtistData([]);
      const URL = `https://theaudiodb.p.rapidapi.com/search.php?s=${artist}`;
      const APIKEY = import.meta.env.VITE_APIKEY;

      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': APIKEY,
          'X-RapidAPI-Host': 'theaudiodb.p.rapidapi.com',
        },
      };

      const response = await fetch(URL, options);
      const data = await response.json();
      if (!data?.artists) return;
      setArtistData(data?.artists[0]);
    };

    const tracksData = async () => {
      setArtistTopTracks([]);
      const URL = `https://theaudiodb.p.rapidapi.com/track-top10.php?s=${artist}`;
      const APIKEY = import.meta.env.VITE_APIKEY;

      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': APIKEY,
          'X-RapidAPI-Host': 'theaudiodb.p.rapidapi.com',
        },
      };

      try {
        const res = await fetch(URL, options);
        const data = await res.json();
        if (!data?.track) return;
        const generalData = data?.track.map(
          ({
            strAlbum,
            strDescriptionEN,
            intDuration,
            intTrackNumber,
            strGenre,
            strTrack,
            strArtist,
            intTotalPlays,
            strTrackThumb,
          }) => ({
            album: strAlbum,
            description: strDescriptionEN,
            duration: Number(intDuration),
            image: strTrackThumb,
            trackNumber: intTrackNumber,
            genre: strGenre,
            name: strTrack,
            artist: strArtist,
            totalPlays: intTotalPlays,
          })
        );
        setArtistTopTracks(generalData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchArtistAlbums();
    fetchArtistData();
    tracksData();
  }, [artist]);

  const chartColors = [
    'rgba(255, 99, 132, 0.9)',
    'rgba(54, 162, 235, 0.9)',
    'rgba(255, 206, 86, 0.9)',
    'rgba(75, 192, 192, 0.9)',
    'rgba(153, 102, 255, 0.9)',
    'rgba(255, 159, 64, 0.9)',
  ];

  const chartAlbumData = {
    labels: artistAlbums
      .sort((a, b) => a.score - b.score)
      .map(({ album }) => album),
    datasets: [
      {
        label: 'Total Score',
        data: artistAlbums.map(({ score }) => score).sort((a, b) => a - b),
        backgroundColor: chartColors,
        borderColor: ['#000'],
        borderWidth: 1,
      },
    ],
  };

  const chartTracksData = {
    labels: artistTopTracks.map(({ name }) => name),
    datasets: [
      {
        label: 'Total Plays',
        data: artistTopTracks.map(({ totalPlays }) => totalPlays),
        backgroundColor: chartColors,
        borderColor: ['#000'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      {artistTopTracks < 1 ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="w-full flex justify-center my-4 ">
          <div className="w-3/4">
            <div className="w-full">
              {artistData.strArtistBanner && (
                <img
                  className="block mx-auto max-w-full rounded "
                  src={artistData.strArtistBanner}
                  alt="band-banner"
                />
              )}
            </div>
            <div className="mx-auto w-full text-xl bg-white p-4 rounded my-4 ">
              {chartTracksData.length !== 0 ? (
                <PieChart chartData={chartTracksData} />
              ) : (
                <Loader />
              )}
            </div>
            <div className="mx-auto w-full text-xl bg-white p-4 rounded my-4 ">
              <h2 className="font-bold text-white">
                Canciones más escuchadas:{' '}
              </h2>
              {chartAlbumData ? (
                <BarChart chartData={chartAlbumData} />
              ) : (
                <Loader />
              )}
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 ">
              {artistTopTracks.map(
                (
                  {
                    album,
                    description,
                    duration,
                    trackNumber,
                    genre,
                    image,
                    name,
                    artist,
                    totalPlays,
                  },
                  i
                ) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg shadow-lg overflow-y-scroll cardScroll p-4 "
                  >
                    <img
                      className="block max-w-full mx-auto h-96 object-cover rounded-md md:object-fill  "
                      src={
                        image
                          ? image
                          : 'https://upload.wikimedia.org/wikipedia/commons/3/3c/No-album-art.png'
                      }
                      alt={album ? album : 'No album art'}
                    />
                    <h2 className="text-xl font-bold mt-4">
                      {name ? name : 'No disponible'}
                    </h2>
                    <p className="text-gray-500">
                      <span className="font-bold">Album: </span>{' '}
                      {album ? album : 'No disponible'}
                    </p>
                    <p className="text-gray-500 truncate ">
                      <span className="font-bold">Description: </span>
                      {description ? description : 'No disponible'}
                    </p>
                    <p className="text-gray-500">
                      <span className="font-bold">Duración aproximada: </span>
                      {duration
                        ? Math.floor(duration / 60000)
                        : 'No disponible'}{' '}
                      min.
                    </p>
                    <p className="text-gray-500">
                      <span className="font-bold">Número de pista: </span>
                      {trackNumber ? trackNumber : 'No disponible'}
                    </p>
                    <p className="text-gray-500">
                      <span className="font-bold">Género: </span>
                      {genre ? genre : 'No disponible'}
                    </p>
                    <p className="text-gray-500">
                      <span className="font-bold">Grupo/Artista: </span>
                      {artist ? artist : 'No disponible'}
                    </p>
                    <p className="text-gray-500">
                      <span className="font-bold">
                        Total de reproducciones:{' '}
                      </span>
                      {totalPlays ? totalPlays : 'No disponible'}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ArtistInfo;
