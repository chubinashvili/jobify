import React from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import FormRow from './FormRow'

afterEach(cleanup)

const MockHandleChange = jest.fn();

describe('FormRow', () => {
  it('renders input element', () => {

    const { getByTestId } = render(
        <FormRow name='name' type='text' handleChange={MockHandleChange} />
    );

    const inputElement = getByTestId(/input-element/i);
    expect(inputElement).toBeInTheDocument();
  });

  it('input changes', () => {

    const { getByTestId } = render(
        <FormRow name='name' type='text' handleChange={MockHandleChange} />
    );

    const inputElement = getByTestId(/input-element/i);
    fireEvent.change(inputElement, { target: { value: "test" } })
    expect(inputElement).toHaveValue("test");
  });
  
})
