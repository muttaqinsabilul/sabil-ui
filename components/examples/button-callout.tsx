import { Button } from "@/components/ui/button"

export default function ButtonCallout() {
  return (
    <div className="flex w-full max-w-lg flex-wrap items-center gap-2 rounded-xl bg-primary/[0.06] p-2.5 pl-4">
      <p className="mr-auto text-sm text-muted-foreground">A new model is available.</p>
      <Button variant="outline" size="sm">Dismiss</Button>
      <Button size="sm">View the model</Button>
    </div>
  )
}
