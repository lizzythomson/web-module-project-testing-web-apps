import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', () => {
  render(<ContactForm />);
});

test('renders the contact form header', () => {
  render(<ContactForm />);

  const header = screen.queryByText(/Contact Form/i);

  expect(header).toBeInTheDocument();
  expect(header).toBeTruthy();
  expect(header).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', () => {
  render(<ContactForm />);

  const initialErrors = screen.queryAllByText(/error:/i);
  expect(initialErrors).toHaveLength(0);

  const tooShortText = 'test';

  const firstName = screen.getByLabelText(/First Name*/i);
  userEvent.type(firstName, tooShortText);

  const errors = screen.getAllByText(/error:/i);
  expect(errors).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', () => {
  render(<ContactForm />);

  const initialErrors = screen.queryAllByText(/error:/i);
  expect(initialErrors).toHaveLength(0);

  const button = screen.getByRole('button');
  userEvent.click(button);

  const errors = screen.getAllByText(/error:/i);
  expect(errors).toHaveLength(3);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', () => {
  render(<ContactForm />);

  const initialErrors = screen.queryAllByText(/error:/i);
  expect(initialErrors).toHaveLength(0);

  const inputFirstName = 'Michael';
  const inputLastName = 'Colin';

  const firstName = screen.getByLabelText(/First Name*/i);
  userEvent.type(firstName, inputFirstName);

  const lastName = screen.getByLabelText(/Last Name*/i);
  userEvent.type(lastName, inputLastName);

  const button = screen.getByRole('button');
  userEvent.click(button);

  const errors = screen.getAllByText(/error:/i);
  expect(errors).toHaveLength(1);
});

test('renders "email must be a valid email address" if an invalid email is entered', () => {
  render(<ContactForm />);

  const initialErrors = screen.queryAllByText(/error:/i);
  expect(initialErrors).toHaveLength(0);

  const inputEmail = 'michaelJColingmail.com';

  const email = screen.getByLabelText(/email*/i);
  userEvent.type(email, inputEmail);

  const invalidEmail = screen.queryByText(
    /email must be a valid email address/i
  );
  expect(invalidEmail).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);

  const initialErrors = screen.queryAllByText(/error:/i);
  expect(initialErrors).toHaveLength(0);

  const button = screen.getByRole('button');
  userEvent.click(button);

  waitFor(async () => {
    const lastNameRequired = await screen.queryByText(
      /lastName is a required field/i
    );
    expect(lastNameRequired).toBeInTheDocument();
  });
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
  render(<ContactForm />);
  const inputFirstName = 'Michael';
  const inputLastName = 'Colin';
  const inputEmail = 'michaelJColin@gmail.com';

  const firstName = screen.getByLabelText(/First Name*/i);
  userEvent.type(firstName, inputFirstName);

  const lastName = screen.getByLabelText(/Last Name*/i);
  userEvent.type(lastName, inputLastName);

  const email = screen.getByLabelText(/email*/i);
  userEvent.type(email, inputEmail);

  const button = screen.getByRole('button');
  userEvent.click(button);

  waitFor(async () => {
    const outputFirstName = await screen.queryByText(inputFirstName);
    expect(outputFirstName).toBeInTheDocument();
    expect(outputFirstName).toBeTruthy();
    expect(outputFirstName).not.toBeNull();
  });

  waitFor(async () => {
    const outputLastName = await screen.queryByText(inputLastName);
    expect(outputLastName).toBeInTheDocument();
    expect(outputLastName).toBeTruthy();
    expect(outputLastName).not.toBeNull();
  });

  waitFor(async () => {
    const outputEmail = await screen.queryByText(inputEmail);
    expect(outputEmail).toBeInTheDocument();
    expect(outputEmail).toBeTruthy();
    expect(outputEmail).not.toBeNull();
  });

  waitFor(async () => {
    const outputMessage = await screen.queryByTestId('messageDisplay');
    expect(outputMessage).not.toBeInTheDocument();
  });
});

test('renders all fields text when all fields are submitted.', async () => {
  render(<ContactForm />);

  const inputFirstName = 'Michael';
  const inputLastName = 'Colin';
  const inputEmail = 'michaelJColin@gmail.com';
  const inputMessage = 'I would love to have you contact me!';

  const firstName = screen.getByLabelText(/First Name*/i);
  userEvent.type(firstName, inputFirstName);

  const lastName = screen.getByLabelText(/Last Name*/i);
  userEvent.type(lastName, inputLastName);

  const email = screen.getByLabelText(/email*/i);
  userEvent.type(email, inputEmail);

  const message = screen.getByLabelText(/message/i);
  userEvent.type(message, inputMessage);

  const button = screen.getByRole('button');
  userEvent.click(button);

  waitFor(async () => {
    const outputFirstName = await screen.queryByText(inputFirstName);
    expect(outputFirstName).toBeInTheDocument();
    expect(outputFirstName).toBeTruthy();
    expect(outputFirstName).not.toBeNull();
  });

  waitFor(async () => {
    const outputLastName = await screen.queryByText(inputLastName);
    expect(outputLastName).toBeInTheDocument();
    expect(outputLastName).toBeTruthy();
    expect(outputLastName).not.toBeNull();
  });

  waitFor(async () => {
    const outputEmail = await screen.queryByText(inputEmail);
    expect(outputEmail).toBeInTheDocument();
    expect(outputEmail).toBeTruthy();
    expect(outputEmail).not.toBeNull();
  });

  waitFor(async () => {
    const outputMessage = await screen.queryByText(inputMessage);
    expect(outputMessage).toBeInTheDocument();
    expect(outputMessage).toBeTruthy();
    expect(outputMessage).not.toBeNull();
  });
});
