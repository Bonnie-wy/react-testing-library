import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

beforeEach(() => {
  console.log("This will run before each test");
  render(<App />);
});

beforeAll(() => {
  console.log("This will run once before all of the test");
});

afterEach(() => {
  console.log("This will run after each test");
});

afterAll(() => {
  console.log("After all of the test");
});

test("inputs should be initially empty", () => {
  render(<App />);
  const emailInputElement = screen.getByRole("textbox");
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);
  expect(emailInputElement.value).toBe("");
  expect(passwordInputElement.value).toBe("");
  expect(confirmPasswordInputElement.value).toBe("");
});

test("should be able to type an email", () => {
  render(<App />);
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });
  userEvent.type(emailInputElement, "selena@gmail.com");
  expect(emailInputElement.value).toBe("selena@gmail.com");
});

test("should be able to type a password", () => {
  render(<App />);
  const passwordInputElement = screen.getByLabelText("Password");
  userEvent.type(passwordInputElement, "pa$$w0rd");
  expect(passwordInputElement.value).toBe("pa$$w0rd");
});

test("should be able to type a confirm password", () => {
  render(<App />);
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);
  userEvent.type(confirmPasswordInputElement, "password!");
  expect(confirmPasswordInputElement.value).toBe("password!");
});

test("should show email error message on invalid email", () => {
  render(<App />);
  const emailErrorElement = screen.queryByText(
    /The email you input is invalid/
  );
  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });
  const submitBtnElement = screen.getByRole("button", {
    name: /submit/i,
  });

  expect(emailErrorElement).not.toBeInTheDocument();

  userEvent.type(emailInputElement, "selenagamil.com");
  userEvent.click(submitBtnElement);

  const emailErrorElement2 = screen.queryByText(
    /The email you input is invalid/
  );
  expect(emailErrorElement2).toBeInTheDocument();
});

test("should show password error if password is less than 5 characters", () => {
  render(<App />);

  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });
  const passwordInputElement = screen.getByLabelText("Password");
  const passwordErrorElement = screen.queryByText(
    /The password you entered should contain 5 or more characters/i
  );
  const submitBtnElement = screen.getByRole("button", {
    name: /submit/i,
  });
  userEvent.type(emailInputElement, "selena@gmail.com");

  expect(passwordErrorElement).not.toBeInTheDocument();

  userEvent.type(passwordInputElement, "123");

  userEvent.click(submitBtnElement);

  const passwordErrorElementAgain = screen.queryByText(
    /The password you entered should contain 5 or more characters/i
  );

  expect(passwordErrorElementAgain).toBeInTheDocument();
});

test("should confirm password error if passwords don't match", () => {
  render(<App />);

  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);
  const confirmPasswordErrorElement = screen.queryByText(
    /the passwords don't match. try again/i
  );
  const submitBtnElement = screen.getByRole("button", {
    name: /submit/i,
  });
  userEvent.type(emailInputElement, "selena@gmail.com");
  userEvent.type(passwordInputElement, "12345");

  expect(confirmPasswordErrorElement).not.toBeInTheDocument();

  userEvent.type(confirmPasswordInputElement, "123456");

  userEvent.click(submitBtnElement);

  const confirmPasswordErrorElementAgain = screen.queryByText(
    /the passwords don't match. try again/i
  );

  expect(confirmPasswordErrorElementAgain).toBeInTheDocument();
});

test("should show no error message if every input is valid", () => {
  render(<App />);

  const emailInputElement = screen.getByRole("textbox", {
    name: /email/i,
  });
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);

  const submitBtnElement = screen.getByRole("button", {
    name: /submit/i,
  });
  userEvent.type(emailInputElement, "selena@gmail.com");
  userEvent.type(passwordInputElement, "12345");
  userEvent.type(confirmPasswordInputElement, "12345");
  userEvent.click(submitBtnElement);
  const emailErrorElement = screen.queryByText(
    /The email you input is invalid/
  );
  const passwordErrorElement = screen.queryByText(
    /The password you entered should contain 5 or more characters/i
  );
  const confirmPasswordErrorElement = screen.queryByText(
    /the passwords don't match. try again/i
  );
  expect(emailErrorElement).not.toBeInTheDocument();
  expect(passwordErrorElement).not.toBeInTheDocument();
  expect(confirmPasswordErrorElement).not.toBeInTheDocument();
});
