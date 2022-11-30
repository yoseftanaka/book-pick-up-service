import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { SubmitBookPickupScheduleService } from 'src/services/book/submitBookPickupSchedule.service';
import { GetBookResponseForLibrarian } from '../dtos/getBookResponseForLibrarian';
import { GetBookResponseForUser } from '../dtos/getBookResponseForUser';
import { SubmitBookPickUpScheduleResponse } from '../dtos/submitBookPickUpScheduleRequest';
import { GetBookService } from '../services/book/getBook.service';

@Controller('books')
export class BookController {
  constructor(
    private readonly getBookService: GetBookService,
    private readonly submitBookPickupScheduleService: SubmitBookPickupScheduleService,
  ) {}

  @Get('users')
  public async getBookListUser(
    @Query('subject') subject: string,
  ): Promise<GetBookResponseForUser[]> {
    return this.getBookService.getBookListUser(subject);
  }

  @Get('librarians')
  public async getBookListLibrarians(
    @Query('subject') subject: string,
  ): Promise<GetBookResponseForLibrarian[]> {
    return this.getBookService.getBookListLibrarian(subject);
  }

  @Post()
  public submitBookPickUpSchedule(
    @Body() body: SubmitBookPickUpScheduleResponse,
  ): void {
    return this.submitBookPickupScheduleService.submitBookPickupSchedule(body);
  }
}
