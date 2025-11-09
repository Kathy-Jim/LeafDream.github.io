import React from 'react';
import Image from 'next/image';
import BookLibrary from './components/BookLibrary';

export default function Home() {
  return (
    <>
      <header>
        <div className="logo">
          {/* Asegúrate de que esta imagen exista en public/image/ */}
          <Image 
            src="/image/5b6fef63ccc04a5b91df2b1df0366719-free-removebg-preview (1) (1).png" 
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
