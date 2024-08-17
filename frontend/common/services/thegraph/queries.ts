export const getPapersQuery = gql`
  query papers {
    papers {
      address
      name
    }
  }
`;
