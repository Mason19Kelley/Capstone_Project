import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CreateOrg.css';
import { AuthAPI } from '../../api/AuthAPI';
import { AuthContext } from '../../context/AuthContext';
import { User } from '../../models/user.model'
import { api } from '../../api/axiosConfig';
import Cookies from 'js-cookie';

interface LoginResponse {
  token: string,
  user: User; 
}

const CreateOrg: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [orgname, setOrgname] = useState('');
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
    e.preventDefault();
    AuthAPI.login(username, password)
      .then((response: LoginResponse) => {
        setLoggedIn(true)
        setUser(response.user)
        navigate("/home")
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          console.log("incorrect password");
        } else if (error.response && error.response.status === 500) {
          console.log("user not found");
        }
      });
  };
    

  return (
    <section>
      <div className="form-box">
        <div className="form-value">
          <form onSubmit={handleSubmit}>
            <h2>Create an Organization</h2>
            <div className="inputbox">
              <input type="orgname" required value={username} onChange={(e) => setUsername(e.target.value)} />
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
