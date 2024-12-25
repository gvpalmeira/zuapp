'use server';

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "@/lib/utils";

import { revalidatePath } from "next/cache";

interface getUserInfoProps {
  userId: string;
}

interface signInProps {
  email: string;
  password: string;
}

interface SignUpParams {
  accountType: string;
  email: string;
  password: string;
  phone: string;
  cpf: string;
  nome_completo: string;
  data_nascimento: string;
  nome_mae: string;
  cnpj?: string;
  razao_social?: string;
  nome_fantasia?: string;
  data_abertura?: string;
  telefone_empresa?: string;
  email_empresa?: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  municipio: string;
  uf: string;
}


const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
//  APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env;

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
  try {
    const { database } = await createAdminClient();

    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal('userId', [userId])]
    )

    return parseStringify(user.documents[0]);
  } catch (error) {
    console.log(error)
    return null;
  }
}

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    const cookieStore = await cookies(); // Resolva a Promise

    cookieStore.set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    const user = await getUserInfo({ userId: session.userId }) 

    return parseStringify(user);
  } catch (error) {
    console.error('Error', error);
    return null;
  }
}

export const signUp = async ({
  accountType,
  email,
  password,
  phone,
  cpf,
  nome_completo,
  data_nascimento,
  nome_mae,
  cnpj,
  razao_social,
  nome_fantasia,
  data_abertura,
  telefone_empresa,
  email_empresa,
  cep,
  logradouro,
  numero,
  complemento,
  bairro,
  municipio,
  uf
}: SignUpParams) => {
  try {
    const { account, database } = await createAdminClient();

    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      nome_completo
    );

    if (!newUserAccount) throw new Error('Erro ao criar usuário');

    const newUser = await database.createDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      ID.unique(),
      {
        userId: newUserAccount.$id,
        accountType,
        email,
        phone,
        cpf,
        nome_completo,
        data_nascimento,
        nome_mae,
        ...(accountType === 'Pessoa Jurídica' && {
          cnpj,
          razao_social,
          nome_fantasia,
          data_abertura,
          telefone_empresa,
          email_empresa,
        }),
        cep,
        logradouro,
        numero,
        complemento,
        bairro,
        municipio,
        uf
      }
    );

    const session = await account.createEmailPasswordSession(email, password);

    const cookieStore = await cookies(); // Resolva a Promise

    cookieStore.set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUser);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw error;
  }
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const result = await account.get();

    const user = await getUserInfo({ userId: result.$id})

    return parseStringify(user);
  } catch (error) {
    console.log(error)
    return null;
  }
}

export const logoutAccount = async () => {
  try {
    const { account } = await createSessionClient();

    await account.deleteSession('current');

    const cookieStore = await cookies(); // Resolva a Promise

    cookieStore.delete('appwrite-session');

    return true;
  } catch (error) {
    console.error('Erro ao deslogar:', error);
    return false;
  }
}


