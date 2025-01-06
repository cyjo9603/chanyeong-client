'use client';

import React from 'react';
import Link from 'next/link';
import { useAtomValue } from 'jotai';

import { userAtom } from '@/atoms/user.atom';

interface PostEditButtonProps {
  postId: string;
  className?: string;
}

const PostEditButton: React.FC<PostEditButtonProps> = ({ postId, className }) => {
  const user = useAtomValue(userAtom);

  return user ? (
    <Link href={`/blog/write?postId=${postId}`} className={className}>
      수정
    </Link>
  ) : null;
};

export default PostEditButton;
