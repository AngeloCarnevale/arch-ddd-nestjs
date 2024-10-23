import { UserRepositoryInterface } from '@/data/protocols/db/user/user-repository.interface';
import { User } from '@/domain/user/user';

export class AddUserUseCase {
  constructor(private readonly userRepo: UserRepositoryInterface) {}

  async create(user: User) {
    const userDb = await this.userRepo.create(user);
    return userDb;
  }
}
