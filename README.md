# LeafDream: Online Book Recommendation Site

## Description
LeafDream is an online book recommendation site that integrates with multiple book APIs such as Google Books and Amazon. Users can search for books and view information from different sources.

## Design Patterns
1. **Singleton Pattern**: Used for managing the Google Books API connection, ensuring only one instance is used throughout the application.
2. **Factory Pattern**: Used to create book objects from different data sources (Amazon, Google Books, etc.), allowing for flexible integration of new sources in the future.

## Features
- Search for books from Google Books and Amazon.
- View book information including title, author, and purchase links.

## How to Run
1. Clone the repository.
2. Open index.html in a browser.
3. Use the search bar to look for books.
