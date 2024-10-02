let currentIndex = 0;
const itemsVisible = 3; // Número de libros visibles al mismo tiempo

function moveCarousel(direction) {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');

    // Calcula el nuevo índice
    currentIndex = (currentIndex + direction + items.length) % items.length;

    // Asegura que no muestre más libros de los que hay
    const maxIndex = items.length - itemsVisible;
    if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
    }
    if (currentIndex < 0) {
        currentIndex = 0;
    }

    // Mueve el carrusel
    const translateX = -currentIndex * (100 / itemsVisible);
    carousel.style.transform = `translateX(${translateX}%)`;
}




// Función para abrir el modal con la información del libro
function openModal(bookTitle, bookImage, bookDescription, bookParts, bookStatus) {
    document.getElementById("bookTitle").innerText = bookTitle;
    document.getElementById("bookImage").src = bookImage;
    document.getElementById("bookDescription").innerText = bookDescription;
    document.getElementById("bookParts").innerText = bookParts + " parts";
    
    const statusElement = document.getElementById("bookStatus");
    statusElement.innerText = bookStatus;
    if (bookStatus === "Concluido") {
        statusElement.classList.add("completed");
    } else {
        statusElement.classList.remove("completed");
    }
    
    document.getElementById("bookModal").style.display = "flex"; // Muestra el modal
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById("bookModal").style.display = "none";
}

/*Para abrir una pagina emergente*/
document.querySelectorAll('.carousel-item img').forEach((img, index) => {
    img.addEventListener('click', () => {
        // Datos de ejemplo por cada libro, puedes ajustarlos a los datos reales
        const books = [
            {
                title: "El ladrón de cuerpos",
                image: "image/7112AxVz8VL._AC_SX148_SY213_QL70_.jpg",
                description: "Con la revelación de una red que secuestra personas para extraer órganos y abastecer a los ricos y poderosos, Marta y su equipo se sumergen en un submundo de secretos, traiciones y peligro extremo. Mientras luchan contra la burocracia, deben desentrañar la red y detener a sus cabecillas antes de que más vidas sean sacrificadas. En una carrera contrarreloj, Marta debe tomar decisiones difíciles antes de un enfrentamiento final lleno de suspense que la llevará al límite en su búsqueda de justicia.",
                Pages: 292,
                status: "Finished",
            },
            {
                title: "Redes de Eloy Moreno",
                image: "image/71qlSpgJHBL._AC_UF894,1000_QL80_.jpg",
                description: "Emotiva, conmovedora, diferente... Redes narra, a traves de los ojos de una adolescente, una historia que se ha convertido en la realidad de todos nosotros. ¿Cuántos likes vale tu felicidad? Se pasa unas horas más viendo los viajes maravillosos, los cuerpos perfectos y todos los outfits que se prueban cada día los influencers. Y se siente mal porque ella no puede llevar la vida que ve en las redes, sabe que nunca podrá alcanzar una felicidad así.",
                Pages: 288,
                status: "Finished"
            },
            {
                title: "El exilio de la vida",
                image: "image/61QwCX7SFvL._AC_UF1000,1000_QL80_.jpg",
                description: "El exilio de la vida, es una historia de ficción, cuenta un poco sobre la crisis de adulto de un profesor de historia, de mediana edad, que huye de la rutina, de sus penas y frustraciones, en busca de esa “chispa de felicidad” que justifique el valor de su existencia.",
                Pages: 79,
                status: "Finished"
            },

            {
                title: "Los caminos del agua",
                image: "image/51Ya0TP1vYL._AC_UF1000,1000_QL80_.jpg",
                description: "Con la premura del ser y el imperceptible impulso del poeta, Armando López Carralero se adentra en la profundidad de unas aguas que conoce bien, porque están mezcladas con su impaciencia y esa parsimonia que disfraza al caminante.",
                Pages: 92,
                status: "Finished"
            },

            {
                title: "Dos minutos bajo el agua",
                image: "image/61IPDCStv1L._AC_UF894,1000_QL80_.jpg",
                description: "Dejar atrás el cuerpo del ser amado, viajar sin retorno al tiempo de la felicidad, emigrar y descubrir los vínculos esenciales. En esas aguas se sumergen los poemas de Gustavo Manrique para remover los recuerdos, los sentimientos y la pérdida.",
                Pages: 52,
                status: "Finished"
            },

            {
                title: "Nos dimos un tiempo",
                image: "image/61kFnJYkohL._AC_UF894,1000_QL80_.jpg",
                description: "`Nos Dimos un Tiempo` es una obra que despierta el interés desde la primera página, te invita a explorar las complejidades del amor adolescente y te deja deseando más al final. Anímate a leerla y añádela a tu lista de imprescindibles. Un viaje a través de las emociones, de la amistad y del amor espera por ti en cada página.",
                Pages: 230,
                status: "Finished"
            },

        ];

        const book = books[index]; // Obtener los datos del libro actual
        openModal(book.title, book.image, book.description, book.parts, book.status);
    });
});

class GoogleBooksAPI {
    constructor() {
        if (GoogleBooksAPI.instance) {
            return GoogleBooksAPI.instance;
        }
        this.baseURL = 'https://www.googleapis.com/books/v1/volumes?q=';
        GoogleBooksAPI.instance = this;
    }

    async fetchBooks(query) {
        try {
            const response = await fetch(`${this.baseURL}${query}`);
            const data = await response.json();
            return data.items || [];
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    }
}

// Uso del Singleton para obtener libros
const googleBooksAPI = new GoogleBooksAPI();
googleBooksAPI.fetchBooks('javascript').then(books => {
    console.log(books); // Mostrar los libros en consola o integrarlos en la interfaz
});

class BookFactory {
    static createBook(source, data) {
        switch (source) {
            case 'amazon':
                return new AmazonBook(data);
            case 'google':
                return new GoogleBook(data);
            default:
                return new GenericBook(data);
        }
    }
}

class AmazonBook {
    constructor(data) {
        this.title = data.title;
        this.author = data.author;
        this.price = data.price;
        this.link = data.link;
    }
}

class GoogleBook {
    constructor(data) {
        this.title = data.volumeInfo.title;
        this.author = data.volumeInfo.authors?.[0];
        this.price = data.saleInfo.listPrice?.amount || 'Free';
        this.link = data.volumeInfo.infoLink;
    }
}

class GenericBook {
    constructor(data) {
        this.title = data.title || 'Unknown Title';
        this.author = data.author || 'Unknown Author';
        this.price = data.price || 'Unknown Price';
        this.link = data.link || '#';
    }
}

// Uso del patrón Factory
googleBooksAPI.fetchBooks('harry potter').then(books => {
    const bookObjects = books.map(book => BookFactory.createBook('google', book));
    console.log(bookObjects);
});

async function searchGoogleBooks(query) {
    const googleBooksAPI = new GoogleBooksAPI();
    const books = await googleBooksAPI.fetchBooks(query);
    // Aquí puedes mostrar los resultados en la interfaz
    books.forEach(book => {
        // Crear elementos HTML para mostrar los libros
        const bookHTML = `
            <div class="book">
                <h3>${book.volumeInfo.title}</h3>
                <p>${book.volumeInfo.authors?.[0]}</p>
                <a href="${book.volumeInfo.infoLink}" target="_blank">View on Google Books</a>
            </div>
        `;
        document.getElementById('bookList').innerHTML += bookHTML;
    });
}
async function searchAmazonBooks(query) {
    // Simulación de búsqueda en Amazon (Amazon API requiere autenticación)
    const books = [
        { title: 'Book 1', author: 'Author 1', price: '$10', link: 'https://amazon.com/book1' },
        { title: 'Book 2', author: 'Author 2', price: '$15', link: 'https://amazon.com/book2' }
    ];

    books.forEach(book => {
        const bookHTML = `
            <div class="book">
                <h3>${book.title}</h3>
                <p>${book.author}</p>
                <p>${book.price}</p>
                <a href="${book.link}" target="_blank">View on Amazon</a>
            </div>
        `;
        document.getElementById('bookList').innerHTML += bookHTML;
    });
}

function searchBooks() {
    const query = document.getElementById('searchQuery').value;
    // Buscar en Google Books y Amazon
    searchGoogleBooks(query);
    searchAmazonBooks(query);
}

async function searchGoogleBooks(query) {
    const googleBooksAPI = new GoogleBooksAPI();
    const books = await googleBooksAPI.fetchBooks(query);
    
    // Limpiar el contenido previo
    document.getElementById('bookList').innerHTML = '';

    // Mostrar resultados en el contenedor
    books.forEach(book => {
        const bookHTML = `
            <div class="book">
                <img src="${book.volumeInfo.imageLinks?.thumbnail || 'placeholder.jpg'}" alt="Cover image">
                <h3>${book.volumeInfo.title}</h3>
                <p>${book.volumeInfo.authors?.[0] || 'Unknown Author'}</p>
                <a href="${book.volumeInfo.infoLink}" target="_blank">View on Google Books</a>
            </div>
        `;
        document.getElementById('bookList').innerHTML += bookHTML;
    });
}
