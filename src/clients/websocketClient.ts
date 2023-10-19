import { VALIDATION_CLOUD_DOMAIN } from '@/constants'
import { Chain, createPublicClient, webSocket } from 'viem'

const transport = webSocket(
  `wss://${VALIDATION_CLOUD_DOMAIN}/v1/wss/${process.env.NEXT_PUBLIC_VALIDATION_CLOUD_KEY}`
)

export function getWebsocketClient(chain?: Chain) {
  return createPublicClient({ chain, transport })
}
