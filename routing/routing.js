// 📦 Zaimportuj moduł odpowiedzialne za routing poszczególnych części aplikacji.
// 📦 Zaimportuj obiekt STATUS_CODE.
const homeRouting = require("./home");
const productRouting = require("./product");
const logoutRouting = require("./logout");
const { STATUS_CODE } = require("../constants/statusCode");

// 🏗 Stwórz tutaj funkcję 'requestRouting', która będzie obsługiwać zapytania HTTP.
// Podpowiedź: const requestRouting = (request, response) => {
const requestRouting = (request, response) => {
    const { url, method} = request;
    const date = new Date().toISOString();
    // 🏗 Tutaj stwórz logowanie do konsoli informacji, mówiące o typie logowania (INFO), dacie, metodzie oraz url żądania.
    console.info(`INFO [${date}]: ${method} - ${url}`);

    // 🏗 Tutaj stwórz podstawowy 'request routing' dla ścieżek '/', zawierającej /product' oraz '/logout'. Przekaż `request` i `routing` do odpowiednio routingu.
    if (url === "/") {
        return homeRouting(method, response);
    } else if (url.startsWith("/product")) {
        return productRouting(request, response);
    } else if (url === "/logout") {
        return logoutRouting(method, response);

    // 🏗 Obsłuż specjalny przypadek, jeśli użytkownik zostanie przekierowany na ścieżkę /kill, aplikacja się zamknie.
    // 🏗 Stwórz również logowanie do konsoli informacji, mówiące o typie logowania (PROCESS), dacie oraz informację, że wylogowowyanie zostało wywołane a aplikacja zamknie się.
    } else if (url === "/kill") {
        console.log(`PROCESS [${date}]: logout has been initiated and the application will be closed.`);
        process.exit();

    // 🏗 Tutaj stwórz obsługę przypadku, jeśli żądany URL nie istnieje. Zwróć wtedy błąd 404.
    // 🏗 Stwórz również logowanie do konsoli informacji, mówiące o typie logowania (ERROR), dacie oraz informację, że żądany url nie istnieje.
    //  };
    } else {
        console.error(`ERROR [${date}]: requested url ${url} doesn’t exist.`);
        response.statusCode = 404;
        response.setHeader("Content-Type", "text/html");
        response.write("<html><body><h1>404 - Not Found</h1></body></html>");
        response.end();
    }
};

// 🔧 Wyeksportuj funkcję 'requestRouting', aby inne moduł mogły jej używać.
module.exports = requestRouting;
