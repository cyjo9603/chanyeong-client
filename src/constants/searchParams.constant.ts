import { PostCategory } from '@/types/apollo';

export const BLOG_TAB_SELECTED_KEY = 'selectedTab';

export enum TabKey {
  ALL = 'all',
  DEVELOPMENT = PostCategory.Dev,
  DIARY = PostCategory.Diary,
}

export const BLOG_TAG_SELECTED_KEY = 'selectedTag';
