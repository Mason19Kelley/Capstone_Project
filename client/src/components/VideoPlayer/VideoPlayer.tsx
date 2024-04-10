
import './VideoPlayer.css'
import { useEffect, useState } from 'react';

import { FileAPI } from '../../api/FileAPI';
import ReactPlayer from 'react-player';
import { Card } from 'antd';






export default function VideoPlayer(props: { done: () => void}) {
  const [ videoURL, setVideoURL ] = useState("");
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        props.done()
        const response = await FileAPI.getFile('sample-5s.mp4');
        setVideoURL(URL.createObjectURL(response));
      } catch (error) {
        console.error('Error fetching video:', error);
      }
    };

    fetchVideo();
  }, []);

  
  return (
    <Card style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
        <ReactPlayer url={videoURL} controls={true} />
    </Card>
  )
}

