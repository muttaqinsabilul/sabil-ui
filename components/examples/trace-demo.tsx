import { FileSearchIcon, GitCommitIcon, SearchIcon, TerminalIcon } from "lucide-react"

import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from "@/components/ui/trace"

export default function TraceDemo() {
  return (
    <Trace className="w-full max-w-md">
      <TraceLine>
        <TraceIcon>
          <SearchIcon />
        </TraceIcon>
        <TraceTitle>Searched the codebase for “checkout”</TraceTitle>
      </TraceLine>
      <TraceCollapsible defaultOpen>
        <TraceCollapsibleTrigger>
          <TraceIcon>
            <FileSearchIcon />
          </TraceIcon>
          <TraceTitle>Read 3 files</TraceTitle>
        </TraceCollapsibleTrigger>
        <TraceCollapsibleContent>
          <TraceLine>
            <TraceTitle>app/checkout/page.tsx</TraceTitle>
          </TraceLine>
          <TraceLine>
            <TraceTitle>lib/cart.ts</TraceTitle>
          </TraceLine>
          <TraceLine>
            <TraceTitle>lib/payments.ts</TraceTitle>
          </TraceLine>
        </TraceCollapsibleContent>
      </TraceCollapsible>
      <TraceLine>
        <TraceIcon>
          <GitCommitIcon />
        </TraceIcon>
        <TraceTitle>Updated the total calculation</TraceTitle>
      </TraceLine>
      <TraceLine status="running">
        <TraceIcon>
          <TerminalIcon />
        </TraceIcon>
        <TraceTitle>Running the test suite</TraceTitle>
      </TraceLine>
    </Trace>
  )
}
