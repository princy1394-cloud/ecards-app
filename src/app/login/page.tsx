import { login, signup } from './actions'

export default async function LoginPage(props: {
  searchParams: Promise<{ message: string }>
}) {
  const searchParams = await props.searchParams
  const message = searchParams.message

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50 px-4">
      <form className="flex w-full max-w-md flex-col justify-center gap-4 rounded-xl bg-white p-8 shadow-md">
        <h2 className="text-center text-2xl font-bold text-gray-900">Sign In to Ecards</h2>
        
        {message && (
          <p className="mt-4 bg-red-100 p-4 text-center text-red-600 rounded">
            {message}
          </p>
        )}
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700 mx-1" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-lg border px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
           <label className="text-sm font-semibold text-gray-700 mx-1" htmlFor="password">
             Password
           </label>
           <input
             className="rounded-lg border px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
             id="password"
             name="password"
             type="password"
             placeholder="••••••••"
             required
           />
        </div>

        <div className="mt-4 flex flex-col gap-3">
          <button type="submit" formAction={login} className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
            Log In
          </button>
          <button type="submit" formAction={signup} className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  )
}
