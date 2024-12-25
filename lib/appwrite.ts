import { Account, Avatars, Client, Databases, Storage } from 'node-appwrite';
import { cookies } from 'next/headers';

const NEXT_PUBLIC_APPWRITE_ENDPOINT = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const NEXT_PUBLIC_APPWRITE_PROJECT = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;
const APPWRITE_SECRET = process.env.APPWRITE_SECRET;

export const createAdminClient = () => {
  const client = new Client();
  client
    .setEndpoint(NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(APPWRITE_SECRET!);

  const account = new Account(client);
  const database = new Databases(client);
  const storage = new Storage(client);
  const avatars = new Avatars(client);

  return { client, account, database, storage, avatars };
};

export const createSessionClient = () => {
  const cookieStore = cookies();
  const session = cookieStore.get('appwrite-session')?.value;

  const client = new Client();
  client
    .setEndpoint(NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(NEXT_PUBLIC_APPWRITE_PROJECT!);

  if (session) {
    client.setSession(session);
  }

  const account = new Account(client);
  const database = new Databases(client);
  const storage = new Storage(client);
  const avatars = new Avatars(client);

  return { client, account, database, storage, avatars };
};