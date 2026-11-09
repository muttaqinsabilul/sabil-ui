"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  BarChart3,
  CalendarDays,
  Inbox,
  LayoutDashboard,
  MoreHorizontal,
  PenSquare,
  Plus,
  RefreshCw,
  Trash2,
  TrendingDown,
  TrendingUp,
  Unplug,
} from "lucide-react"
import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

type Status = "connected" | "paused" | "error"

type Account = {
  id: string
  platform: string
  short: string
  handle: string
  followers: number
  change: number
  engagement: number
  status: Status
}

const initialAccounts: Account[] = [
  { id: "ig", platform: "Instagram", short: "IG", handle: "@sabil.studio", followers: 48210, change: 3.2, engagement: 4.8, status: "connected" },
  { id: "x", platform: "X", short: "X", handle: "@sabilstudio", followers: 21540, change: -0.6, engagement: 1.9, status: "connected" },
  { id: "li", platform: "LinkedIn", short: "in", handle: "Sabil Studio", followers: 12890, change: 5.4, engagement: 3.1, status: "connected" },
  { id: "yt", platform: "YouTube", short: "YT", handle: "Sabil Studio", followers: 9320, change: 1.8, engagement: 6.2, status: "paused" },
  { id: "tt", platform: "TikTok", short: "TT", handle: "@sabil.studio", followers: 33075, change: 8.9, engagement: 7.4, status: "error" },
]

const scheduled = [
  { id: 1, title: "Product launch teaser", accounts: ["IG", "TT"], when: "Today, 18:00", progress: 100 },
  { id: 2, title: "Weekly design tips thread", accounts: ["X", "in"], when: "Tomorrow, 09:30", progress: 80 },
  { id: 3, title: "Behind the scenes vlog", accounts: ["YT"], when: "Thu, 15:00", progress: 40 },
  { id: 4, title: "Customer story carousel", accounts: ["IG", "in"], when: "Fri, 11:00", progress: 60 },
]

const growth = Array.from({ length: 90 }, (_, i) => {
  const d = new Date(2026, 7, 12 + i)
  const wave = (n: number) => Math.round(Math.sin(i / n) * 40)
  return {
    date: d.toISOString().slice(0, 10),
    instagram: 380 + i * 4 + wave(5),
    tiktok: 260 + i * 6 + wave(4),
    linkedin: 140 + i * 2 + wave(7),
  }
})

const chartConfig = {
  instagram: { label: "Instagram", color: "var(--chart-1)" },
  tiktok: { label: "TikTok", color: "var(--chart-3)" },
  linkedin: { label: "LinkedIn", color: "var(--chart-4)" },
} satisfies ChartConfig

const nav = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Calendar", icon: CalendarDays },
  { label: "Inbox", icon: Inbox, badge: 12 },
  { label: "Analytics", icon: BarChart3 },
]

const statusBadge: Record<Status, { label: string; variant: "secondary" | "outline" | "destructive" }> = {
  connected: { label: "Connected", variant: "secondary" },
  paused: { label: "Paused", variant: "outline" },
  error: { label: "Needs reconnect", variant: "destructive" },
}

const number = new Intl.NumberFormat("en-US")
const compact = new Intl.NumberFormat("en-US", { notation: "compact" })

function PlatformAvatar({ short, size }: { short: string; size?: "sm" | "default" }) {
  return (
    <Avatar size={size}>
      <AvatarFallback className="text-xs font-semibold">{short}</AvatarFallback>
    </Avatar>
  )
}

export function SocialDashboard() {
  const [accounts, setAccounts] = React.useState(initialAccounts)
  const [range, setRange] = React.useState("30")
  const [filter, setFilter] = React.useState("all")
  const [removing, setRemoving] = React.useState<Account | null>(null)

  const visible = filter === "all" ? accounts : accounts.filter((a) => a.id === filter)
  const totalFollowers = visible.reduce((sum, a) => sum + a.followers, 0)
  const avgEngagement = visible.length
    ? visible.reduce((sum, a) => sum + a.engagement, 0) / visible.length
    : 0
  const chartData = growth.slice(-Number(range))

  function updateStatus(id: string, status: Status) {
    setAccounts((list) => list.map((a) => (a.id === id ? { ...a, status } : a)))
  }

  const stats = [
    { label: "Total followers", value: compact.format(totalFollowers), change: 4.1 },
    { label: "Avg. engagement", value: `${avgEngagement.toFixed(1)}%`, change: 0.8 },
    { label: "Impressions (30d)", value: "1.2M", change: 12.5 },
    { label: "Scheduled posts", value: String(scheduled.length), change: -2.0 },
  ]

  return (
    <SidebarProvider className="min-h-[calc(100svh-3.5rem)]">
      <Sidebar className="top-14 h-[calc(100svh-3.5rem)]">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-1.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
              S
            </div>
            <div className="grid text-sm leading-tight">
              <span className="font-semibold tracking-tight">Sabil Studio</span>
              <span className="text-xs text-muted-foreground">{accounts.length} accounts</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarMenu>
              {nav.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton isActive={item.active}>
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                  {item.badge ? <SidebarMenuBadge>{item.badge}</SidebarMenuBadge> : null}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Accounts</SidebarGroupLabel>
            <SidebarMenu>
              {accounts.map((a) => (
                <SidebarMenuItem key={a.id}>
                  <SidebarMenuButton isActive={filter === a.id} onClick={() => setFilter(filter === a.id ? "all" : a.id)}>
                    <span className="flex size-4 items-center justify-center text-[10px] font-semibold">{a.short}</span>
                    <span>{a.platform}</span>
                  </SidebarMenuButton>
                  {a.status === "error" ? (
                    <SidebarMenuBadge className="text-destructive">!</SidebarMenuBadge>
                  ) : null}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-1 h-4!" />
          <h1 className="truncate text-sm font-semibold tracking-tight">Overview</h1>
          <div className="ml-auto flex items-center gap-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger size="sm" className="w-32 sm:w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All accounts</SelectItem>
                {accounts.map((a) => (
                  <SelectItem key={a.id} value={a.id}>
                    {a.platform}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <NewPostDialog accounts={accounts} />
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((s) => (
              <Card key={s.label} size="sm">
                <CardHeader>
                  <CardDescription>{s.label}</CardDescription>
                  <CardTitle className="text-2xl font-semibold tracking-tight tabular-nums">
                    {s.value}
                  </CardTitle>
                  <CardAction>
                    <Badge variant={s.change >= 0 ? "secondary" : "destructive"}>
                      {s.change >= 0 ? <TrendingUp /> : <TrendingDown />}
                      {s.change >= 0 ? "+" : ""}
                      {s.change}%
                    </Badge>
                  </CardAction>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader>
                <CardTitle>Follower growth</CardTitle>
                <CardDescription>New followers per day</CardDescription>
                <CardAction>
                  <Tabs value={range} onValueChange={setRange}>
                    <TabsList>
                      <TabsTrigger value="7">7d</TabsTrigger>
                      <TabsTrigger value="30">30d</TabsTrigger>
                      <TabsTrigger value="90">90d</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardAction>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <ChartContainer config={chartConfig} className="aspect-auto min-h-[260px] w-full flex-1">
                  <AreaChart data={chartData} margin={{ left: 4, right: 4 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      minTickGap={32}
                      tickFormatter={(v) =>
                        new Date(v).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                      }
                    />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                    {(["linkedin", "instagram", "tiktok"] as const).map((key) => (
                      <Area
                        key={key}
                        dataKey={key}
                        type="natural"
                        fill={`var(--color-${key})`}
                        fillOpacity={0.15}
                        stroke={`var(--color-${key})`}
                        strokeWidth={2}
                      />
                    ))}
                    <ChartLegend content={<ChartLegendContent />} />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Scheduled</CardTitle>
                <CardDescription>Next posts in the queue</CardDescription>
              </CardHeader>
              <CardContent>
                <ItemGroup className="gap-1">
                  {scheduled.map((p) => (
                    <Item key={p.id} size="sm" className="px-0">
                      <ItemContent>
                        <ItemTitle>{p.title}</ItemTitle>
                        <ItemDescription>{p.when}</ItemDescription>
                        <Progress value={p.progress} className="mt-1.5" aria-label="Draft progress" />
                      </ItemContent>
                      <ItemActions>
                        <div className="flex -space-x-1.5">
                          {p.accounts.map((s) => (
                            <PlatformAvatar key={s} short={s} size="sm" />
                          ))}
                        </div>
                      </ItemActions>
                    </Item>
                  ))}
                </ItemGroup>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Accounts</CardTitle>
              <CardDescription>Performance and connection status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Account</TableHead>
                    <TableHead className="text-right">Followers</TableHead>
                    <TableHead className="text-right">30d change</TableHead>
                    <TableHead className="text-right">Engagement</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-10" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visible.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell>
                        <Item size="xs" className="p-0">
                          <ItemMedia>
                            <PlatformAvatar short={a.short} size="sm" />
                          </ItemMedia>
                          <ItemContent>
                            <ItemTitle>{a.platform}</ItemTitle>
                            <ItemDescription>{a.handle}</ItemDescription>
                          </ItemContent>
                        </Item>
                      </TableCell>
                      <TableCell className="text-right tabular-nums">{number.format(a.followers)}</TableCell>
                      <TableCell
                        className={
                          a.change >= 0
                            ? "text-right tabular-nums"
                            : "text-right tabular-nums text-destructive"
                        }
                      >
                        {a.change >= 0 ? "+" : ""}
                        {a.change}%
                      </TableCell>
                      <TableCell className="text-right tabular-nums">{a.engagement}%</TableCell>
                      <TableCell>
                        <Badge variant={statusBadge[a.status].variant}>{statusBadge[a.status].label}</Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${a.platform}`}>
                              <MoreHorizontal />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onSelect={() => {
                                updateStatus(a.id, "connected")
                                toast.success(`${a.platform} reconnected`)
                              }}
                            >
                              <RefreshCw />
                              Reconnect
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              disabled={a.status === "paused"}
                              onSelect={() => {
                                updateStatus(a.id, "paused")
                                toast(`${a.platform} paused`)
                              }}
                            >
                              <Unplug />
                              Pause posting
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive" onSelect={() => setRemoving(a)}>
                              <Trash2 />
                              Remove account
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>

      <AlertDialog open={removing !== null} onOpenChange={(open) => !open && setRemoving(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove {removing?.platform}?</AlertDialogTitle>
            <AlertDialogDescription>
              Scheduled posts for {removing?.handle} will stop. You can connect the account again later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                if (!removing) return
                setAccounts((list) => list.filter((x) => x.id !== removing.id))
                if (filter === removing.id) setFilter("all")
                toast(`${removing.platform} removed`)
              }}
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SidebarProvider>
  )
}

function NewPostDialog({ accounts }: { accounts: Account[] }) {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<string[]>([])

  function toggle(id: string, checked: boolean) {
    setSelected((list) => (checked ? [...list, id] : list.filter((x) => x !== id)))
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (!next) setSelected([])
      }}
    >
      <DialogTrigger asChild>
        <Button size="sm" aria-label="New post">
          <Plus />
          <span className="hidden sm:inline">New post</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setOpen(false)
            setSelected([])
            toast.success(`Post scheduled to ${selected.length} account${selected.length === 1 ? "" : "s"}`)
          }}
          className="grid gap-5"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <PenSquare className="size-4" />
              New post
            </DialogTitle>
            <DialogDescription>Write once, publish to every selected account.</DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <FieldSet>
              <FieldLegend variant="label">Publish to</FieldLegend>
              <div className="grid grid-cols-2 gap-3">
                {accounts.map((a) => (
                  <Field key={a.id} orientation="horizontal">
                    <Checkbox
                      id={`post-${a.id}`}
                      checked={selected.includes(a.id)}
                      disabled={a.status === "error"}
                      onCheckedChange={(c) => toggle(a.id, c === true)}
                    />
                    <FieldLabel htmlFor={`post-${a.id}`} className="font-normal">
                      {a.platform}
                    </FieldLabel>
                  </Field>
                ))}
              </div>
            </FieldSet>
            <Field>
              <FieldLabel htmlFor="post-body">Caption</FieldLabel>
              <Textarea id="post-body" placeholder="What do you want to share?" required className="min-h-28" />
            </Field>
            <Field>
              <FieldLabel htmlFor="post-time">Schedule</FieldLabel>
              <Input id="post-time" type="datetime-local" required />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={selected.length === 0}>
              Schedule post
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
