import { AddUserUseCase } from '../../usecases/user/add-user-usecase';
import { UserController } from './user.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { User, UserProps } from '../../domain/user/user';

describe('UserController', () => {
  let userController: UserController;
  let addUserUseCase: AddUserUseCase;

  beforeEach(async () => {
    const userProps: UserProps = {
      name: 'test',
      surname: 'test',
      email: 'test',
      password: 'test',
    };

    const user = User.create(userProps);
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: AddUserUseCase,
          useValue: {
            create: jest.fn().mockResolvedValue(user),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    addUserUseCase = module.get<AddUserUseCase>(AddUserUseCase);
  });

  it('Should be defined', () => {
    expect(userController).toBeDefined();
    expect(addUserUseCase).toBeDefined();
  });
  it('Should create user', async () => {
    const dto = {
      name: 'a',
      surname: 'a',
      email: 'a',
      password: 'a',
    };

    const result = await userController.create(dto);

    expect(addUserUseCase.create).toHaveBeenCalledWith(dto);
    expect(result).toBeInstanceOf();
  });
});
