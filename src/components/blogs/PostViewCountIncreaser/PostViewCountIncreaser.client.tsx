'use client';

import React, { useRef, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';

import { IncreasePostViewCountMutation, IncreasePostViewCountMutationVariables } from '@/types/apollo';

interface PostViewCountIncreaserProps {
  postId: string;
}

const PostViewCountIncreaser: React.FC<PostViewCountIncreaserProps> = ({ postId }) => {
  const isSendedRequest = useRef(false);

  const [increasePostViewCountMutation] = useMutation<
    IncreasePostViewCountMutation,
    IncreasePostViewCountMutationVariables
  >(localMutation);

  useEffect(() => {
    if (!isSendedRequest.current) {
      increasePostViewCountMutation({ variables: { postId } });
      isSendedRequest.current = true;
    }
  }, [increasePostViewCountMutation, postId]);

  return null;
};

const localMutation = gql`
  mutation IncreasePostViewCount($postId: ObjectId!) {
    increasePostViewCount(postId: $postId) {
      _id
      viewCount
    }
  }
`;

export default PostViewCountIncreaser;
