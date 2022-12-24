import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { render, cleanup } from '@testing-library/react'
import SearchContainer from './SearchContainer'
import { createTestStore } from '../../utils/createTestStore'
import { setLoading } from '../../store/alerts/alertsSlice'

afterEach(cleanup)

let store = createTestStore()

beforeEach(() => {
  store = createTestStore()
})

describe('SearchContainer', () => {
  it('renders SearchContainer component', () => {

    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <SearchContainer />
        </BrowserRouter>
      </Provider>
    )
    
    expect(getByText(/search form/i)).toBeInTheDocument();
})
it('should disable submit button while loading', () => {
    store.dispatch(setLoading());
    
    const { getByRole } = render(
      <Provider store={store}>
        <BrowserRouter>
          <SearchContainer />
        </BrowserRouter>
      </Provider>
    )

    expect(getByRole('button')).toBeDisabled();
  })
})