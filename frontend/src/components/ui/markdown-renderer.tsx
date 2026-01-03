import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { Lightbulb, AlertTriangle, Info } from "lucide-react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({
  content,
  className,
}: MarkdownRendererProps) {
  return (
    <div className={cn("prose prose-invert prose-sm max-w-none", className)}>
      <ReactMarkdown
        components={{
          // Heading
          h1: ({ children }) => (
            <h1 className="text-xl font-bold text-foreground mt-4 mb-2 font-display">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg font-bold text-foreground mt-3 mb-2 font-display">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base font-semibold text-foreground mt-2 mb-1">
              {children}
            </h3>
          ),
          // Paragraphs
          //   p: ({ children }) => (
          //     <p className="text-muted-foreground text-sm leading-relaxed mb-3">
          //       {children}
          //     </p>
          //   ),
          p: ({ children }) => {
            const text = children?.toString() || "";

            // "예시:"로 시작하는 경우
            if (text.startsWith("예시:") || text.startsWith("**예시:**")) {
              return (
                <div className="my-4 p-4 rounded-xl bg-primary/10 border border-primary/20 flex gap-3">
                  <Lightbulb className="size-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="text-primary font-bold block mb-1">
                      예시
                    </span>
                    <span className="text-muted-foreground leading-relaxed">
                      {text.replace(/(\*\*예시:\*\*|예시:)/, "").trim()}
                    </span>
                  </div>
                </div>
              );
            }

            // "주의사항:"으로 시작하는 경우
            if (
              text.startsWith("주의사항:") ||
              text.startsWith("**주의사항:**")
            ) {
              return (
                <div className="my-4 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 flex gap-3">
                  <AlertTriangle className="size-5 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-orange-400 font-bold block mb-1">
                      주의사항
                    </span>
                    <span className="text-muted-foreground leading-relaxed">
                      {text.replace(/(\*\*주의사항:\*\*|주의사항:)/, "").trim()}
                    </span>
                  </div>
                </div>
              );
            }

            return (
              <p className="text-muted-foreground text-[15px] leading-relaxed mb-4">
                {children}
              </p>
            );
          },
          // Strong/Bold
          strong: ({ children }) => (
            <strong className="text-foreground font-semibold">
              {children}
            </strong>
          ),
          // Emphasis/Italic
          em: ({ children }) => (
            <em className="text-primary italic">{children}</em>
          ),
          // Lists
          //   ul: ({ children }) => (
          //     <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1 mb-3 ml-2">
          //       {children}
          //     </ul>
          //   ),
          ul: ({ children }) => (
            <ul className="space-y-2 mb-4 list-none p-0">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside text-muted-foreground text-sm space-y-1 mb-3 ml-2">
              {children}
            </ol>
          ),
          //   li: ({ children }) => (
          //     <li className="text-muted-foreground">{children}</li>
          //   ),
          li: ({ children }) => (
            <li className="flex gap-2 text-muted-foreground text-[14px]">
              <span className="text-primary mt-1.5 size-1.5 rounded-full bg-primary shrink-0" />
              <span>{children}</span>
            </li>
          ),
          // Code blocks
          code: ({ className, children, ...props }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code
                  className="px-1.5 py-0.5 rounded bg-surface-highlight text-primary text-xs font-mono"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <code
                className="block p-3 rounded-lg bg-surface text-foreground text-xs font-mono overflow-x-auto mb-3"
                {...props}
              >
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="rounded-lg bg-surface border border-border overflow-hidden mb-3">
              {children}
            </pre>
          ),
          // Blockquotes
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-primary pl-4 py-1 my-3 bg-primary/5 rounded-r-lg">
              {children}
            </blockquote>
          ),
          // Links
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
            >
              {children}
            </a>
          ),
          // Horizontal rule
          hr: () => <hr className="border-border my-4" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
