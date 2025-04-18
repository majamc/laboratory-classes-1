// 🏗 Stwórz funkcję 'homeRouting', która obsłuży stronę główną.
const homeRouting = (method, response) => {
    // 🏗 Ustaw odpowiedni nagłówek 'Content-Type'.
    // Podpowiedź: response.setHeader("Content-Type", "text/html");
    response.setHeader("Content-Type", "text/html");

    response.write(`
        <html>
            <head>
                <title>Shop - Home</title>
            </head>
            <body>
                <h1>Home</h1>
                <nav>
                    <a href="/product/add">Add product</a>
                    <a href="/product/new">Newest product</a>
                    <a href="/logout">Logout</a>
                </nav>
            </body>
        </html>
    `);

    // 🏗 Zakończ odpowiedź HTTP po wyrenderowaniu strony.
    // Podpowiedź: return response.end();
    return response.end();
};

// 🔧 Wyeksportuj funkcję 'homeRouting', aby inne moduł mogły jej używać.
module.exports = homeRouting;
