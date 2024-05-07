
import './VideoPlayer.module.css'
import { useEffect, useState } from 'react';

import { FileAPI } from '../../api/FileAPI';
import ReactPlayer from 'react-player';
import { Card, Spin } from 'antd';






export default function VideoPlayer(props: { fileName: string, done: () => void}) {
  const [ videoURL, setVideoURL ] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        props.done()
        const response = await FileAPI.getFile(props.fileName);
        setVideoURL(URL.createObjectURL(response));
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };

    fetchVideo();
  }, []);

  
  return (
    <div className='video-card'>
      <Card style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%'}}>
          {isLoading ? <Spin tip='Loading...'></Spin> : <ReactPlayer url={videoURL} controls={true} />}
      </Card> 
    </div>
  )
}

