import { FormRow, Alert, FormRowSelect } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { handleChange, createJob, editJob, clearValues } from '../../store/jobs/jobsSlice';
import { displayAlert } from '../../store/alerts/alertsSlice';

const AddJob = () => {
  const dispatch = useDispatch();
  const {
    isEditing,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    editJobId,
  } = useSelector(
    state => state.jobs,
  )

  const { isLoading, showAlert } = useSelector(state => state.alerts)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!position || !company || !jobLocation) {
      displayAlert(dispatch);
      return;
    }

    const job = {  position, company, jobLocation, jobType, status, editJobId };

    if (isEditing) {
      editJob(dispatch, job);
      return;
    }
    createJob(dispatch, job);
  } 

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange(dispatch, { name, value });
  } 

  const handleClear = (e) => {
    e.preventDefault();
    dispatch(clearValues());
  }
  
  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        {showAlert && <Alert />}

        <div className='form-center'>
          <FormRow 
            type="text"
            name="position"
            labelText="Position"
            value={position}
            handleChange={handleJobInput} 
          />
          <FormRow 
            type="text"
            name="company"
            labelText="Company"
            value={company}
            handleChange={handleJobInput} 
          />
          <FormRow 
            type="text"
            labelText="Location"
            name="jobLocation"
            value={jobLocation}
            handleChange={handleJobInput} 
          />

          <FormRowSelect 
            name='status'
            labelText="Status"
            handleChange={handleJobInput}
            value={status}
            list={statusOptions}
          />

          <FormRowSelect 
            name='jobType'
            labelText="Job Type"
            handleChange={handleJobInput}
            value={jobType}
            list={jobTypeOptions}
          />

          <div className='btn-container'>
            <button 
              className='btn btn-block submit-btn'
              type='submit'
              onClick={handleSubmit}
              disabled={isLoading}  
            >
              Submit
            </button>
            <button 
              className='btn btn-block clear-btn'
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}
export default AddJob