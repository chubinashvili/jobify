import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import SmallSidebar from './SmallSidebar'
import { createTestStore } from '../../utils/createTestStore'

afterEach(cleanup)

let store = createTestStore()

beforeEach(() => {
  store = createTestStore()
})

describe('SmallSidebar', () => {
  it('should hide sidebar', () => {

    const { container } = render(
      <Provider store={store}>
      <BrowserRouter>
        <SmallSidebar />
      </BrowserRouter>
    </Provider>
    )

    expect(container.getElementsByClassName('show-sidebar').length).toBe(0);
  })
  it('should show sidebar', () => {

    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <SmallSidebar />
        </BrowserRouter>
      </Provider>
    )

    const button = screen.getByTestId('close-btn');
    
    fireEvent.click(button);

    expect(container.getElementsByClassName('show-sidebar').length).toBe(1);
  })
})