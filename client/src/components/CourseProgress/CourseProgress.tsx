
import { Card, Collapse } from 'antd';
import './CourseProgress.css'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { CourseAPI } from '../../api/CourseAPI';
import { CourseCompletionResponse } from '../../models/course-completion-response';
import type { CollapseProps } from 'antd';
import CourseProgressTable from './CourseProgressTable';



function CourseProgress() {
  const { user } = useContext(AuthContext)
  const [ completion, setCompletion ] = useState<CollapseProps['items']>([]);

  useEffect(() => {
    CourseAPI.getUsersCompletion(user?.organization?.id ?? -1).then((response: CourseCompletionResponse[]) => {
        setCompletion(getCollapseItems(response))
    }).catch(error => console.log(error))
  }, [])

   const getCollapseItems = (completions: CourseCompletionResponse[]): CollapseProps['items']  => {
        return completions.map((completion, i) => ({
            key: i,
            label: completion.user.fullName,
            children: <CourseProgressTable courses={completion.completion}/>
        }))
   }

  return (
   <div className='flex flex-col '>
      <h1 style= {{color:'#0c2245', fontFamily: 'Playfair-Display', paddingTop: 10, marginLeft: "1%", textAlign: "start"}}>User Course Progress</h1>
      <Card title="Users">
        <Collapse items={completion} />
      </Card>
   </div>
    
  )
}

export default CourseProgress;
