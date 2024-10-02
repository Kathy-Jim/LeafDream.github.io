class Carousel {
    constructor() {
        if (Carousel.instance) {
            return Carousel.instance;
        }
        this.currentIndex = 0;
        this.carousel = document.querySelector('.carousel');
        this.items = document.querySelectorAll('.carousel-item');
        this.updateItemsVisible();
        Carousel.instance = this;
        return this;
    }

    updateItemsVisible() {
        const carouselWidth = this.carousel.parentElement.offsetWidth;
        const itemWidth = this.items[0].offsetWidth;
        this.itemsVisible = Math.floor(carouselWidth / itemWidth);
        // Asegurar que siempre haya al menos un ítem visible
        if (this.itemsVisible < 1) this.itemsVisible = 1;
    }

    move(direction) {
        const totalItems = this.items.length;
        const maxIndex = totalItems - this.itemsVisible;

        // Actualizar índice en la dirección especificada
        this.currentIndex = this.currentIndex + direction;
        
        if (this.currentIndex > maxIndex) {
            this.currentIndex = maxIndex; // No pasar el último ítem
        } else if (this.currentIndex < 0) {
            this.currentIndex = 0; // No ir más allá del primer ítem
        }

        // Aplicar el cambio de transformación
        const translateX = -this.currentIndex * (250 / this.itemsVisible);
        this.carousel.style.transform = `translateX(${translateX}%)`;
    }
}

const carouselInstance = new Carousel();

// Actualizar el número de ítems visibles al cambiar el tamaño de la ventana
window.addEventListener('resize', () => {
    carouselInstance.updateItemsVisible();
});



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
                description: "",
                parts: 57,
                status: "Finished"
            },
            {
                title: "Redes de Eloy Moreno",
                image: "image/71qlSpgJHBL._AC_UF894,1000_QL80_.jpg",
                description: "Un libro sobre las complejidades de las redes sociales.",
                parts: 5,
                status: "Concluido"
            },
            {
                title: "El ladrón de cuerpos",
                image: "image/61QwCX7SFvL._AC_UF1000,1000_QL80_.jpg",
                description: "Una historia sobre el robo de cuerpos y las consecuencias.",
                parts: 46,
                status: "En progreso"
            }
        ];

        const book = books[index]; // Obtener los datos del libro actual
        openModal(book.title, book.image, book.description, book.parts, book.status);
    });
});