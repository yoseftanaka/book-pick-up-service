import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { SubmitBookPickUpScheduleResponse } from '../../dtos/submitBookPickUpScheduleRequest';
import { users } from '../../databases/user.database';
import { borrowedBooks } from '../../databases/borrowedBook.database';

@Injectable()
export class SubmitBookPickupScheduleService {
  public submitBookPickupSchedule(
    request: SubmitBookPickUpScheduleResponse,
  ): void {
    const user = this.findUser(request.userId);
    borrowedBooks.push({
      coverId: request.coverId,
      userId: user.id,
      pickupSchedule: request.pickUpDate,
    });
  }

  private findUser(userId: string): User {
    for (const user of users) {
      if (user.id === userId) {
        return user;
      }
    }

    throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
  }
}
