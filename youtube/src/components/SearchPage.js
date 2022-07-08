import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import VideoEntity from './VideoEntity';
import './SearchPage.css'
import { ThemeContext } from './ThemeContext';

function SearchPage(){
    const [ searchinput ] = useSearchParams();
    const key = useContext(ThemeContext);
    const [ videos, setVideos ] = useState([]);
    
    useEffect(()=>{
        const fetchData = async () => {
            const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?maxResults=10&q=${searchinput.get('input')}&regionCode=in&key=${key}`);
            const data = await response.json();
            const listOfVideos = data.items.map(item=>{
                const videoId = item.id.videoId;
                return <Link to={`/video?videoId=${videoId}`} 
                                className='video-entity'> 
                            {/* <VideoEntity videoId = {videoId}/> */}
                        </Link>;});

            setVideos(listOfVideos);
        };

        fetchData();
    },[searchinput.get('input')]);

    return (
        <div className="search-page">
            {videos}
        </div>
    );
}

export default SearchPage;