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
