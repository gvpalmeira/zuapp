/* eslint-disable no-prototype-builtins */
import { type ClassValue, clsx } from "clsx";
import qs from "query-string";
import { data } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { z } from 'zod'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}



// INCLUSÕES ZUPAY
export const formatDateString = (date: Date | null): string => {
  if (!date) return '';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const parseDate = (dateString: string): Date | null => {
  const parts = dateString.split('/');
  if (parts.length !== 3) return null;
  
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);
  
  const date = new Date(year, month, day);
  
  if (isNaN(date.getTime())) return null;
  return date;
};

export const isValidDateValue = (date: Date | null): boolean => {
  if (!date) return false;
  const today = new Date();
  return date <= today;
};

export const formatOnlyNumbers = (value: string) => {
  return value.replace(/\D/g, '').slice(0, 6); // limita a 6 dígitos
};

export const isAtLeast18YearsOld = (date: Date | null): boolean => {
  if (!date) return false;
  
  const today = new Date();
  const birthDate = new Date(date);
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age >= 18;
};

export const validateCPF = (cpf: string): boolean => {
  // Remove caracteres não numéricos
  const cleanCPF = cpf.replace(/\D/g, '');

  // Verifica se tem 11 dígitos
  if (cleanCPF.length !== 11) return false;

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

  // Validação do primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let firstDigit = 11 - (sum % 11);
  if (firstDigit > 9) firstDigit = 0;
  
  if (parseInt(cleanCPF.charAt(9)) !== firstDigit) return false;

  // Validação do segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  let secondDigit = 11 - (sum % 11);
  if (secondDigit > 9) secondDigit = 0;

  if (parseInt(cleanCPF.charAt(10)) !== secondDigit) return false;

  return true;
};

export const formatCPF = (value: string) => {
  const cleanValue = value.replace(/\D/g, '');
  if (cleanValue.length <= 3) return cleanValue;
  if (cleanValue.length <= 6) return cleanValue.replace(/(\d{3})(\d{0,3})/, '$1.$2');
  if (cleanValue.length <= 9) return cleanValue.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
  return cleanValue.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
};

export const formatPhone = (value: string) => {
  const numbers = value.replace(/\D/g, '');
  return numbers.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
};

export const isValidPhone = (phone: string) => {
  const numbers = phone.replace(/\D/g, '');
  return numbers.length === 11;
};

export const authFormSchema = (type: string) => z.object({
  //both
  email: z.string() .min(1, 'E-mail é obrigatório') .email('Formato de e-mail inválido') 
    .refine(value => value.includes('@') && value.includes('.'), {
      message: 'E-mail inválido'
    }),

  password: z.string() .min(8, 'A senha deve ter no mínimo 8 caracteres'),
  
  // sign up
  phone: type === 'sign-in' ? z.string().optional() : z.string() .min(1, 'Telefone é obrigatório') 
    .refine(
      (value) => value.replace(/\D/g, '').length === 11,
      'Telefone deve ter 11 dígitos'
    ),  

  cpf: type === 'sign-in' ? z.string().optional() : z.string()
    .min(1, 'CPF é obrigatório')
    .transform(val => val.replace(/\D/g, ''))
    .refine(val => val.length === 11, {
      message: 'CPF deve ter 11 dígitos'
    })
    .refine(validateCPF, {
      message: 'CPF inválido'
    }),

  nome_completo: type === 'sign-in' ? z.string().optional() : z.string().min(3),

  data_nascimento: type === 'sign-in' ? z.string().optional() : z.string()
    .min(1, 'Data de nascimento é obrigatória')
    .refine((value) => {
      const date = parseDate(value);
      return date !== null;
    }, 'Data inválida')
    .refine((value) => {
      const date = parseDate(value);
      return date ? isValidDateValue(date) : false;
    }, 'Data não pode ser futura')
    .refine((value) => {
      const date = parseDate(value);
      return date ? isAtLeast18YearsOld(date) : false;
    }, 'Idade mínima de 18 anos'),

  nome_mae: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  
  accountType: type === 'sign-in' ? z.string().optional() : z.string().min(3),

  cnpj: type === 'sign-in' ? z.string().optional() : z.string().min(3),

  razao_social: type === 'sign-in' ? z.string().optional() : z.string().min(3), 

  nome_fantasia: type === 'sign-in' ? z.string().optional() : z.string().min(3),

  data_abertura: type === 'sign-in' ? z.string().optional() : z.string()
    .min(1, 'Data de fundação é obrigatória')
    .refine((value) => {
      const date = parseDate(value);
      return date !== null;
    }, 'Data inválida')
    .refine((value) => {
      const date = parseDate(value);
      return date ? isValidDateValue(date) : false;
    }, 'Data não pode ser futura'),

  telefone_empresa: type === 'sign-in' ? z.string().optional() : z.string() 
    .refine(
      (value) => !value || value.replace(/\D/g, '').length === 11,
      'Telefone deve ter 11 dígitos'
    )
    .optional(),

  email_empresa: type === 'sign-in' ? z.string().optional() : z.string() .min(1, 'E-mail é obrigatório') .email('Formato de e-mail inválido') 
    .refine(value => value.includes('@') && value.includes('.'), {
      message: 'E-mail inválido'
    }),

  cep: type === 'sign-in' ? z.string().optional() : z.string().min(3).max(6),

  logradouro: type === 'sign-in' ? z.string().optional() : z.string().min(3),

  numero: type === 'sign-in' ? z.string().optional() : z.string()
    .min(1, 'Número é obrigatório')
    .refine(value => /^\d+$/.test(value), 'Apenas números são permitidos')
    .refine(value => value.length <= 6, 'Número muito longo'),

  complemento: type === 'sign-in' ? z.string().optional() : z.string().max(50),

  bairro: type === 'sign-in' ? z.string().optional() : z.string().max(50),

  municipio: type === 'sign-in' ? z.string().optional() : z.string().max(50),

  uf: type === 'sign-in' ? z.string().optional() : z.string().min(2).max(2),

})

export const CURRENCY_FORMAT = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});


// INCLUSÕES ZUPAY



// FORMAT DATE TIME
export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    year: "numeric", // numeric year (e.g., '2023')
    month: "2-digit", // abbreviated month name (e.g., 'Oct')
    day: "2-digit", // numeric day of the month (e.g., '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "en-US",
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export function formatAmount(amount: number): string {   //PODE SER SUBSTITUIDO POR CURRENCY_FORMAT ???
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const removeSpecialCharacters = (value: string) => {
  return value.replace(/[^\w\s]/gi, "");
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

/*
export function getAccountTypeColors(type: AccountTypes) {
  switch (type) {
    case "depository":
      return {
        bg: "bg-blue-25",
        lightBg: "bg-blue-100",
        title: "text-blue-900",
        subText: "text-blue-700",
      };

    case "credit":
      return {
        bg: "bg-success-25",
        lightBg: "bg-success-100",
        title: "text-success-900",
        subText: "text-success-700",
      };

    default:
      return {
        bg: "bg-green-25",
        lightBg: "bg-green-100",
        title: "text-green-900",
        subText: "text-green-700",
      };
  }
}

export function countTransactionCategories(
  transactions: Transaction[]
): CategoryCount[] {
  const categoryCounts: { [category: string]: number } = {};
  let totalCount = 0;

  // Iterate over each transaction
  transactions &&
    transactions.forEach((transaction) => {
      // Extract the category from the transaction
      const category = transaction.category;

      // If the category exists in the categoryCounts object, increment its count
      if (categoryCounts.hasOwnProperty(category)) {
        categoryCounts[category]++;
      } else {
        // Otherwise, initialize the count to 1
        categoryCounts[category] = 1;
      }

      // Increment total count
      totalCount++;
    });

  // Convert the categoryCounts object to an array of objects
  const aggregatedCategories: CategoryCount[] = Object.keys(categoryCounts).map(
    (category) => ({
      name: category,
      count: categoryCounts[category],
      totalCount,
    })
  );

  // Sort the aggregatedCategories array by count in descending order
  aggregatedCategories.sort((a, b) => b.count - a.count);

  return aggregatedCategories;
}

export function extractCustomerIdFromUrl(url: string) {
  // Split the URL string by '/'
  const parts = url.split("/");

  // Extract the last part, which represents the customer ID
  const customerId = parts[parts.length - 1];

  return customerId;
}

export function encryptId(id: string) {
  return btoa(id);
}

export function decryptId(id: string) {
  return atob(id);
}

export const getTransactionStatus = (date: Date) => {
  const today = new Date();
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);

  return date > twoDaysAgo ? "Processing" : "Success";
};
*/
