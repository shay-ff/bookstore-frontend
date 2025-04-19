'use client';
import { useState } from 'react';
import { returnBook, getBookById } from '@/lib/api';

export default function ReturnPage() {
  const [bookId, setBookId] = useState('');
  const [status, setStatus] = useState('');

  const handleReturn = async () => {
    setStatus('');
    try {
      const book = await getBookById(bookId);
      if (book.available) {
        setStatus('Book is already returned!');
        return;
      }
      const success = await returnBook(Number(bookId));
      if (success) {
        setStatus('Book returned successfully!');
      } else {
        setStatus('Failed to return the book.');
      }
    } catch (error) {
      setStatus('Book not found or server error.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-4 text-amber-700">Return a Book ↩️</h2>
      <input
        type="number"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
        placeholder="Enter Book ID"
        className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
      <button
        onClick={handleReturn}
        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded transition duration-150"
      >
        Return Now
      </button>
      {status && <p className="mt-4 text-center text-sm text-gray-700">{status}</p>}
    </div>
  );
}
