'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { rentBook, returnBook, getBookById } from '@/lib/api'; // You’ll need to implement getBookById in your api.ts

export default function BookDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchBook() {
      try {
        if (typeof id === 'string') {
          const data = await getBookById(id);
            setBook(data);
        } else {
          throw new Error('Invalid book ID');
        }
      } catch (err) {
        setError('Book not found or failed to load.');
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchBook();
  }, [id]);

  const handleToggleAvailability = async () => {
    try {
      const success = book.available
        ? await rentBook(book.id)
        : await returnBook(book.id);
      if (success) {
        setBook({ ...book, available: !book.available });
      }
    } catch {
      alert('Action failed. Try again.');
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-indigo-600 mb-4">{book.title}</h1>
      <p className="text-gray-800"><strong>Author:</strong> {book.author}</p>
      <p className="text-gray-700"><strong>Genre:</strong> {book.genre}</p>
      <p className="text-gray-700"><strong>Price:</strong> ₹{book.price.toFixed(2)}</p>
      <p className="text-gray-700"><strong>Status:</strong> {book.available ? 'Available ✅' : 'Rented ❌'}</p>

      <button
        onClick={handleToggleAvailability}
        className={`mt-6 px-6 py-2 font-semibold rounded ${
          book.available
            ? 'bg-sky-500 hover:bg-sky-600'
            : 'bg-amber-500 hover:bg-amber-600'
        } text-white`}
      >
        {book.available ? 'Rent This Book 🛒' : 'Return This Book ↩️'}
      </button>

      <div className="mt-6">
        <Link href="/" className="text-indigo-500 hover:underline">
          ⬅ Back to Home
        </Link>
      </div>
    </div>
  );
}
