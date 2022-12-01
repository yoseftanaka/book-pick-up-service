import { Test } from '@nestjs/testing';
import { SubmitBookPickupScheduleService } from '../book/submitBookPickupSchedule.service';
import { HttpException } from '@nestjs/common';
import { borrowedBooks } from '../../databases/borrowedBook.database';

describe('SubmitBookPickupScheduleService', () => {
  let submitBookPickupScheduleService: SubmitBookPickupScheduleService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [SubmitBookPickupScheduleService],
    }).compile();

    submitBookPickupScheduleService =
      moduleRef.get<SubmitBookPickupScheduleService>(
        SubmitBookPickupScheduleService,
      );
  });

  describe('submitBookPickupSchedule', () => {
    it('should throw user not found exception', () => {
      expect(() => {
        submitBookPickupScheduleService.submitBookPickupSchedule({
          userId: '0',
          coverId: 0,
          pickUpDate: undefined,
        });
      }).toThrowError(HttpException);
    });

    it('should successfully submit pickup schedule', () => {
      const request = {
        userId: '1',
        coverId: 123,
        pickUpDate: new Date('2022-12-01'),
      };

      submitBookPickupScheduleService.submitBookPickupSchedule(request);
      let isExist = false;

      for (const borrowedBook of borrowedBooks) {
        if (
          borrowedBook.coverId === request.coverId &&
          borrowedBook.userId === request.userId &&
          borrowedBook.pickupSchedule === request.pickUpDate
        ) {
          isExist = true;
          break;
        }
      }
      expect(isExist).toBeTruthy();
    });
  });
});
