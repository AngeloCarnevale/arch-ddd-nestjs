import { InjectModel } from '@nestjs/mongoose';
import { UserRepositoryInterface } from 'src/data/protocols/db/user/user-repository.interface';
import { User } from 'src/domain/user/user';
import { UserModel } from '../../models/user/user.model';
import { Model } from 'mongoose';

export class MongodbUserRepository implements UserRepositoryInterface {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userCollection: Model<UserModel>,
  ) {}

  async create(data: User): Promise<UserModel> {
    return await this.userCollection.create(data);
  }

  async find(): Promise<UserModel[]> {
    return await this.userCollection.find();
  }
  async findById(id: string): Promise<UserModel> {
    return await this.userCollection.findOne({ _id: { $eq: id } });
  }
  async update(id: string, dataUpdated: User): Promise<UserModel> {
    return await this.userCollection.findOneAndUpdate({
      _id: { $eq: id },
      $set: dataUpdated,
      new: true,
    });
  }
  async remove(id: string): Promise<void> {
    await this.userCollection.deleteOne({ _id: { $eq: id } });
  }
}
