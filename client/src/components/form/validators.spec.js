import { required, minLength, containsNumber, containsUpperCase, containsLowerCase, passwordRule } from './validators';

it('returns error when empty is provided to required validator', () => {
    const result = required('');

    expect(result).toBeDefined();
});

it('does not return error when non empty is provided to required validator', () => {
    const result = required('123');

    expect(result).toBeUndefined();
});

it('returns error when input is shorter than minLength', () => {
    const minLength5 = minLength(5);
    const result = minLength5('abcd');

    expect(result).toBeDefined();
});

it('does not return error when input is longer than minLength', () => {
    const minLength5 = minLength(3);
    const result = minLength5('abcde');

    expect(result).toBeUndefined();
});

it('returns error when input does not contains number', () => {
    const result = containsNumber('abcABCDE');

    expect(result).toBeDefined();
});

it('does not return error when input does contains number', () => {
    const result = containsNumber('ABd12dd9485');

    expect(result).toBeUndefined();
});

it('returns error when input does not contains uppercase', () => {
    const result = containsUpperCase('abc1239485');

    expect(result).toBeDefined();
});

it('does not return error when input does contains uppercase', () => {
    const result = containsUpperCase('ABd12dd9485');

    expect(result).toBeUndefined();
});

it('returns error when input does not contains lowercase', () => {
    const result = containsLowerCase('ABC1239485');

    expect(result).toBeDefined();
});

it('does not return error when input does contains lowercase', () => {
    const result = containsLowerCase('ABd12dd9485');

    expect(result).toBeUndefined();
});

it('returns error when password is shorter than 8', () => {
    const result = passwordRule('Abc123');

    expect(result).toBeDefined();
});

it('returns error when password does not contain number', () => {
    const result = passwordRule('AbcdeFgHiJKL');

    expect(result).toBeDefined();
});

it('returns error when password does not contain uppercase', () => {
    const result = passwordRule('abcdefg1234');

    expect(result).toBeDefined();
});

it('returns error when password does not contain lowercase', () => {
    const result = passwordRule('REACT123');

    expect(result).toBeDefined();
});

it('does not return error when password fulfills all requirements', () => {
    const result = passwordRule('React123');

    expect(result).toBeUndefined();
});
