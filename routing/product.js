// 📦 Zaimportuj moduły 'fs' oraz 'STATUS_CODE' do obsługi produktów.
const fs = require('fs');
const { STATUS_CODE } = require('../constants/statusCode');

// 🏗 Stwórz funkcję 'productRouting', która obsłuży żądania dotyczące produktów.
const productRouting = (request, response) => {
    const { url, method } = request;

    if (url === "/product/add" && method === "GET") {
        return renderAddProductPage(response);
    } else if (url === "/product/add" && method === "POST") {
        return addNewProduct(request, response);
    } else if (url === "/product/new") {
        return renderNewProductPage(response);
    } else {
        console.error(`ERROR: requested url ${url} doesn’t exist.`);
        response.writeHead(STATUS_CODE.NOT_FOUND, { "Content-Type": "text/plain" });
        return response.end("404 Not Found");
    }
};

// 🏗 Stwórz funkcję 'renderAddProductPage', która wyrenderuje stronę dodawania produktu.
const renderAddProductPage = (response) => {
    response.setHeader("Content-Type", "text/html");
    response.write(`
            <html>
                <head>
                    <title>Shop - Logout</title>
                </head>
                <body>
                    <h1>Logout</h1>
                    <nav>
                        <a href="/product/add">Add product</a>
                        <a href="/product/new">Newest product</a>
                        <a href="/logout">Logout</a>
                    </nav>
                </body>
            </html>
        `);
    return response.end();
};

// 🏗 Stwórz funkcję 'renderNewProductPage', która wyświetli najnowszy produkt z pliku 'product.txt'.
// Podpowiedź: fileSystem.readFile(...);
const renderNewProductPage = (response) => {
    fs.readFile("product.txt", "utf8", (err, data) => {
        response.setHeader("Content-Type", "text/html");
        response.write("<html><head><title>Index - Student</title></html>");
        response.write("<body><h1>Products</h1>");
        if (err) {
            response.write("<h1>No products found</h1>");
        } else {
            response.write(`<h1>Newest Product: ${data}</h1>`);
        }
        response.write("</body></html>");
        response.end();
    });
};

// 🏗 Stwóz funkcję 'addNewProduct', która obsłuży dodawanie nowego produktu, zapisywanie go do pliku 'product.txt' oraz przeniesie użytkownika na stronę '/product/new'.
// Podpowiedź: fileSystem.writeFile(...);
// Podpowiedź: response.setHeader("Location", "/product/new");
const addNewProduct = (request, response) => {
    let body = "";
    request.on("data", (chunk) => {
        body += chunk.toString();
    });

    request.on("end", () => {
        const productName = new URLSearchParams(body).get("productName");
        fs.writeFile("product.txt", productName, (err) => {
            response.writeHead(STATUS_CODE.FOUND, { Location: "/product/new" });
            return response.end();
        });
    });
};

// 🔧 Wyeksportuj funkcję 'productRouting', aby inne moduł mogły jej używać.
module.exports = productRouting;
