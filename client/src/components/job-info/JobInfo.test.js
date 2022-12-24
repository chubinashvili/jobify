import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { FaLocationArrow } from 'react-icons/fa';
import JobInfo from './JobInfo'

afterEach(cleanup)

describe('JobInfo', () => {
  it('renders JobInfo component', () => {

    const { getByText } = render(<JobInfo icon={<FaLocationArrow />} text="new york" />)

    expect(getByText(/new york/i)).toBeInTheDocument();
  })

})