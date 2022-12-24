import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Logo from './Logo'

afterEach(cleanup)

describe('Logo', () => {
  it('renders Logo component', () => {

    const { getByAltText } = render(<Logo />)

    expect(getByAltText(/jobify logo/i)).toBeInTheDocument();
  })

})