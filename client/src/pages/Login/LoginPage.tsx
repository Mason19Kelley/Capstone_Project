import React from 'react';
import { IonIcon } from '@ionic/react';
import './LoginPage.css'


const LoginPage: React.FC = () => {

  return (
    <section>
      <div className="form-box">
        <div className="form-value">
          <form action="">
            <h2>Login</h2>
            <div className="inputbox">
              <IonIcon name="mail-outline"></IonIcon>
              <input type="email" required />
              <label>Email</label>
            </div>
            <div className="inputbox">
              <IonIcon name="lock-closed-outline"></IonIcon>
              <input type="password" required />
              <label>Password</label>
            </div>
            <div className="forget">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <label>
                <a href="#">Forgot password?</a>
              </label>
            </div>
            <button>Log in</button>
            <div className="register">
              <p>
                Don't have an account ? <a href="#">Register</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default LoginPage;
