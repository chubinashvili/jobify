import React from 'react'
// import { MemoryRouter } from 'react-router-dom'
import { render, screen, cleanup } from '@testing-library/react'
import StatItem from './StatItem'
import { FaBug } from 'react-icons/fa';

afterEach(cleanup);

const stat = {
    title: 'jobs declined',
    count: 0,
    icon: <FaBug data-testid='icon' />,
    color: '#d66a6a',
    bcg: '#ffeeee',
};

describe('StatItem', () => {
  it('renders title, count and icon', () => {
    const {container} = render(
        <StatItem {...stat} />
    )
    expect(screen.queryByText(stat.title)).toBeInTheDocument();
    expect(screen.queryByText(stat.count)).toBeInTheDocument();
    expect(screen.queryByTestId('icon')).toBeInTheDocument();
  })
})