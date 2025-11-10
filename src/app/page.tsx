import React from 'react';
import Image from 'next/image';
import BookLibrary from './components/BookLibrary';

export default function Home() {
  return (
    <>
      <header>
        <div className="logo">
          <Image 
            src="/img/image.png" 
            alt="LeafDream" 
            width={200}
            height={50}
            style={{ marginTop: '15px', height: 'auto' }}
          />
        </div>

        <nav>
          <ul>
            <li><a href="#Home">Home</a></li>
            <li><a href="#Library">Your library</a></li>
            <li><a href="#Search">Search</a></li>
          </ul>
        </nav>
      </header>
      
      {/* El resto de la funcionalidad interactiva se renderiza desde el componente cliente */}
      <BookLibrary />
    </>
  );
}
