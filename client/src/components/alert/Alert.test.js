import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { render, screen, cleanup } from '@testing-library/react'
import Alert from './Alert'
import { createTestStore } from '../../utils/createTestStore'
import { setDisplayAlert } from '../../store/alerts/alertsSlice'

afterEach(cleanup)

let store = createTestStore()

beforeEach(() => {
  store = createTestStore()
})

describe('Alert', () => {
  it('should show display alert text and type', () => {

    store.dispatch(setDisplayAlert());

    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
            <Alert />
        </BrowserRouter>
      </Provider>
    )

    expect(container.getElementsByClassName('alert-danger').length).toBe(1);
    expect(screen.getByText(/Please provide all values!/i)).toBeInTheDocument();
  })

})