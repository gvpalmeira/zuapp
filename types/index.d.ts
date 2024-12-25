/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// ========================================

declare type SignUpParams = {
  //STEP 1
  accountType: string;
  email: string;
  password: string;
  //STEP 2
  phone: string;
  //STEP 3 - Física
  cpf: string;
  name: string;
  nome_completo: string;
  data_nascimento: string;
  nome_mae: string;
  //CAMPOS OCULTOS - BUSCAR DA API E ENVIAR AO BANCO DE DADOS
//  sexo: string; //ocultar no formulário
//  score_credito: string; //ocultar no formulário
//  dividas: string; //ocultar no formulário
//  renda_presumida: string; //ocultar no formulário
  //STEP 4
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  data_abertura: string;
  telefone_empresa: string;
  email_empresa: string;
  //CAMPOS OCULTOS - BUSCAR DA API E ENVIAR AO BANCO DE DADOS
//  situacao: string; //ocultar no formulário
//  atividade_principal; array; //ocultar no formulário
//    codigo: string;
//    descricao: string;
//  atividades_secundarias; array; //ocultar no formulário
//    codigo: string;
//    descricao: string;  
//  natureza_juridica: string; //ocultar no formulário
// porte: string; //ocultar no formulário
// opcao_simples: string; //ocultar no formulário
// data_exclusao_simples: string; //ocultar no formulário
// estabelecimentos: array; //ocultar no formulário
//    filial_cnpj: string; //ocultar no formulário
//    filial_nome_fantasia: string; //ocultar no formulário
//    filial_situacao: string; //ocultar no formulário
//    filial_endereco: string; //ocultar no formulário
// responsavel_tipo: string; //ocultar no formulário
// responsavel_nome: string; //ocultar no formulário
// responsavel_cpf: string; //ocultar no formulário
// responsavel_qualificacao: string; //ocultar no formulário
// capital_social: string; //ocultar no formulário
// qsa: arrauy; //ocultar no formulário
//   socio1_nome: string; //ocultar no formulário
//   socio1_cpf_cnpj: string; //ocultar no formulário
//   socio1_data_entrada: string; //ocultar no formulário
//   socio2_nome: string; //ocultar no formulário
//   socio2_cpf_cnpj: string; //ocultar no formulário
//   socio2_data_entrada: string; //ocultar no formulário
//   socio3_nome: string; //ocultar no formulário
//   socio3_cpf_cnpj: string; //ocultar no formulário
//   socio3_data_entrada: string; //ocultar no formulário
//   socio4_nome: string; //ocultar no formulário
//   socio4_cpf_cnpj: string; //ocultar no formulário
//   socio4_data_entrada: string; //ocultar no formulário
  //STEP 5
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  municipio: string;
  uf: string;
};

declare type LoginUser = {
  email: string;
  password: string;
};

declare type User = {
  $id: string;
  userId: string;
  //dwollaCustomerUrl: string; //apagar
  //dwollaCustomerId: string; //apagar
  //STEP 1
  accountType: string;
  email: string;
  password: string;
  //STEP 2
  phone: string;
  //STEP 3 - Física
  cpf: string;
  name: string;
  nome_completo: string;
  data_nascimento: string;
  nome_mae: string;
  //CAMPOS OCULTOS - BUSCAR DA API E ENVIAR AO BANCO DE DADOS
//  sexo: string; //ocultar no formulário
//  score_credito: string; //ocultar no formulário
//  dividas: string; //ocultar no formulário
//  renda_presumida: string; //ocultar no formulário
  //STEP 4
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  data_abertura: string;
  telefone_empresa: string;
  email_empresa: string;
  //CAMPOS OCULTOS - BUSCAR DA API E ENVIAR AO BANCO DE DADOS
  situacao: string; //ocultar no formulário
//  atividade_principal; array; //ocultar no formulário
//    codigo: string;
//    descricao: string;
//  atividades_secundarias; array; //ocultar no formulário
//    codigo: string;
//    descricao: string;  
//  natureza_juridica: string; //ocultar no formulário
// porte: string; //ocultar no formulário
// opcao_simples: string; //ocultar no formulário
// data_exclusao_simples: string; //ocultar no formulário
// estabelecimentos: array; //ocultar no formulário
//    filial_cnpj: string; //ocultar no formulário
//    filial_nome_fantasia: string; //ocultar no formulário
//    filial_situacao: string; //ocultar no formulário
//    filial_endereco: string; //ocultar no formulário
// responsavel_tipo: string; //ocultar no formulário
// responsavel_nome: string; //ocultar no formulário
// responsavel_cpf: string; //ocultar no formulário
// responsavel_qualificacao: string; //ocultar no formulário
// capital_social: string; //ocultar no formulário
// qsa: arrauy; //ocultar no formulário
//   socio1_nome: string; //ocultar no formulário
//   socio1_cpf_cnpj: string; //ocultar no formulário
//   socio1_data_entrada: string; //ocultar no formulário
//   socio2_nome: string; //ocultar no formulário
//   socio2_cpf_cnpj: string; //ocultar no formulário
//   socio2_data_entrada: string; //ocultar no formulário
//   socio3_nome: string; //ocultar no formulário
//   socio3_cpf_cnpj: string; //ocultar no formulário
//   socio3_data_entrada: string; //ocultar no formulário
//   socio4_nome: string; //ocultar no formulário
//   socio4_cpf_cnpj: string; //ocultar no formulário
//   socio4_data_entrada: string; //ocultar no formulário
  //STEP 5
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  municipio: string;
  uf: string;
};

declare type NewUserParams = {
  userId: string;
  email: string;
  nome_completo: string; //alterado de name para nome_completo
  password: string;
};





// Comentar/remover interfaces relacionadas ao Plaid/Dwolla
/*
declare type Account = {
  id: string;
  availableBalance: number;
  currentBalance: number;
  officialName: string;
  mask: string;
  institutionId: string;
  name: string;
  type: string;
  subtype: string;
  appwriteItemId: string;
  sharableId: string;
};

declare type Transaction = {
  id: string;
  $id: string;
  name: string;
  paymentChannel: string;
  type: string;
  accountId: string;
  amount: number;
  pending: boolean;
  category: string;
  date: string;
  image: string;
  type: string;
  $createdAt: string;
  channel: string;
  senderBankId: string;
  receiverBankId: string;
};

declare type Bank = {
  $id: string;
  accountId: string;
  bankId: string;
  accessToken: string;
  fundingSourceUrl: string;
  userId: string;
  sharableId: string;
};

declare type TransferParams = {
  sourceFundingSourceUrl: string;
  destinationFundingSourceUrl: string;
  amount: string;
};

declare type AddFundingSourceParams = {
  dwollaCustomerId: string;
  processorToken: string;
  bankName: string;
};

declare type NewDwollaCustomerParams = {
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
};

declare interface CreditCardProps {
  account: Account;
  userName: string;
  showBalance?: boolean;
}

declare interface BankInfoProps {
  account: Account;
  appwriteItemId?: string;
  type: "full" | "card";
}

declare interface PlaidLinkProps {
  user: User;
  variant?: "primary" | "ghost";
  dwollaCustomerId?: string;
}

declare interface BankDropdownProps {
  accounts: Account[];
  setValue?: UseFormSetValue<any>;
  otherStyles?: string;
}

declare interface BankTabItemProps {
  account: Account;
  appwriteItemId?: string;
}

declare interface TotlaBalanceBoxProps {
  accounts: Account[];
  totalBanks: number;
  totalCurrentBalance: number;
}

declare interface TransactionTableProps {
  transactions: Transaction[];
}

declare interface PaymentTransferFormProps {
  accounts: Account[];
}

// Actions
declare interface getAccountsProps {
  userId: string;
}

declare interface getAccountProps {
  appwriteItemId: string;
}

declare interface getInstitutionProps {
  institutionId: string;
}

declare interface getTransactionsProps {
  accessToken: string;
}

declare interface CreateFundingSourceOptions {
  customerId: string; // Dwolla Customer ID
  fundingSourceName: string; // Dwolla Funding Source Name
  plaidToken: string; // Plaid Account Processor Token
  _links: object; // Dwolla On Demand Authorization Link
}

declare interface CreateTransactionProps {
  name: string;
  amount: string;
  senderId: string;
  senderBankId: string;
  receiverId: string;
  receiverBankId: string;
  email: string;
}

declare interface getTransactionsByBankIdProps {
  bankId: string;
} 

declare interface createBankAccountProps {
  accessToken: string;
  userId: string;
  accountId: string;
  bankId: string;
  fundingSourceUrl: string;
  sharableId: string;
}

declare interface getBanksProps {
  userId: string;
}

declare interface getBankProps {
  documentId: string;
}

declare interface getBankByAccountIdProps {
  accountId: string;
}

declare type AccountTypes =
  | "poupança"
  | "crédito"
  | "empréstimo"
  | "investimento"
  | "outro";

declare type Category = "Comidas e Bebidas" | "Viagem" | "Transferência";

declare type CategoryCount = {
  name: string;
  count: number;
  totalCount: number;
};
*/

declare type Receiver = {
  nome_completo: string;
};

declare interface HeaderBoxProps {
  type?: "title" | "greeting";
  title: string;
  subtext: string;
  user?: string;
}

declare interface MobileNavProps {
  user: User;
}

declare interface PageHeaderProps {
  topTitle: string;
  bottomTitle: string;
  topDescription: string;
  bottomDescription: string;
  connectBank?: boolean;
}

declare interface PaginationProps {
  page: number;
  totalPages: number;
}

// declare type User = sdk.Models.Document & {
//   accountId: string;
//   email: string;
//   name: string;
//   items: string[];
//   accessToken: string;
//   image: string;
// };

declare interface AuthFormProps {
  type: "sign-in" | "sign-up";
}

declare interface FooterProps {
  user: User;
}

declare interface RightSidebarProps {
  user: User;
  transactions: Transaction[];
  banks: Bank[] & Account[];
}

declare interface SiderbarProps {
  user: User;
}

/*
declare interface RecentTransactionsProps {
  accounts: Account[];
  transactions: Transaction[];
  appwriteItemId: string;
  page: number;
}

declare interface TransactionHistoryTableProps {
  transactions: Transaction[];
  page: number;
}

declare interface CategoryBadgeProps {
  category: string;
}

declare interface CategoryProps {
  category: CategoryCount;
}*/

declare interface DoughnutChartProps {
  accounts: Account[];
}

declare interface signInProps {
  email: string;
  password: string;
}

declare interface getUserInfoProps {
  userId: string;
}

/*declare interface exchangePublicTokenProps {
  publicToken: string;
  user: User;
}*/


