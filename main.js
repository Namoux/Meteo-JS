import { GetDate, listSearch, searchBySubmit, getCurrentPosition } from "./component.js";

/**
 * Entry Point
 */
function main() {
    GetDate();
    searchBySubmit();
    listSearch();
    // getCurrentPosition();
}

main();