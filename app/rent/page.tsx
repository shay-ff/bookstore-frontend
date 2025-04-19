'use client';
import { useState } from 'react';
import { returnBook, getBookById } from '@/lib/api';
import { rentBook } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function RentPage() {
  const [bookId, setBookId] = useState('');
  const [status, setStatus] = useState('');
  const router = useRouter();

  const handleRent = async () => {
    setStatus(''); // Reset any previous message
    try {
      const book = await getBookById(bookId);
      if (!book.available) {
        setStatus('Book is already rented out!');
        return;
      }
      const success = await rentBook(Number(bookId));
      if (success) {
        setStatus('Book rented successfully!');
        // Optional: Redirect after rent
        // router.push(`/book/${bookId}`);
      } else {
        setStatus('Failed to rent the book.');
      }
    } catch (error) {
      setStatus('Book not found or server error.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-4 text-indigo-700">Rent a Book 🛒</h2>
      <input
        type="number"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
        placeholder="Enter Book ID"
        className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        onClick={handleRent}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-150"
      >
        Rent Now
      </button>
      {status && <p className="mt-4 text-center text-sm text-gray-700">{status}</p>}
    </div>
  );
}
