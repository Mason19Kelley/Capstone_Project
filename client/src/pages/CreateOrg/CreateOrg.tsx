import React, {  useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CreateOrg.css';
import { CreateOrgAPI } from '../../api/CreateOrgAPI';
import { ArrowLeftOutlined } from '@ant-design/icons';


const CreateOrg: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [organization, setOrgname] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [ passwordTooShort, setPasswordTooShort] = useState(false)

  useEffect(() => {
    
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if(password.length < 8){
      setPasswordTooShort(true)
      return
    }
    CreateOrgAPI.createOrg(username, password, email, organization)
    .then(response => {
      console.log("here")
      console.log(response)
    })    
    navigate("/login")
  };
    

  return (
    <section>
      <div className="org-box">
      <Link to={'/login'} className="create-org-back"><ArrowLeftOutlined style={{color:'white'}} /></Link>
        <div className="form-value">
          <form onSubmit={(event) =>handleSubmit(event)}>
            <div className='back-link'>
              <h2>Create an Organization</h2>
            </div>
            
            <div className="inputbox-org">
              <input type="organization" required value={organization} onChange={(e) => setOrgname(e.target.value)} />
              <label>Organization Name</label>
            </div>
            <div className="inputbox-org">
              <input type="username" required value={username} onChange={(e) => setUsername(e.target.value)} />
              <label>Administrator Full Name</label>
            </div>
            <div className="inputbox-org">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              <label>Administrator Email</label>
            </div>
            <div className="inputbox-org">
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              <label>Administrator Password</label>
            </div>
            {passwordTooShort ? <span className="text-red-700 text-sm">Your password must be at least 8 characters</span> : <></>}
            <button type="submit" className="create-org-button">Create</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateOrg;