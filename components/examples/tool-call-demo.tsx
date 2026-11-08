import { SearchIcon } from "lucide-react"

import { ToolCall, ToolCallContent, ToolCallHeader, ToolCallSection } from "@/components/ui/tool-call"

export default function ToolCallDemo() {
  return (
    <ToolCall defaultOpen className="max-w-md">
      <ToolCallHeader name="search_docs" status="done" icon={<SearchIcon />} />
      <ToolCallContent>
        <ToolCallSection label="Input">{`{ "query": "calendar dropdown", "limit": 3 }`}</ToolCallSection>
        <ToolCallSection label="Output">{`[
  { "title": "Calendar", "href": "/docs/components/calendar" },
  { "title": "Date Picker", "href": "/docs/components/date-picker" }
]`}</ToolCallSection>
      </ToolCallContent>
    </ToolCall>
  )
}
