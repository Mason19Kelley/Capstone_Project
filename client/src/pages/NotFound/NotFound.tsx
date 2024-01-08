import './NotFound.css'
import { Button } from 'antd';

function NotFound() {  
  

  return (
    <div className='not-found-container'>
  			<h1>404 - Page not found!</h1>
  			<p>Oops! It seems like you're lost, let me help you find your way back home!</p>
            <Button type="primary" href="/home" className="not-found-button">Click here to go back home</Button>
    </div>
  )

}

export default NotFound;
