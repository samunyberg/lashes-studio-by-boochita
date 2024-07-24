import { User } from '../types';

export function formatName(client: User) {
  return `${client.firstName} ${client.lastName}`;
}
