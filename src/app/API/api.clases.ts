// lib/api-classes.ts

import { GoogleBookItem, IBook } from '../types/book';

// --- Singleton API Class ---

export class GoogleBooksAPI {
    private static instance: GoogleBooksAPI;
    private baseURL: string;

    private constructor() {
        this.baseURL = 'https://www.googleapis.com/books/v1/volumes?q=';
    }

    public static getInstance(): GoogleBooksAPI {
        if (!GoogleBooksAPI.instance) {
            GoogleBooksAPI.instance = new GoogleBooksAPI();
        }
        return GoogleBooksAPI.instance;
    }

    public async fetchBooks(query: string): Promise<GoogleBookItem[]> {
        try {
            const response = await fetch(`${this.baseURL}${query}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: { items?: GoogleBookItem[] } = await response.json();
            return data.items || [];
        } catch (error) {
            console.error('Error fetching books:', error);
            // Devuelve un array vacío en caso de error para manejarlo de forma segura
            return [];
        }
    }
}


// --- Factory Classes ---

export class AmazonBook implements IBook {
    public title: string;
    public author: string;
    public price: string;
    public link: string;

    constructor(data: any) {
        this.title = data.title;
        this.author = data.author;
        this.price = data.price;
        this.link = data.link;
    }
}

export class GoogleBook implements IBook {
    public title: string;
    public author: string;
    public price: string;
    public link: string;

    constructor(data: GoogleBookItem) {
        this.title = data.volumeInfo.title;
        this.author = data.volumeInfo.authors?.[0] || 'Unknown Author';
        this.price = data.saleInfo.listPrice?.amount 
            ? `$${data.saleInfo.listPrice.amount.toFixed(2)}` 
            : 'Free';
        this.link = data.volumeInfo.infoLink;
    }
}

export class GenericBook implements IBook {
    public title: string;
    public author: string;
    public price: string;
    public link: string;

    constructor(data: any) {
        this.title = data.title || 'Unknown Title';
        this.author = data.author || 'Unknown Author';
        this.price = data.price || 'Unknown Price';
        this.link = data.link || '#';
    }
}

export class BookFactory {
    // Usamos el tipo genérico IBook para asegurar que el Factory devuelve un objeto conocido
    public static createBook(source: 'amazon' | 'google' | 'generic', data: any): IBook {
        switch (source) {
            case 'amazon':
                return new AmazonBook(data);
            case 'google':
                return new GoogleBook(data as GoogleBookItem);
            default:
                return new GenericBook(data);
        }
    }
}