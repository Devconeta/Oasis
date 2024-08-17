import { execute } from '../../../.graphclient'
import { getPapersQuery } from './queries'

export const getPapers = async () => {
  const { data } = await execute(getPapersQuery, {});
  return data;
}