import { useMutation, useQuery } from "@tanstack/react-query";
import { Author, Book } from "@/types";

const API_URL = "http://localhost:4000/graphql";

// Queries
const GET_BOOKS = `
  query GetBooks {
    books {
      _id
      name
      genre
      author {
        _id
        name
        age
      }
    }
  }
`;

const GET_BOOK = `
  query GetBook($id: ID!) {
    book(id: $id) {
      _id
      name
      genre
      author {
        _id
        name
        age
      }
    }
  }
`;

const GET_AUTHORS = `
  query GetAuthors {
    authors {
      _id
      name
      age
      books {
        _id
        name
      }
    }
  }
`;

const GET_AUTHOR = `
  query GetAuthor($id: ID!) {
    author(id: $id) {
      _id
      name
      age
      books {
        _id
        name
        genre
      }
    }
  }
`;

// Mutations
const ADD_BOOK = `
  mutation CreateBook($name: String!, $genre: String!, $authorId: ID!) {
    createBook(name: $name, genre: $genre, authorId: $authorId) {
      _id
      name
      genre
    }
  }
`;

const ADD_AUTHOR = `
  mutation CreateAuthor($name: String!, $age: Int!) {
    createAuthor(name: $name, age: $age) {
      _id
    }
  }
`;

async function fetchGraphQL(query: string, variables = {}) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    });

    const json = await response.json();

    if (json.errors) {
        throw new Error(json.errors[0].message);
    }

    return json.data;
}

// Hooks
export function useBooks() {
    return useQuery({
        queryKey: ["books"],
        queryFn: async () => {
            const data = await fetchGraphQL(GET_BOOKS);
            return data.books as Book[];
        },
    });
}

export function useBook(id: string) {
    return useQuery({
        queryKey: ["book", id],
        queryFn: async () => {
            const data = await fetchGraphQL(GET_BOOK, { id });
            return data.book as Book;
        },
        enabled: !!id,
    });
}

export function useAuthors() {
    return useQuery({
        queryKey: ["authors"],
        queryFn: async () => {
            const data = await fetchGraphQL(GET_AUTHORS);
            return data.authors as Author[];
        },
    });
}

export function useAuthor(id: string) {
    return useQuery({
        queryKey: ["author", id],
        queryFn: async () => {
            const data = await fetchGraphQL(GET_AUTHOR, { id });
            return data.author as Author;
        },
        enabled: !!id,
    });
}

export function useAddBook() {
    return useMutation({
        mutationFn: async (variables: {
            name: string;
            genre: string;
            authorId: string;
        }) => {
            const data = await fetchGraphQL(ADD_BOOK, variables);
            return data.addBook as Book;
        },
    });
}

export function useAddAuthor() {
    return useMutation({
        mutationFn: async (variables: { name: string; age: number }) => {
            const data = await fetchGraphQL(ADD_AUTHOR, variables);
            return data.addAuthor as Author;
        },
    });
}
