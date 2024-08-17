import { createThirdwebClient } from 'thirdweb';

import { THIRDWEB_CLIENT_ID } from '../constants/env';

export const thirdWebClient = createThirdwebClient({
  clientId: THIRDWEB_CLIENT_ID,
});
