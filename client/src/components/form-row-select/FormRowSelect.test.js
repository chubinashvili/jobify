import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import FormRowSelect from './FormRowSelect'

afterEach(cleanup)

const MockHandleChange = jest.fn();
const MockList = ['full-time', 'part-time', 'remote', 'internship'];

describe('FormRowSelect', () => {
  it('renders select element', () => {

    const { getByTestId } = render(
        <FormRowSelect name='jobType' handleChange={MockHandleChange} list={MockList}/>
    );

    const selectElement = getByTestId(/select-element/i);
    expect(selectElement).toBeInTheDocument();
  });

  it('Simulates selection', () => {

    const { getByTestId, getAllByTestId } = render(
        <FormRowSelect name='jobType' handleChange={MockHandleChange} list={MockList}/>
    );

    const selectElement = getByTestId(/select-element/i);
    fireEvent.change(selectElement, { target: { value: "part-time" } })
    let options = getAllByTestId('select-option')
    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeTruthy();
    expect(options[2].selected).toBeFalsy();
    expect(options[3].selected).toBeFalsy();
});
  
})
