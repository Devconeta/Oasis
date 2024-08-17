import { gql } from 'graphql-request';

export const getPapersQuery = gql`
  query papers {
    paperCreateds {
      paper
    }
  }
`;
