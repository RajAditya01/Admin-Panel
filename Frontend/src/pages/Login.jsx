import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../store/auth";

const URL = "http://localhost:5000/api/auth/login";

export const Login = () => {
  const [user, setUser] = useState({
    email: "",  
    password: "",
  });

  const navigate = useNavigate();
  const storeTokenInLS=useAuth();
  
  // Handle the input field value
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      
      console.log('Response status:', response.status);
      
      // Read the response body once
      const responseBody = await response.text();
      console.log('Response body:', responseBody);
      
      console.log('login form Response', response);
      
      if (response.ok) {
        const data = JSON.parse(responseBody);
        console.log('Login Successful:', data);

        const res_data= await response.json();
        //store the token in localhost
        storeTokenInLS(res_data.token);
        
        alert('Login Successful!');
        setUser({ email: '', password: '' });
        navigate('/');
      } else {
        console.log('Internal Server Error:', response); // Log the entire response object
        alert(`Internal Server Error: ${responseBody}`);
      }
      
      
    } catch (error) {
      console.error("An error occurred during login:", error);
      alert(error);
    }
  };
  

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src="/images/register.png"
                  alt="a nurse with a cute look"
                  width="400"
                  height="500"
                />
              </div>
              {/* our main registration code  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Login form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="Email"
                    />
                  </div>

                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="Password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};
