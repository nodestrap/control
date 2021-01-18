import React from 'react';
import { render, screen } from '@testing-library/react';
import ComponentTest from './index';


test('render test-1 of the component', () => {
    render(<ComponentTest />);
    screen.getByText('abstract class control');
});

test('render test-2 of the component', () => {
    render(<ComponentTest>hello world</ComponentTest>);
    screen.getByText('hello world');
});
