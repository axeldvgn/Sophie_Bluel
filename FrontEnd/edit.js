import { api } from "./config.js";

async function getWorks() {
    const response = await fetch(`${api}/works`);
    return response.json();
}

async function getCategories() {
    const response = await fetch(`${api}/categories`);
    return response.json();
}