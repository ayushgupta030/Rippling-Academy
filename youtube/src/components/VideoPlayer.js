import React from 'react'
import { useSearchParams } from 'react-router-dom';

function VideoPlayer(){
    const [video] = useSearchParams();

    return (
        <div>
            < iframe id="ytplayer" 
                    type="text/html" 
                    style={{height:"100vh", width:"100%"}}
                    src={"https://www.youtube.com/embed/"+video.get('videoId')} >
            </ iframe >
        </div>
    );
}

export default VideoPlayer;