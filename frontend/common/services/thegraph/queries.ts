import { gql } from 'graphql-request';

export const getPapersQuery = gql`
  query papers {
    papers {
      address
      name
    }
  }
`;
