import { Client } from './types';

export function formatName(client: Client) {
  return `${client.firstName} ${client.lastName}`;
}
