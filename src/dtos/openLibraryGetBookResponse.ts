export class OpenLibraryGetBookResponse {
  name: string;
  works: {
    title: string;
    edition_count: number;
    cover_id: number;
    subject: string[];
    authors: {
      name: string;
    }[];
  }[];
}
