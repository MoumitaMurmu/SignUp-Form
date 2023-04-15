import { useState } from "react";
import "./App.css";

 const SignUpForm = () => {
  
  const initialValues = { username: "", email: "", password: "", confirmPassword: "", text: "" };
  /*To manage state using useState. 
    The useState function accepts an initial state value as its argument and returns an array with two values - 
    - the current state and a function to update the state.
    useState function is used to manage the state of the form values, form errors, and submission status.*/
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  
  /* handleChange function, it is responsible for updating the state of the form values as the user types in the input fields*/
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  /* handleSubmit function, it is responsible for handling the form submission.*/
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    
  };

  /*The validate function is used to validate the form inputs and return any errors that might have been found.*/

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "";
    }
    else if (values.username.length < 4) {
      errors.username = "Full Name must be more than 3 characters.";
    }
    if (!values.email) {
      errors.email = "";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "";
    } else if (values.password.length < 5) {
      errors.password = "Password must be more than 4 characters.";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters.";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "";
    } 
    else if (values.password!==values.confirmPassword) {
      errors.confirmPassword = "Password and Confirm Password don't match!";
    }
    
    return errors;
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Signup</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Full Name</label>
            <input
              type="text"
              name="username"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.username}</p>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>
          <div className="field">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formValues.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.confirmPassword}</p>
          <div>
          {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success" id="signup-msg">Successfully Signed Up!</div>
      ) : (
        isSubmit && <p>Error : All fields are mandatory!</p>

      )}
          </div>
          <button className="fluid ui button blue">Signup</button>
        </div>
      </form>
      
      
    </div>
  );
}

export default SignUpForm;

