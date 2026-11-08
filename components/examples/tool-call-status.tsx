import { FileTextIcon, GlobeIcon, MailIcon, TerminalIcon } from "lucide-react"

import { ToolCall, ToolCallContent, ToolCallHeader, ToolCallSection } from "@/components/ui/tool-call"

export default function ToolCallStatus() {
  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <ToolCall>
        <ToolCallHeader name="fetch_page" status="done" icon={<GlobeIcon />} />
        <ToolCallContent>
          <ToolCallSection label="Input">{`{ "url": "https://example.com/pricing" }`}</ToolCallSection>
        </ToolCallContent>
      </ToolCall>
      <ToolCall>
        <ToolCallHeader name="read_file" status="running" icon={<FileTextIcon />} />
      </ToolCall>
      <ToolCall>
        <ToolCallHeader name="run_tests" status="error" icon={<TerminalIcon />} />
        <ToolCallContent>
          <ToolCallSection label="Error">2 tests failed in calendar.test.tsx</ToolCallSection>
        </ToolCallContent>
      </ToolCall>
      <ToolCall>
        <ToolCallHeader name="send_email" status="pending" icon={<MailIcon />} />
      </ToolCall>
    </div>
  )
}
