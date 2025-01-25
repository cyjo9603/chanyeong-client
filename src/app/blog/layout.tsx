import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CHANYEONG Blog',
  description: '개발자 조찬영의 블로그',
  keywords: ['CHANYEONG', '조찬영', '블로그', '개발자'],
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
