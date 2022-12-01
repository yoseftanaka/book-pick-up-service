# Prerequisites
- npm should already be installed

# How to install and run
- clone the project
```
git clone https://github.com/yoseftanaka/book-pick-up-service.git
```
- install pm2
```
npm install pm2@latest -g
```
- enter to the project folder and run npm install
```
npm install
```
- build the project
```
npm run build
```
- run project using pm2 (application name can be anything)
```
pm2 start dist/main.js --name <application_name>
```
- server should run on localhost:3000

## Assumptions
- edition_count = the edition of a title
- genre will be omitted because I cannot find any genre in the open library response
- there will be 2 get api, 1 for librarian, 1 for user
- cover id is unique between book
- since there is no authorization, borrowing book will require user id input
- book information will include:
    - coverId
    - title
    - authors
    - editionNumber
    - subjects
- databases will be represented by arrays

## API Contracts
### Get book for customer
- endpoint: `/books/users`
- query parameters:
    - subject: string
- http method: GET
- example response:
```
[
    {
        "coverId": 12818862,
        "title": "Wuthering Heights",
        "authors": [
            "Emily Brontë"
        ],
        "editionNumber": 1542,
        "subjects": [
            "Children's fiction",
            "Classic fiction"
        ]
    }
]
```

### Get book for librarians
- endpoint: `/books/librarians`
- query parameters:
    - subject: string
- http method: GET
- example response:
```
[
    {
        "coverId": 12818862,
        "title": "Wuthering Heights",
        "authors": [
            "Emily Brontë"
        ],
        "editionNumber": 1542,
        "subjects": [
            "Children's fiction",
            "Classic fiction"
        ],
        "borrowed": [
            {
                "coverId": 12818862,
                "userName": "User1",
                "pickupDate": "2022-11-30T00:00:00.000Z"
            }
        ]
    }
]
```

### Submit pickup date
- endpoint: `/books`
- http method: POST
- example request body:
```
{
    "userId": "2",
    "coverId": 8257991,
    "pickUpDate": "2022-11-30T00:00:00.000Z"
}
```
- example response:
```
```