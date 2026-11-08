import type { Metadata } from "next"

import { Code } from "@/components/docs/code"
import { DocPage, H2, InlineCode, P, Section } from "@/components/docs/doc-page"

export const metadata: Metadata = { title: "Installation" }

export default function InstallationPage() {
  return (
    <DocPage
      href="/docs/installation"
      eyebrow="Getting Started"
      title="Installation"
      description="Set up Next.js, Tailwind CSS v4 and the foundation. Then add components one by one."
      toc={[
        { id: "create-project", title: "Create a project" },
        { id: "foundation", title: "Add the foundation" },
        { id: "utils", title: "Add the cn helper" },
        { id: "add-components", title: "Add components" },
      ]}
    >
      <Section>
        <H2 id="create-project">Create a project</H2>
        <P>Start with a Next.js app that uses Tailwind CSS v4.</P>
        <Code code="npx create-next-app@latest my-app --typescript --tailwind --app" lang="bash" />
        <P>Install the base dependencies used by almost every component.</P>
        <Code
          code="npm install radix-ui class-variance-authority cn lucide-react tw-animate-css next-themes"
          lang="bash"
        />
      </Section>

      <Section>
        <H2 id="foundation">Add the foundation</H2>
        <P>
          Replace <InlineCode>app/globals.css</InlineCode> with the foundation file. It defines every color,
          radius, surface and motion token. The full file is on the{" "}
          <a href="/docs/theming" className="font-medium underline underline-offset-4">Theming</a> page.
        </P>
        <Code
          title="app/globals.css"
          code={`@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme {
  --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
}

:root {
  --radius: 0.5rem;
  --background: #ffffff;
  --foreground: #0a0a0a;
  --primary: #056dff;
  --primary-highlight: #3c86ff;
  /* ...see Theming for the full list */
}`}
          lang="css"
        />
      </Section>

      <Section>
        <H2 id="utils">Add the cn helper</H2>
        <P>Components merge class names with one small helper.</P>
        <Code title="lib/utils.ts" code={`export { cn } from "cn"`} lang="ts" />
      </Section>

      <Section>
        <H2 id="add-components">Add components</H2>
        <P>
          Open any component page, install its dependencies and copy its source into{" "}
          <InlineCode>components/ui</InlineCode>. Then import it.
        </P>
        <Code
          code={`import { Button } from "@/components/ui/button"

export default function Page() {
  return <Button>Get started</Button>
}`}
        />
      </Section>
    </DocPage>
  )
}
