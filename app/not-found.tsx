import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70svh] max-w-md flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-muted-foreground">The page you are looking for does not exist or has moved.</p>
      <div className="flex gap-2">
        <Button variant="outline" asChild>
          <Link href="/">Home</Link>
        </Button>
        <Button asChild>
          <Link href="/docs">Read the docs</Link>
        </Button>
      </div>
    </div>
  )
}
