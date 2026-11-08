import { Reasoning, ReasoningContent, ReasoningTrigger } from "@/components/ui/reasoning"

export default function ReasoningDemo() {
  return (
    <Reasoning defaultOpen className="max-w-md">
      <ReasoningTrigger duration={6} />
      <ReasoningContent>
        The user wants the cheapest plan that still has SSO. Only Team and Enterprise include SSO.
        Team costs less, so I will recommend Team and mention the seat limit.
      </ReasoningContent>
    </Reasoning>
  )
}
