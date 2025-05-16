// types/twin.d.ts
declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

// Ensure TypeScript recognizes @apply and other directives in CSS
declare namespace React {
  interface CSSProperties {
    '@apply'?: string;
  }
}