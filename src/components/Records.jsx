import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Records.css';
import { getSpotifyToken } from '../spotifyToken';

const Records = () => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [searchType, setSearchType] = useState('playlist');
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [currentTrackUrl, setCurrentTrackUrl] = useState('');
    const [limit, setLimit] = useState(5)
    const [sq, setSQ] = useState(false)
    function formatNumber(number) {
        if (number >= 1_000_000_000) {
            return (number / 1_000_000_000).toFixed(1) + 'B';
        } else if (number >= 1_000_000) {
            return (number / 1_000_000).toFixed(1) + 'M';
        } else if (number >= 1_000) {
            return (number / 1_000).toFixed(1) + 'K';
        } else {
            return number.toString();
        }
    }
    const handleSearch = async (event) => {
        if (query === '') {
            console.error(`Error : Nothing to Search`);
            return;
        }
        event.preventDefault();
        const token = await getSpotifyToken();

        if (!token) {
            setError('Failed to get Spotify token');
            return;
        }

        try {
            const response = await axios.get('https://api.spotify.com/v1/search', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    q: query,
                    type: searchType,
                    limit: limit
                }
            });
            console.log('Spotify API response:', response.data);
            setResults(response.data);
            setSQ(true)
        } catch (err) {
            console.error(`Error while fetching request : ${err}`);
        }
    };

    const handleTypeChange = (type) => {
        setSearchType(type);
    };

    const msToMinutesAndSeconds = (ms) => {
        let minutes = Math.floor(ms / 60000);
        let seconds = ((ms % 60000) / 1000).toFixed(0);
        seconds = seconds < 10 ? '0' + seconds : seconds;
        return [minutes, seconds];
    };

    const handlePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };
    const handleVolumeChange = (event) => {
        audioRef.current.volume = event.target.value;
        setVolume(event.target.value);
    };

    const handleTrackClick = (trackUrl) => {
        if (currentTrackUrl === trackUrl && isPlaying) {
            handlePlayPause();
        } else {
            setCurrentTrackUrl(trackUrl);
            setIsPlaying(true);
        }
    };

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, currentTrackUrl]);

    return (
        <>
            <div className="record-container">
                <div className="record-heading">
                    <span className="record">Records</span> that <span className="cross">fit</span> hit you..!!
                </div>
                <form className="input-group mb-3" onSubmit={handleSearch}>
                    <button
                        className="dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {searchType.charAt(0).toUpperCase() + searchType.slice(1)}
                    </button>
                    <ul className="dropdown-menu">
                        <li>
                            <button className="dropdown-item" type="button" onClick={() => handleTypeChange('artist')}>
                                Artists
                            </button>
                        </li>
                        <li>
                            <button className="dropdown-item" type="button" onClick={() => handleTypeChange('track')}>
                                Tracks
                            </button>
                        </li>
                        <li>
                            <button className="dropdown-item" type="button" onClick={() => handleTypeChange('album')}>
                                Albums
                            </button>
                        </li>
                    </ul>
                    <select className="dropdown-toggle limit" aria-label="Limit select" value={limit} onChange={(e) => setLimit(e.target.value)}>
                        {[...Array(50)].map((_, index) => (
                            <option key={index + 1} value={index + 1}>
                                {index + 1}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Discover your music...!!"
                        className="record-search form-control"
                        aria-label="Text input with dropdown button"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit" className="btn search-button">
                        Search
                    </button>
                </form>
            </div>

            <div className="track-head-container">
                {(sq) ?
                    (
                        <>
                            <h1 className="track-heading">{searchType[0].toUpperCase() + searchType.replace(searchType[0], "")}</h1>
                            <ul>
                                <li className="record">
                                    <div className="info">
                                        <h1 className="index">No.</h1>
                                        <div className="pic">
                                            {searchType === 'track' ? 'Duration' : searchType === 'artist' ? 'Artist' : searchType === 'album' ? 'Album' : ''}
                                        </div>
                                        {searchType === 'track' ? (
                                            <h1 className="name">Name <span className="head-artist">Artist</span></h1>
                                        ) : searchType === 'artist' ? (
                                            <h1 className="name">Name</h1>
                                        ) : searchType === 'album' ? (
                                            <h1 className="name">Name</h1>
                                        ) : ''}
                                        <h2 className="duration">
                                            {searchType === 'track' ? 'Duration' : searchType === 'artist' ? 'Followers' : searchType === 'album' ? 'Tracks' : ''}
                                        </h2>
                                        <h2 className="popularity">
                                            {searchType === 'track' ? 'Popularity' : searchType === 'artist' ? 'Popularity' : searchType === 'album' ? 'Date' : ''}
                                        </h2>
                                        <span className="control">
                                            {searchType === 'track' ? 'Navigate' : searchType === 'artist' ? 'Genre' : searchType === 'album' ? 'Type' : ''}
                                        </span>
                                        <div className="link">Spotify</div>
                                    </div>
                                </li>
                            </ul>
                        </>
                    )
                    :
                    (
                        <h1 className="track-heading"></h1>
                    )}
            </div>
            <>
                {results.tracks && results.tracks.items.length > 0 && (
                    <div className="track-container">
                        <ul>
                            {results.tracks.items.map((track, i) => (
                                <li key={track.id} className="record">
                                    <div className="track-info">
                                        <h1 className="track-index">{i + 1}</h1>
                                        {track.album.images && track.album.images.length > 0 && (
                                            <div className="track-pic">
                                                <img
                                                    src={track.album.images[0].url}
                                                    alt={`${track.name} album cover`}
                                                    className="album-cover"
                                                />
                                            </div>
                                        )}
                                        <h1 className='track-name'>
                                            {track.name}<span className="artist"> {track.artists[0].name}</span>
                                        </h1>
                                        <h2 className='track-duration'>
                                            {msToMinutesAndSeconds(track.duration_ms)[0]}
                                            <span className="colon">:</span>
                                            {msToMinutesAndSeconds(track.duration_ms)[1]}
                                        </h2>
                                        <h2 className="track-popularity">{track.popularity}</h2>
                                        <span className='track-control'>
                                            <button className='track-audio btn' onClick={() => handleTrackClick(track.preview_url)}>
                                                {isPlaying && currentTrackUrl === track.preview_url ? (
                                                    <img src="pause.png" className='pause-logo' alt="" />
                                                ) : (
                                                    <img src="play.png" className='play-logo' alt="" />
                                                )}
                                            </button>
                                        </span>
                                        <a href={track.external_urls.spotify} className='track-link'>
                                            <img src="sp-logo.png" alt="" className="sp-logo" />
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {results.artists && results.artists.items.length > 0 && (
                    <div className="artist-container">
                        <ul>
                            {results.artists.items.map((artist, i) => (
                                <li key={artist.id} className="record">
                                    <div className="track-info">
                                        <h1 className="track-index">{i + 1}</h1>
                                        {artist.images && artist.images.length > 0 && (
                                            <div className="track-pic">
                                                <img
                                                    src={artist.images[0].url}
                                                    alt={`${artist.name} artist cover`}
                                                    className="album-cover"
                                                />
                                            </div>
                                        )}
                                        <h1 className='track-name'>{artist.name}</h1>
                                        <h2 className='track-duration'>{formatNumber(artist.followers.total)}</h2>
                                        <h2 className="track-popularity">{artist.popularity}</h2>
                                        <h2 className='track-control'>
                                            {artist.genres[0][0].toUpperCase() + artist.genres[0].slice(1)}
                                        </h2>
                                        <a href={artist.external_urls.spotify} className='track-link'>
                                            <img src="sp-logo.png" alt="" className="sp-logo" />
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {results.albums && results.albums.items.length > 0 && (
                    <div className="album-container">
                        <ul>
                            {results.albums.items.map((album, i) => (
                                <li key={album.id} className="record">
                                    <div className="track-info">
                                        <h1 className="track-index">{i + 1}</h1>
                                        {album.images && album.images.length > 0 && (
                                            <div className="track-pic">
                                                <img
                                                    src={album.images[0].url}
                                                    alt={`${album.name} album cover`}
                                                    className="album-cover"
                                                />
                                            </div>
                                        )}
                                        <h1 className='track-name'>{album.name}</h1>
                                        <h2 className='track-duration'>{album.total_tracks}</h2>
                                        <h2 className='track-popularity'>{album.release_date}</h2>
                                        <h2 className='track-control'>{album.album_type[0].toUpperCase() + album.album_type.replace(album.album_type[0], "")}</h2>
                                        <a href={album.external_urls.spotify} className='track-link'>
                                            <img src="sp-logo.png" alt="" className="sp-logo" />
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </>            <audio
                ref={audioRef}
                src={currentTrackUrl}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                className="track-audio"
                style={{ display: 'none' }}
            />
            <div className="controls">
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                />
            </div>
        </>
    );
};

export default Records;