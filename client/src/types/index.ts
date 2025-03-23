export interface Book {
    _id: string;
    name: string;
    genre: string;
    author: Author;
}

export interface Author {
    _id: string;
    name: string;
    age: number;
    books: Book[];
}
