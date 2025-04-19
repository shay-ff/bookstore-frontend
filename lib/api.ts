const BASE_URL = "http://localhost:8080/api/books";

export const getAllBooks = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const addBook = async (book: any) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  return res.json();
};

export const rentBook = async (id: number) => {
  const res = await fetch(`${BASE_URL}/${id}/rent`, { method: "POST" });
  return res.json();
};

export const returnBook = async (id: number) => {
  const res = await fetch(`${BASE_URL}/${id}/return`, { method: "POST" });
  return res.json();
};
export async function getBookById(id: string) {
  const res = await fetch(`http://localhost:8080/api/books/${id}`);
  if (!res.ok) throw new Error("Book not found");
  return await res.json();
}
