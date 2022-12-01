import { Test } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { GetBookService } from '../book/getBook.service';
import axios from 'axios';
import { OpenLibraryGetBookResponse } from '../../dtos/openLibraryGetBookResponse';

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

    it('should return data to user', async () => {
      const subject = 'love';
      const response: OpenLibraryGetBookResponse = {
        name: 'love',
        works: [
          {
            title: 'book',
            edition_count: 123,
            cover_id: 1234,
            subject: ['subject1', 'subject2'],
            authors: [
              {
                name: 'author1',
              },
            ],
          },
        ],
      };

      const expectedResponse = [
        {
          authors: ['author1'],
          coverId: 1234,
          editionNumber: 123,
          subjects: ['subject1', 'subject2'],
          title: 'book',
        },
      ];

      mockedAxios.get.mockResolvedValueOnce({ data: response });
      await expect(getBookService.getBookListUser(subject)).resolves.toEqual(
        expectedResponse,
      );
    });
  });

  describe('getBookListLibrarian', () => {
    it('should throw subject must be filled exception exception', async () => {
      await expect(
        getBookService.getBookListLibrarian(undefined),
      ).rejects.toThrowError(HttpException);
    });

    it('should return data to user', async () => {
      const subject = 'love';
      const response: OpenLibraryGetBookResponse = {
        name: 'love',
        works: [
          {
            title: 'book',
            edition_count: 123,
            cover_id: 1234,
            subject: ['subject1', 'subject2'],
            authors: [
              {
                name: 'author1',
              },
            ],
          },
        ],
      };

      const expectedResponse = [
        {
          authors: ['author1'],
          coverId: 1234,
          editionNumber: 123,
          subjects: ['subject1', 'subject2'],
          title: 'book',
          borrowed: [],
        },
      ];

      mockedAxios.get.mockResolvedValueOnce({ data: response });
      await expect(
        getBookService.getBookListLibrarian(subject),
      ).resolves.toEqual(expectedResponse);
    });
  });
});
