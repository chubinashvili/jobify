import { FormRow, Alert, FormRowSelect } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const AddJob = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob,
  } = useAppContext();
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!position || !company || !jobLocation) {
      displayAlert();
      return;
    }

    if (isEditing) {
      editJob();
      return;
    }
    createJob();
  } 

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  } 
  
  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit job' : 'add job  '}</h3>
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
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
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