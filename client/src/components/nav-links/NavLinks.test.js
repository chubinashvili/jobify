import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen, cleanup } from '@testing-library/react'
import NavLinks from './NavLinks'
import links from '../../utils/links'

afterEach(cleanup)

const toggleSidebar = jest.fn();

describe('Navlinks', () => {
  it('renders links', () => {

    render(
        <BrowserRouter>
            <NavLinks toggleSidebar={toggleSidebar} />
        </BrowserRouter>
    )

    expect(screen.getByText(links[0].text)).toBeInTheDocument();
    expect(screen.getByText(links[1].text)).toBeInTheDocument();
  })

})