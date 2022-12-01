import { Test } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { GetBookService } from '../book/getBook.service';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('GetBookService', () => {
  let getBookService: GetBookService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [GetBookService],
    }).compile();

    getBookService = moduleRef.get<GetBookService>(GetBookService);
  });

  describe('getBookListUser', () => {
    it('should throw subject must be filled exception exception', async () => {
      await expect(
        getBookService.getBookListUser(undefined),
      ).rejects.toThrowError(HttpException);
    });

    // it('should return data to user', async () => {
    //   const subject = 'love';
    //   axios.get.mockResolvedValueOnce({ data: null });
    //   await expect(getBookService.getBookListUser(subject)).resolves.toEqual(
    //     null,
    //   );
    // });
  });
});
