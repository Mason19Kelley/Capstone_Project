
import { Card, Collapse } from 'antd';
import './CourseProgress.css'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { CourseAPI } from '../../api/CourseAPI';
import { CourseCompletionResponse } from '../../models/course-completion-response';
import type { CollapseProps } from 'antd';



function CourseProgress() {
  const { user } = useContext(AuthContext)
  const [ completion, setCompletion ] = useState<CourseCompletionResponse[]>([]);

  useEffect(() => {
    CourseAPI.getUsersCompletion(user?.organization?.id ?? -1).then((response: CourseCompletionResponse[]) => {
        setCompletion(response)
    }).catch(error => console.log(error))
  }, [])

   const getCollapseItems = (completions: CourseCompletionResponse[]): CollapseProps['items']  => {
    console.log(completions)
        return completions.map((completion, i) => ({
            key: i,
            label: completion.user.fullName,
            children: <p>hello</p>
        }))
   }

  return (
   <div className="admin-wrapper">
      <h1 style= {{color:'#0c2245', fontFamily: 'Playfair-Display', paddingTop: 10, marginLeft: "1%", textAlign: "start"}}>User Course Completion</h1>
      <Card title="Users" className='org-management'>
        <Collapse items={getCollapseItems(completion)} />;
      </Card>
   </div>
    
  )
}

export default CourseProgress;
