import { Model } from 'mongoose';
import { UserModel } from '../../models/user/user.model';
import { MongodbUserRepository } from './mongodb-user-repository';
import { User, UserProps } from '../../../../domain/user/user';

const userModelMock = {
  create: jest.fn(),
  find: jest.fn(),
  findById: jest.fn(),
  findOne: jest.fn(),
  findOneAndUpdate: jest.fn(),
  deleteOne: jest.fn(),
} as unknown as Model<UserModel>;

describe('MongodbUserRepository Unit Test', () => {
  let mongodbUserRepository: MongodbUserRepository;

  beforeAll(() => {
    jest.clearAllMocks();

    mongodbUserRepository = new MongodbUserRepository(userModelMock);
  });

  it('Should be defined', () => {
    expect(mongodbUserRepository).toBeDefined();
  });

  it('Should create new user', async () => {
    const userProps: UserProps = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      surname: 'any_surname',
    };
    const user = User.create(userProps);

    await mongodbUserRepository.create(user);

    expect(userModelMock.create).toHaveBeenCalledWith(user);
  });

  it('Should find a array of users', async () => {
    const userProps: UserProps = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      surname: 'any_surname',
    };
    const user = User.create(userProps);
    await mongodbUserRepository.create(user);

    await mongodbUserRepository.create(user);
    await mongodbUserRepository.find();
    expect(userModelMock.create).toHaveBeenCalledWith(user);
    expect(userModelMock.find).toHaveBeenCalledTimes(1);
  });

  it('Should call findById user by id', async () => {
    const userProps: UserProps = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      surname: 'any_surname',
    };
    const user = User.create(userProps);
    await mongodbUserRepository.create(user);

    await mongodbUserRepository.findById(user.id);

    expect(userModelMock.findOne).toHaveBeenCalledTimes(1);
  });

  it('Should be call update user by id', async () => {
    const userProps: UserProps = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      surname: 'any_surname',
    };
    const user = User.create(userProps);
    await mongodbUserRepository.create(user);

    await mongodbUserRepository.update(user.id, user);

    expect(userModelMock.findOneAndUpdate).toHaveBeenCalledTimes(1);
  });
  it('Should be call remove user by id', async () => {
    const userProps: UserProps = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
      surname: 'any_surname',
    };
    const user = User.create(userProps);
    await mongodbUserRepository.create(user);

    await mongodbUserRepository.remove(user.id);

    expect(userModelMock.deleteOne).toHaveBeenCalledTimes(1);
  });
});
