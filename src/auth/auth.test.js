import {
  validatePassword,
  startSession,
  isSessionActive,
  closeSession,
} from './auth';

beforeEach(() => {
  localStorage.clear();
});

test('accepts the correct password', () => {
  expect(validatePassword('1234', '1234')).toBe(true);
});

test('rejects an incorrect password', () => {
  expect(validatePassword('1234', '5678')).toBe(false);
});

test('starts an active session', () => {
  startSession();

  expect(isSessionActive()).toBe(true);
});

test('closes the session', () => {
  startSession();
  closeSession();

  expect(isSessionActive()).toBe(false);
});

test('expires the session after its expiration time', () => {
  localStorage.setItem(
    'stockwise_session',
    JSON.stringify({ expiresAt: Date.now() - 1000 })
  );

  expect(isSessionActive()).toBe(false);
});