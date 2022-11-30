import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { users } from '../../databases/user.database';
import { borrowedBooks } from '../../databases/borrowedBook.database';
import { GetBookResponseForLibrarian } from '../../dtos/getBookResponseForLibrarian';
import { GetBookResponseForUser } from '../../dtos/getBookResponseForUser';
import { OpenLibraryGetBookResponse } from '../../dtos/openLibraryGetBookResponse';

@Injectable()
export class GetBookService {
  public async getBookListUser(
    subject: string,
  ): Promise<GetBookResponseForUser[]> {
    if (!subject || subject === '') {
      throw new HttpException('Subject must be filled', HttpStatus.BAD_REQUEST);
    }

    const response = await axios.get(
      `https://openlibrary.org/subjects/${subject}.json`,
    );

    const books = response.data;

    return this.constructGetBookResponseForUser(books);
  }

  public async getBookListLibrarian(
    subject: string,
  ): Promise<GetBookResponseForLibrarian[]> {
    if (!subject || subject === '') {
      throw new HttpException('Subject must be filled', HttpStatus.BAD_REQUEST);
    }

    const response = await axios.get(
      `https://openlibrary.org/subjects/${subject}.json`,
    );

    const books = response.data;

    return this.constructGetBookResponseForLibrarian(books);
  }

  private constructGetBookResponseForUser(
    books: OpenLibraryGetBookResponse,
  ): GetBookResponseForUser[] {
    const result: GetBookResponseForUser[] = [];
    for (const book of books.works) {
      const convert = {
        coverId: book.cover_id,
        title: book.title,
        authors: [],
        editionNumber: book.edition_count,
        subjects: book.subject,
      };

      for (const author of book.authors) {
        convert.authors.push(author.name);
      }

      result.push(convert);
    }
    return result;
  }

  private constructGetBookResponseForLibrarian(
    books: OpenLibraryGetBookResponse,
  ): GetBookResponseForLibrarian[] {
    const result: GetBookResponseForLibrarian[] = [];
    for (const book of books.works) {
      const convert: GetBookResponseForLibrarian = {
        coverId: book.cover_id,
        title: book.title,
        authors: [],
        editionNumber: book.edition_count,
        subjects: book.subject,
        borrowed: [],
      };

      for (const author of book.authors) {
        convert.authors.push(author.name);
      }

      for (const borrowedBook of borrowedBooks) {
        if (borrowedBook.coverId === book.cover_id) {
          const convertBorrowed = {
            coverId: borrowedBook.coverId,
            userName: '',
            pickupDate: borrowedBook.pickupSchedule,
          };

          for (const user of users) {
            if (user.id === borrowedBook.userId) {
              convertBorrowed.userName = user.name;
              break;
            }
          }

          convert.borrowed.push(convertBorrowed);
        }
      }

      result.push(convert);
    }
    return result;
  }
}
