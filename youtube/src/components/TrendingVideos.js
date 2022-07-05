import React, {useCallback, useEffect, useRef, useState, useContext } from 'react';
import VideoEntity from './VideoEntity';
import { Link } from 'react-router-dom';
import './TrendingVideos.css';
import { ThemeContext } from './ThemeContext';

function TrendingVideos() {
    const [observer, setObserver] = useState(null);
    const [videoList, setVideoList] = useState([]);
    const [nextPageToken, setNextPageToken] = useState('CBQQAA');
    const element = useRef(null);
    const key = useContext(ThemeContext);

    const fetchNextPage = useCallback(async () => {
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?chart=mostPopular&maxResults=10&regionCode=IN&pageToken=${nextPageToken}&key=${key}`)
        const data = await response.json();
        const items = data.items.map(item => {
            return <Link key = {item.id} to = {`/video?video=${item.id}`} className = "video-entity" >
                {/* <VideoEntity key={item.id} videoId={item.id}/> */} <h1>{item.id}</h1>
            </Link>;
        });

        const temp = [...videoList, ...items];
        setVideoList(temp);
        setNextPageToken(data.nextPageToken);
        //setTimeout(()=>console.log(videoList.length),20000);
    },[videoList]);
   
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?chart=mostPopular&maxResults=30&regionCode=in&key=${key}`);
            const data = await response.json();
            const items = data.items.map(item => {
                return <Link key = {item.id}  to = {`/video?videoId=${item.id}`} className = "video-entity" >
                            {/* <VideoEntity key={item.id}  videoId={item.id}/> */} <h1>{item.id}</h1>
                       </Link>;
            });

            setVideoList(items);
            setNextPageToken(data.nextPageToken);
        }
        
        fetchData();
    }, []);

    useEffect(() => {
        if (videoList.length && !observer) {
            const newObserver = new IntersectionObserver((entries) => {
                const [entry] = entries;
                fetchNextPage();
            }, { threshold: 0.91 });

            setObserver(newObserver);
        }
    }, [videoList]);

    useEffect(() => {
        if (element.current && observer) {
            observer.observe(element.current);
        }
    }, [observer, element.current]);

    return (
        <div className="trend-class" ref={element}>
            {videoList}
        </div>
    )
}

export default TrendingVideos;