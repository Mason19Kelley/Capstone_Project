import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CreateOrg.css';
import { CreateOrgAPI } from '../../api/CreateOrgAPI';


const CreateOrg: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [organization, setOrgname] = useState('');
  const [adminname, setAdminname] = useState('');
  const [adminemail, setAdminemail] = useState('');
  const [adminpassword, setAdminpassword] = useState('');
  const { isLoggedIn, setLoggedIn, setUser } = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const token = Cookies.get("token");
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
    AuthAPI.checkUser().then(response => {
      console.log(response)
      setUser(response)
      setLoggedIn(true)
      navigate("/home")
    }).catch(error => 
      console.log(error)
    )
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    CreateOrgAPI.createOrg(username, password, email, organization, adminname)
    .then(response => {
      console.log("here")
      console.log(response)
    })    
    navigate("/login")
  };
    

  return (
    <section>
      <div className="form-box">
        <div className="form-value">
          <form onSubmit={handleSubmit}>
            <h2>Create an Organization</h2>
            <div className="inputbox">
              <input type="organization" required value={organization} onChange={(e) => setOrgname(e.target.value)} />
              <label>Organization Name</label>
            </div>
            <div className="inputbox">
              <input type="adminname" required value={password} onChange={(e) => setPassword(e.target.value)} />
              <label>Administrator Name</label>
            </div>
            <div className="inputbox">
              <input type="adminemail" required value={adminemail} onChange={(e) => setAdminemail(e.target.value)} />
              <label>Administrator Email</label>
            </div>
            <div className="inputbox">
              <input type="adminpassword" required value={adminpassword} onChange={(e) => setAdminpassword(e.target.value)} />
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
