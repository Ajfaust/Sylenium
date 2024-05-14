import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/categories/')({
  component: () => <div>Hello /categories/!</div>,
});
