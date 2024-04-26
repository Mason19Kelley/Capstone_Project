
import { Card, Collapse, Spin } from 'antd';
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
  const [loading, setLoading ] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true)
    CourseAPI.getUsersCompletion(user?.organization?.id ?? -1).then((response: CourseCompletionResponse[]) => {
        setCompletion(getCollapseItems(response))
        setLoading(false)
    }).catch(error => {
      setLoading(false)
      console.log(error)})
  }, [])

   const getCollapseItems = (completions: CourseCompletionResponse[]): CollapseProps['items']  => {
        return completions.map((completion, i) => ({
            key: i,
            label: (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{fontFamily: 'Oswald', fontSize:'1.2em'}}>{completion.user.fullName}</span>
                  <span style={{fontFamily: 'Oswald', fontSize:'1.2em'}}>{completion.completion.filter(c => c.completed).length} / {completion.completion.length} Done</span> {/* Replace 'Extra Text' with your actual content */}
              </div>
          ),
            children: <CourseProgressTable courses={completion.completion}/>
        }))
   }

  return (
   <div className='course-progress-container'>
      <h1 style= {{color:'#0c2245', fontFamily: 'Playfair-Display', paddingTop: 10, marginLeft: "1%", textAlign: "start", paddingBottom: 10}}>User Course Progress</h1>
      <Card title=<span style={{fontFamily: 'Oswald', fontSize: '1.6em'}}>Users</span>>
      {loading ? (
          <Spin tip="Loading..." />
        ) : (
          <Collapse items={completion} />
        )}
      </Card>
   </div>
    
  )
}

export default CourseProgress;
