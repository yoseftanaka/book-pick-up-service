export class GetBookResponseForLibrarian {
  coverId: number;
  title: string;
  authors: string[];
  editionNumber: number;
  subjects: string[];
  borrowed: {
    coverId: number;
    userName: string;
    pickupDate: Date;
  }[];
}
