// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6">
      <div className="bg-white p-10 rounded-2xl shadow-md text-center w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6">📱 Phone Auth (Frontend)</h1>

        <div className="flex gap-4 justify-center mb-6">
          <Link
            href="/login"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Login
          </Link>
          <Link
            href="/profile"
            className="px-5 py-2 border rounded-lg hover:bg-gray-100"
          >
            Profile
          </Link>
        </div>

        <p className="text-sm text-gray-500">
          Backend base URL →{" "}
          <code className="bg-gray-100 px-2 py-0.5 rounded">
            {process.env.NEXT_PUBLIC_API_URL}
          </code>
        </p>
      </div>
    </div>
  );
}
