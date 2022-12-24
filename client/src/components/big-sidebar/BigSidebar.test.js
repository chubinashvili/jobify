import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { render, cleanup } from '@testing-library/react'
import BigSidebar from './BigSidebar'
import { createTestStore } from '../../utils/createTestStore'
import { setToggleSidebar } from '../../store/jobs/jobsSlice'

afterEach(cleanup)

let store = createTestStore()

beforeEach(() => {
  store = createTestStore()
})

describe('BigSidebar', () => {
  it('should hide sidebar', () => {

    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <BigSidebar />
        </BrowserRouter>
      </Provider>
    )
    
    expect(container.getElementsByClassName('show-sidebar').length).toBe(1);
})
it('should show sidebar', () => {
    store.dispatch(setToggleSidebar());
    
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <BigSidebar />
        </BrowserRouter>
      </Provider>
    )

    expect(container.getElementsByClassName('sidebar-container').length).toBe(1);
  })
})