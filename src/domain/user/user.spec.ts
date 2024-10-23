import { User, UserProps } from './user';

describe('User Unit Tests', () => {
  it('Should be constructor', () => {
    const userProps: UserProps = {
      name: 'any_name',
      surname: 'any_surname',
      email: 'any@email.com',
      password: 'password_any',
    };
    let user = User.create(userProps);
    expect(user.props).toEqual({
      ...userProps,
    });

    expect(user.id).toBeDefined();
    user = User.create(userProps);
  });

  it('Should create a User', () => {
    const userProps: UserProps = {
      name: 'any_name',
      surname: 'any_surname',
      email: 'any@email.com',
      password: 'password_any',
    };
    const user = User.create(userProps);
    user.toJSON();
    expect(user.toJSON()).toStrictEqual({
      id: user.id,
      name: 'any_name',
      surname: 'any_surname',
      email: 'any@email.com',
      password: 'password_any',
    });
  });
  it('Should updateName method', () => {
    const userProps: UserProps = {
      name: 'any_name',
      surname: 'any_surname',
      email: 'any@email.com',
      password: 'password_any',
    };
    const user = User.create(userProps);
    user.updateName('any_other_name');
    expect(user.name).toBe('any_other_name');
  });
  it('Should updateEmail method', () => {
    const userProps: UserProps = {
      name: 'any_name',
      surname: 'any_surname',
      email: 'any@email.com',
      password: 'password_any',
    };
    const user = User.create(userProps);
    user.updateName('any_other_email@email.com');
    expect(user.name).toBe('any_other_email@email.com');
  });
});
