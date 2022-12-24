import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import Loading from './Loading'

afterEach(cleanup)

describe('Loading', () => {
  it('should render loading element', () => {

    const { container } = render(<Loading />)

    expect(container.getElementsByClassName('loading').length).toBe(1);
  })

  it('renders loading element centered', () => {

    const { container } = render(<Loading center={true} />)

    expect(container.getElementsByClassName('loading-center').length).toBe(1);
  })

})