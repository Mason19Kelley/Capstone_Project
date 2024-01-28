import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CreateOrg.css';
import { CreateOrgAPI } from '../../api/CreateOrgAPI';


const CreateOrg: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [orgname, setOrgname] = useState('');
  const [adminname, setAdminname] = useState('');
  const [adminemail, setAdminemail] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    
  }, [])

  const handleSubmit = (e: React.FormEvent) => {

    CreateOrgAPI.createOrg(username, password, adminemail, orgname, adminname)
    .then(response => {
      console.log("here")
      console.log(response)
    })    
    navigate("/login")
  };
    

  return (
    <section>
      <div className="org-box">
        <div className="form-value">
          <form onSubmit={handleSubmit}>
            <h2>Create an Organization</h2>
            <div className="inputbox">
              <input type="orgname" required value={orgname} onChange={(e) => setOrgname(e.target.value)} />
              <label>Organization Name</label>
            </div>
            <div className="inputbox">
              <input type="adminname" required value={adminname} onChange={(e) => setAdminname(e.target.value)} />
              <label>Administrator Name</label>
            </div>
            <div className="inputbox">
              <input type="username" required value={username} onChange={(e) => setUsername(e.target.value)} />
              <label>Administrator Username</label>
            </div>
            <div className="inputbox">
              <input type="adminemail" required value={adminemail} onChange={(e) => setAdminemail(e.target.value)} />
              <label>Administrator Email</label>
            </div>
            <div className="inputbox">
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              <label>Administrator Password</label>
            </div>
            <button type="submit" >Create</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateOrg;
