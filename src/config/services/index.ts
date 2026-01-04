import type { ServiceCategory } from '../types';
import { scienceServices } from './science';
import { spaceServices } from './space';
import { requestFlow, consultationTopics } from './common';

// サービスカテゴリデータ
export const serviceCategories: Record<'science' | 'space', ServiceCategory> = {
  science: scienceServices,
  space: spaceServices
};

// 共通データのエクスポート
export { requestFlow, consultationTopics };
