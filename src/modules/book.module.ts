import { Module } from '@nestjs/common';
import { SubmitBookPickupScheduleService } from '../services/book/submitBookPickupSchedule.service';
import { BookController } from '../controllers/book.controller';
import { GetBookService } from '../services/book/getBook.service';

@Module({
  imports: [],
  controllers: [BookController],
  providers: [GetBookService, SubmitBookPickupScheduleService],
})
export class BookModule {}
