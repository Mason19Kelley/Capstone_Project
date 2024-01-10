// Import necessary dependencies
import React, { useState } from 'react';

// Define the interface for user credentials
interface UserCredentials {
  username: string;
  password: string;
}

// Define the Login component
const Login: React.FC = () => {
  // State to manage user credentials
  const [credentials, setCredentials] = useState<UserCredentials>({
    username: '',
    password: '',
  });

  // Event handler for input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  // Event handler for form submission
  const handleFormSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    // Perform authentication logic here (e.g., send credentials to server)
    console.log('Logging in with:', credentials);
    // Reset the form after submission
    setCredentials({ username: '', password: '' });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
