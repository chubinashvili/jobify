import { useState } from "react";
import { FormRow, Alert } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../store/user/userSlice';
import { displayAlert } from '../../store/alerts/alertsSlice';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(
    state => state.user,
  );
  const { isLoading, showAlert } = useSelector(
    state => state.alerts,
  );
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
      displayAlert(dispatch);
      return;
    }

    updateUser(dispatch, values);
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
            labelText="Name"
            value={values.name}
            handleChange={handleChange}
          />
          <FormRow 
            labelText="Last Name"
            type="text"
            name="lastName"
            value={values.lastName}
            handleChange={handleChange}
            />
          <FormRow 
            type="email"
            name="email"
            labelText="Email"
            value={values.email}
            handleChange={handleChange}
          />
          <FormRow 
            type="text"
            name="location"
            labelText="Location"
            value={values.location}
            handleChange={handleChange}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}
export default Profile