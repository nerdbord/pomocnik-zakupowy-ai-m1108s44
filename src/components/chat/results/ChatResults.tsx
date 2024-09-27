import { ToolInvocation } from "ai";

import { ChatMessageItem } from "@/components/chat/ChatMessageItem";
import { ChatResultItem } from "@/components/chat/results/ChatResultItem";
import { ChatResultItemSkeleton } from "@/components/chat/results/ChatResultItemSkeleton";
import { Result } from "@/components/chat/types";

type ChatResultsProps = {
  toolInvocation: ToolInvocation;
  error?: Error;
};

export const ChatResults = ({ toolInvocation, error }: ChatResultsProps) => {
  const {
    toolCallId,
    args: { query },
  } = toolInvocation;

  return "result" in toolInvocation ? (
    <div key={`results-${toolCallId}`}>
      <ChatMessageItem
        message={{
          id: "result",
          role: "assistant",
          content: "Znalazłem dla Ciebie następujące oferty:",
        }}
      />
      <ul className="mx-0 mt-8 flex flex-wrap items-stretch justify-around gap-4 lg:flex-row lg:items-stretch lg:justify-center">
        {toolInvocation.result.map((item: Result) => (
          <ChatResultItem key={item.link} result={item} />
        ))}
      </ul>
    </div>
  ) : (
    !error && (
      <div key={`loadingresults-${toolCallId}`}>
        <ChatMessageItem
          message={{
            id: "searching",
            role: "assistant",
            content: `Szukam dla Ciebie: ${query}`,
          }}
        />
        <ul className="mx-0 mt-8 flex flex-wrap items-stretch justify-around gap-4 lg:flex-row lg:items-stretch lg:justify-center">
          <ChatResultItemSkeleton />
          <ChatResultItemSkeleton />
          <ChatResultItemSkeleton />
        </ul>
      </div>
    )
  );
};
