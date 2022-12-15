import { MoralisNextApi } from '@moralisweb3/next'

import { env } from "@/root/env/server.mjs";

export default MoralisNextApi({
  apiKey: env.MORALIS_API_KEY || '',
  authentication: {
    domain: 'baffle.space',
    uri: env.NEXTAUTH_URL || '',
    timeout: 120,
  },
});