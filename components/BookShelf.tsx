import React from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  price: number;
  available: boolean;
}

interface LatestBooksProps {
  books: Book[];
}

const LatestBooks: React.FC<LatestBooksProps> = ({ books }) => {
  const latestThree = [...books].sort((a, b) => b.id - a.id).slice(0, 3); // Assuming 'id' represents the order of addition

  if (latestThree.length === 0) {
    return <p className="text-gray-600 italic">No books added yet.</p>;
  }

  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {latestThree.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-md shadow-md p-4 hover:shadow-lg transition duration-300 ease-in-out"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{book.title}</h3>
            <p className="text-sm text-gray-600">By {book.author}</p>
            <p className="text-sm text-gray-500 italic">{book.genre}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-indigo-600 font-bold">${book.price.toFixed(2)}</span>
              <span
                className={`text-xs font-semibold rounded-full px-2 py-1 ${
                  book.available ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'
                }`}
              >
                {book.available ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestBooks;