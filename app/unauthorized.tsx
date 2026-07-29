import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-4xl font-bold">401</h1>
      <p className="text-muted-foreground">You need to be logged in to access this page.</p>
      <Link href="/login" className="text-primary hover:underline">Sign in</Link>
    </div>
  );
}
