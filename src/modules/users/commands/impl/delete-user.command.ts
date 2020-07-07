import { Response } from 'express';
import { DeleteUserDto } from '../../useCases/deleteUser';

export class DeleteUserCommand {
  constructor(
    public readonly deleteUserDto: DeleteUserDto,
    public readonly res: Response,
  ) {}
}
