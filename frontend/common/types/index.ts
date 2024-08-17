import { Tags } from './enums';

export type Paper = {
  id: string;
  title: string;
  tags: Tags[];
};
