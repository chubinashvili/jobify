import { useMemo, useState } from 'react';
import { FormRow, FormRowSelect } from '..';
import { useSelector, useDispatch } from 'react-redux';
import { clearFilters, handleChange } from '../../store/jobs/jobsSlice';
import Wrapper from '../../assets/wrappers/SearchContainer';

const SearchContainer = () => {
  const dispatch = useDispatch();
  const [localSearch, setLocalSearch] = useState('');
  const {
    searchStatus,
    searchType,
    sort, 
    sortOptions,
    statusOptions,
    jobTypeOptions,
  } = useSelector(
    state => state.jobs,
  );

  const { isLoading } = useSelector(state => state.alerts)

  const handleSearch = (e) => {
    handleChange(dispatch, { name: e.target.name, value: e.target.value });
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch('');
    clearFilters(dispatch);
  }

  const debounce = () => {
    let timeoutID;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        handleChange(dispatch, { name: e.target.name, value: e.target.value });
      }, 500)
    }
  }
  const optimizedDebounce = useMemo(() =>{ 
    return debounce();
    // eslint-disable-next-line
  }, []) 
  return (
    <Wrapper>
      <form className='form'>
        <h4>search form</h4>
        <div className='form-center'>
          <FormRow 
            type="text"
            name="search"
            value={localSearch}
            handleChange={optimizedDebounce}
          />  
          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={['all', ...statusOptions]}
          />
          <FormRowSelect
            labelText="type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={['all', ...jobTypeOptions]}
          />
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button 
            className='btn btn-block btn-danger' 
            disabled={isLoading} 
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  )
}
export default SearchContainer