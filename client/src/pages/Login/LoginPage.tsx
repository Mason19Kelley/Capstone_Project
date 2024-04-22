import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { AuthAPI } from '../../api/AuthAPI';
import { AuthContext } from '../../context/AuthContext';
import { User } from '../../models/user.model'
import { api } from '../../api/axiosConfig';
import Cookies from 'js-cookie';
import { PageContext } from '../../context/PageContext';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

interface LoginResponse {
  token: string,
  user: User; 
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLoggedIn, setLoggedIn, setUser, setOrganization } = useContext(AuthContext)
  const [incorrect, setIncorrect] = useState(true);
  const { setPage } = useContext(PageContext);
  const [loading, setLoading ] = useState(true);
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
      setUser(response)
      setOrganization(response.organization.orgName)
      setLoggedIn(true)
      setPage('Dashboard')  
      navigate("/home")
    }).catch(error => {
      setLoading(false)
      console.log(error)
  })
  }, [])



//When the login button is pressed an api call sends the username and password input by user to be authenticated. 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    AuthAPI.login(email, password)
      .then((response: LoginResponse) => {
        setLoggedIn(true)
        setUser(response.user)
        setOrganization(response.user.organization?.orgName || null)
        setPage('Dashboard')
        navigate("/home")
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          handleIncorrectResponse();
          //console.log("incorrect password");
        } else if (error.response && error.response.status === 500) {
          handleIncorrectResponse();
          //console.log("user not found");
        }
      });
  };

//Used to handle if the username or password is incorrect, display message
  const handleIncorrectResponse = () => {
    setIncorrect(false)
  }

  const isLoading = () => {
    if(loading){
      return (<Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />)
    }else {
      return (<section className="login-box">
      <div className="form-box">
        <div className="form-value">
          <form onSubmit={handleSubmit}>
            <h2 className="login-header">Login</h2>
            <div className="inputbox">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              <label>Email</label>
            </div>
            <div className="inputbox">
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              <label>Password</label>
            </div>
            <div className={`hidden-text ${incorrect ? 'hidden' : 'visible'}`}>
              <p>Incorrect Username or Password</p>
            </div>
            <div className="forget">
              <label>
                <a href="/forget">Forgot password?</a>
              </label>
            </div>
            <button className="login-button" type="submit" >Login</button>
            <div className="register">
              <p style={{fontFamily: 'Oswald', fontSize: '1.1em'}}>
                Don't have an account ? <Link to="/createorg">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>)
    }
  }
    

  return (
    isLoading()
  );
};

export default LoginPage;
