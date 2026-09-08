import ReactMarkdown, { type Options } from "react-markdown";
import { memo } from "react";
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

export function Markdown({ children, className = "", ...props }: Options & { className?: string }) {
  return (
    <div className={`prose prose-slate max-w-none dark:prose-invert ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]} {...props}>{children}</ReactMarkdown>
    </div>
  );
}

export default memo(Markdown)