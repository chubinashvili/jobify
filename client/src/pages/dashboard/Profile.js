import { useState } from "react";
import { FormRow, Alert } from '../../components';
import { useAppContext } from "../../context/appContext";
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } = useAppContext();
  const [values, setValues] = useState({
    name: user?.name,
    email: user?.email,
    lastName: user?.lastName,
    location: user?.location,
  });

  
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, lastName, location } = values;
    if(!name || !email || !lastName || !location) {
      displayAlert();
      return;
    }

    updateUser(values);
  }
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow 
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
          <FormRow 
            labelText="last name"
            type="text"
            name="lastName"
            value={values.lastName}
            handleChange={handleChange}
          />
          <FormRow 
            type="email"
            name="email"
            value={values.email}
            handleChange={handleChange}
          />
          <FormRow 
            type="text"
            name="location"
            value={values.location}
            handleChange={handleChange}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}
export default Profile