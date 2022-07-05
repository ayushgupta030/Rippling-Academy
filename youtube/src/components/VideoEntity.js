import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import './VideoEntity.css';

function VideoEntity({ videoId }){
    const key = useContext(ThemeContext);
    const [video, setVideo] = useState({});

    useEffect(()=>{
        const fetchData = async () =>{
            const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&id=${videoId}&key=${key}`)
            const data = await response.json();
            let views = data.items[0].statistics.viewCount;

            {   //Formatting views
                if(views/1e9>=1)
                    views=`${Math.trunc(views/1e8)/10}B`;
                else if(views/1e6>=1)
                    views=`${Math.trunc(views/1e5)/10}M`;
                else if(views/1e3>=1)
                    views=`${Math.trunc(views/1e2)/10}K`;
            }

            const object = {
                                id: data.items[0].id,
                                title: data.items[0].snippet.title,
                                description: data.items[0].snippet.description,
                                channelTitle: data.items[0].snippet.channelTitle,
                                img: data.items[0].snippet.thumbnails.high.url,
                                viewCount: views
                           };
                           
            setVideo(object);
        }
        
        fetchData();
    },[]);


    return (
        <div className="head">
            <div className="img1">
                <img src={video.img} className="img"/>
            </div>
            <div className="video-meta-data">
                <h3>{video.title}</h3>
                <div className="video-second-line">
                    <span className="video-views">
                        {video.viewCount} views
                    </span>
                    <span className="video-upload-time">13 hours ago</span>
                </div>
                <div className="video-channel">{video.channelTitle}</div>
                <div className="video-description">{video.description}</div>
            </div>
        </div>
    );
}

export default VideoEntity;