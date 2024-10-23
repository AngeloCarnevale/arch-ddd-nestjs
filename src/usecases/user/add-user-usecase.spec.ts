import { UserRepositoryInterface } from '@/data/protocols/db/user/user-repository.interface';
import { AddUserUseCase } from './add-user-usecase';
import { User, UserProps } from '../../domain/user/user';

describe('AddUserUseCase Unit Test', () => {
  let addUserUseCase: AddUserUseCase;
  let userRepositoryMock: jest.Mocked<UserRepositoryInterface>;

  beforeEach(() => {
    userRepositoryMock = {
      create: jest.fn(),
      find: jest.fn(),
      findById: jest.fn(),
      remove: jest.fn(),
      update: jest.fn(),
    } as jest.Mocked<UserRepositoryInterface>;

    addUserUseCase = new AddUserUseCase(userRepositoryMock);
  });

  it('Should be defined', () => {
    expect(addUserUseCase).toBeDefined();
  });
  it('Should be create new user', async () => {
    const userProps: UserProps = {
      name: 'any_name',
      surname: 'any_surname',
      email: 'any_email@email.com',
      password: 'any_password',
    };

    const expectedUser = {
      _id: 'generated_id',
      name: 'any_name',
      surname: 'any_surname',
      email: 'any_email@email.com',
      password: 'any_password',
      createdAt: new Date('2024-10-23T17:21:49.744Z'),
      updatedAt: new Date('2024-10-23T17:21:49.744Z'),
    };

    userRepositoryMock.create.mockRejectedValue(expectedUser);

    const user = User.create(userProps);
    const result = await addUserUseCase.create(user);

    expect(userRepositoryMock.create).toHaveBeenCalledWith(1);
    expect(result).toEqual(expectedUser);
  });
});
