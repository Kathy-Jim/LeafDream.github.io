'use client'; 

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { LocalBook, GoogleBookItem, IBook } from '../types/book';
import { GoogleBooksAPI } from '../API/api.clases';

// --- Datos Fijos de los Libros del Carrusel ---
const localBooks: LocalBook[] = [
    {
        title: "El ladrón de cuerpos",
        image: "/image/7112AxVz8VL._AC_SX148_SY213_QL70_.jpg",
        description: "Con la revelación de una red que secuestra personas para extraer órganos y abastecer a los ricos y poderosos...",
        parts: 292,
        status: "Finished",
    },
    {
        title: "Redes de Eloy Moreno",
        image: "/image/71qlSpgJHBL._AC_UF894,1000_QL80_.jpg",
        description: "Emotiva, conmovedora, diferente... Redes narra, a traves de los ojos de una adolescente, una historia...",
        parts: 288,
        status: "Finished",
    },
    {
        title: "El exilio de la vida",
        image: "/image/61QwCX7SFvL._AC_UF1000,1000_QL80_.jpg",
        description: "El exilio de la vida, es una historia de ficción, cuenta un poco sobre la crisis de adulto de un profesor de historia...",
        parts: 79,
        status: "Finished",
    },
    // ... agrega el resto de tus libros locales aquí ...
];


export default function BookLibrary() {
    // --- Lógica del Carrusel ---
    const itemsVisible = 3;
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null);
    const maxIndex = localBooks.length - itemsVisible;

    const moveCarousel = useCallback((direction: number) => {
        setCurrentIndex(prevIndex => {
            let newIndex = prevIndex + direction;
            newIndex = Math.max(0, Math.min(newIndex, maxIndex));
            return newIndex;
        });
    }, [maxIndex]);

    useEffect(() => {
        if (carouselRef.current) {
            // Calcula el desplazamiento basado en el porcentaje de un item
            const itemWidthPercentage = 100 / itemsVisible;
            const translateX = -currentIndex * itemWidthPercentage;
            carouselRef.current.style.transform = `translateX(${translateX}%)`;
        }
    }, [currentIndex, itemsVisible]);


    // --- Lógica del Modal ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<LocalBook | null>(null);

    const openModal = (book: LocalBook) => {
        setSelectedBook(book);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedBook(null);
    };


    // --- Lógica de Búsqueda ---
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<GoogleBookItem[] | IBook[]>([]);

    const searchBooks = async () => {
        const api = GoogleBooksAPI.getInstance();
        const googleResults = await api.fetchBooks(searchQuery);
        
        // Simulación de Amazon
        const amazonResults: IBook[] = [
            { title: 'Book 1', author: 'Author 1', price: '$10', link: 'https://amazon.com/book1' },
            { title: 'Book 2', author: 'Author 2', price: '$15', link: 'https://amazon.com/book2' }
        ];

        // Muestra todos los resultados de Google (GoogleBookItem) y Amazon (IBook)
        const [searchResults, setSearchResults] = useState<(GoogleBookItem | IBook)[]>([]); 
    };

    // --- RENDERIZADO ---
    return (
        <>
            {/* Sección de la Librería y Carrusel */}
            <section id="Library" className="hill">
                <h2>Your library</h2>
                <div className="carousel-container">
                    <div className="carousel" ref={carouselRef}>
                        {localBooks.map((book, index) => (
                            <div 
                                className="carousel-item" 
                                key={index} 
                                onClick={() => openModal(book)} // Evento click de React
                                style={{ flex: `0 0 ${100 / itemsVisible}%` }} // Para que quepan 3 items
                            >
                                <Image 
                                    src={book.image} 
                                    alt={book.title} 
                                    width={148} 
                                    height={213}
                                />
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control prev" onClick={() => moveCarousel(-1)} disabled={currentIndex === 0}>&#10094;</button>
                    <button className="carousel-control next" onClick={() => moveCarousel(1)} disabled={currentIndex === maxIndex}>&#10095;</button>
                </div>
            </section>


            {/* Sección de Búsqueda */}
            <section id="Search" className="api">
                <h2>Search books</h2>
                <input 
                    className="search" 
                    type="text" 
                    id="searchQuery" 
                    placeholder="Search for books..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Captura el input
                />
                <button onClick={searchBooks}>Search</button>

                <div id="bookList">
                    {/* Renderiza los resultados */}
                    {searchResults.map((book, index) => (
                        <div className="book" key={index}>
                             {'volumeInfo' in book ? (
                                // Resultado de Google Books
                                <>
                                    <Image 
                                        src={book.volumeInfo.imageLinks?.thumbnail || '/placeholder.jpg'} 
                                        alt="Cover image" 
                                        width={128} 
                                        height={192} 
                                    />
                                    <h3>{book.volumeInfo.title}</h3>
                                    <p>{book.volumeInfo.authors?.[0] || 'Unknown Author'}</p>
                                    <a href={book.volumeInfo.infoLink} target="_blank">View on Google Books</a>
                                </>
                            ) : (
                                // Resultado de Amazon (simulado)
                                <>
                                    <h3>{book.title}</h3>
                                    <p>{book.author}</p>
                                    <p>{book.price}</p>
                                    <a href={book.link} target="_blank">View on Amazon</a>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </section>


            {/* Ventana Modal */}
            {selectedBook && (
                <div id="bookModal" className="modal" style={{ display: isModalOpen ? 'flex' : 'none' }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 id="bookTitle">{selectedBook.title}</h2>
                            <span className="modal-close" onClick={closeModal}>&times;</span>
                        </div>
                        <Image id="bookImage" src={selectedBook.image} alt="Portada del libro" width={200} height={300} />
                        <p id="bookDescription">{selectedBook.description}</p>
                        <div className="book-status">
                            <span id="bookParts">{selectedBook.parts} parts</span>
                            <span id="bookStatus" className={selectedBook.status === 'Finished' ? 'completed' : 'in-progress'}>
                                {selectedBook.status === 'Finished' ? 'Concluido' : 'En progreso'}
                            </span>
                        </div>
                        <button className="btn-leer-ahora">Read now!</button>
                    </div>
                </div>
            )}
        </>
    );
}