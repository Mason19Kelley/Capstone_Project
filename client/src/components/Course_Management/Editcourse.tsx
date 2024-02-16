import React from 'react';
import { Button, Card, ConfigProvider, Image, Typography } from 'antd';
import { useParams } from 'react-router-dom';



function EditCourse() {
  const { id } = useParams();

  console.log(id)

  return (
    <div>
        {id}
    </div>
  )
}

export default EditCourse
