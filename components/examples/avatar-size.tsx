import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export function AvatarSizeExample() {
  return (
    <div className="flex flex-wrap items-center gap-2 grayscale">
      <Avatar size="sm">
        <AvatarImage src="https://avatar.vercel.sh/maya" alt="@maya" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://avatar.vercel.sh/maya" alt="@maya" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src="https://avatar.vercel.sh/maya" alt="@maya" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  )
}
