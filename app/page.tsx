'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Import the Link component
import { getAllBooks, addBook } from '@/lib/api';
import LatestBooks from '@/components/BookShelf'; // Assuming you have this component

export default function App() {

  const [id, setId] = useState(1);
  interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    price: number;
    available: boolean;
  }

  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    genre: '',
    price: 0,
    available: true
  });

  useEffect(() => {
    async function fetchBooks() {
      try {
        // Assuming getAllBooks fetches all books, let's limit it for display
        // Ideally, your API would have an endpoint for 'latest' or allow pagination/limiting
        const booksData = await getAllBooks();
        // Sort by ID descending (assuming higher ID means newer) and take latest 3
        const latestBooks = booksData.sort((a: Book, b: Book) => b.id - a.id).slice(0, 3);
        setBooks(latestBooks);
      } catch (error) {
        console.error("Failed to fetch books:", error);
        // Handle error state appropriately in UI
      }
    }
    fetchBooks();
  }, []);

  const handleAddBook = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const addedBook = await addBook(newBook);
      if (addedBook) {
        // Add to the *start* of the list if showing latest, or refetch
        // For simplicity here, just adding to the end for now.
        // Re-fetching might be better to ensure the list is always 'latest'.
        setBooks([...books, addedBook]);
        setNewBook({ title: '', author: '', genre: '', price: 0, available: true }); // Reset form
      }
    } catch (error) {
        console.error("Failed to add book:", error);
        // Handle error state appropriately in UI (e.g., show a message)
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-200 via-gray-300 to-slate-200 min-h-screen py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-8 py-6">
          <h1 className="text-center text-3xl font-extrabold text-indigo-700 mb-6">
            The Cozy Corner Bookstore 📚
          </h1>

          {/* --- START: Added Rent and Return Buttons --- */}
            <div className="flex flex-col items-center gap-4 mb-8"> {/* Use flex and gap for spacing */}
            <div className="flex justify-center gap-4"> {/* Buttons for Rent and Return */}
              <Link href="/rent">
              <button className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-3 px-8 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                Rent a Book 🛒
              </button>
              </Link>
              <Link href="/return">
              <button className="bg-amber-500 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                Return a Book ↩️
              </button>
              </Link>
            </div>
            <div className="mt-4 w-full max-w-md"> {/* Search by ID */}
              <label htmlFor="searchBookId" className="block text-gray-700 text-sm font-bold mb-2 text-center">
              Search Book by ID:
              </label>
                <div className="flex">
                <input
                  type="number"
                  id="searchBookId"
                  placeholder="Enter Book ID"
                  value={id}
                  onChange={(e) => setId(Number(e.target.value))}
                  className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <Link href={`/book/${id}`}>
                  <button
                  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                  >
                  Search 🔍
                  </button>
                </Link>
                </div>
            </div>
            </div>
          {/* --- END: Added Rent and Return Buttons --- */}

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b-2 border-indigo-300 pb-2">
              Latest Arrivals {/* Updated heading to reflect 'latest 3' logic */}
            </h2>
            {/* If you have a BookShelf component to display books */}
            {books.length > 0 ? (
                 <LatestBooks books={books} />
             ) : (
                 <p className="text-gray-600">Loading books or no books available...</p>
             )}
            {/* Or display directly if BookShelf component doesn't exist yet: */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {books.map((book) => (
                    <div key={book.id} className="border p-4 rounded shadow bg-gray-50">
                        <h3 className="font-semibold text-lg">{book.title}</h3>
                        <p className="text-gray-600 text-sm">{book.author}</p>
                        <p className="text-gray-800 font-medium mt-2">${book.price.toFixed(2)}</p>
                    </div>
                ))}
            </div> */}
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-3 border-b-2 border-indigo-300 pb-2">
              Add a New Treasure 📖
            </h2>
            <form onSubmit={handleAddBook} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Form fields remain the same */}
              <div>
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
                <input
                  type="text"
                  id="title"
                  placeholder="The Great Adventure"
                  required // Add basic validation
                  value={newBook.title}
                  onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">Author:</label>
                <input
                  type="text"
                  id="author"
                  placeholder="Jane Doe"
                  required
                  value={newBook.author}
                  onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="genre" className="block text-gray-700 text-sm font-bold mb-2">Genre:</label>
                <input
                  type="text"
                  id="genre"
                  placeholder="Fantasy"
                  value={newBook.genre}
                  onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price:</label>
                <input
                  type="number"
                  id="price"
                  placeholder="19.99"
                  required
                  min="0" // Add basic validation
                  step="0.01" // Allow cents
                  value={newBook.price || ''} // Ensure value is controlled correctly even if 0
                  onChange={(e) => setNewBook({ ...newBook, price: parseFloat(e.target.value) || 0 })} // Handle potential NaN
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline w-full transition duration-150 ease-in-out"
                >
                  Add to Shelves ➕
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}