// Tipos base para los datos internos de tus libros
export interface LocalBook {
  title: string;
  image: string; // Ruta de la imagen
  description: string;
  parts: number;
  status: 'Finished' | 'In Progress';
}

// Interfaz para el libro de la API de Google (simplificada)
export interface GoogleBookItem {
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    infoLink: string;
    imageLinks?: {
      thumbnail: string;
    };
  };
  saleInfo: {
    listPrice?: {
      amount: number;
      currencyCode: string;
    };
  };
}

// Tipos para las clases de patrón Factory (libros normalizados)
export interface IBook {
  title: string;
  author: string;
  price: string;
  link: string;
}