"use client";

import React from 'react'
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'

import { Control, FieldPath } from 'react-hook-form'
import { z } from 'zod'
import { authFormSchema, formatPhone, formatOnlyNumbers, formatCPF } from '@/lib/utils'

import { consultarCPF } from '@/lib/cpf.service';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

const formSchema = authFormSchema('sign-up')

interface CustomInput {
  control: Control<z.infer<typeof formSchema>>,
  name: FieldPath<z.infer<typeof formSchema>>,
  label: string,
  placeholder: string
  disabled?: boolean
  form: any
}

const CustomInput = ({ control, name, label, placeholder, disabled, form }: CustomInput) => {

  const [isLoading, setIsLoading] = useState(false);
  
  const [apiError, setApiError] = useState<string | null>(null);
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    let value = e.target.value;
    
    if (name === 'phone' || name === 'telefone_empresa') {
      const numericValue = value.replace(/\D/g, '');
      const truncatedValue = numericValue.slice(0, 11);
      value = truncatedValue ? formatPhone(truncatedValue) : '';
    } else if (name === 'cpf') {  // Adicione esta condição
      const numericValue = value.replace(/\D/g, '');
      const truncatedValue = numericValue.slice(0, 11);
      value = truncatedValue ? formatCPF(truncatedValue) : '';
    } else if (name === 'numero') {
      value = formatOnlyNumbers(value);
    } else if (name === 'email' || name === 'email_empresa') {
      value = value.trim();
    }
  
    field.onChange(value);
    
    // Validação em tempo real para campos específicos
    if (name === 'email' || name === 'email_empresa' || name === 'numero') {
      await form.trigger(name);
    }
  };

  const handleBlur = async (field: any) => {
    await field.onBlur();
    
    if (name === 'cpf') {
      const cpfValue = field.value.replace(/\D/g, '');
      if (cpfValue.length === 11) {
        setIsLoading(true);
        setApiError(null);
        
        try {
          const dados = await consultarCPF(cpfValue);
          
          if (!dados) {
            setApiError('Não foi possível consultar os dados do CPF');
            // Não retornar aqui, permitir que o formulário continue
            return;
          }

          if (dados.situacao.codigo !== 'Regular') {
            setApiError('CPF não está regular na Receita Federal');
            return;
          }

          // Atualiza os campos do formulário
          form.setValue('nome_completo', dados.nome);
          form.setValue('data_nascimento', dados.nascimento);
          form.setValue('nome_mae', dados.nomeMae);

        } catch (error) {
          console.error('Erro ao buscar dados do CPF:', error);
          setApiError('Erro ao consultar CPF. Tente novamente.');
          // Não bloquear o avanço do formulário em caso de erro de API
        } finally {
          setIsLoading(false);
        }
      }
    }
    await form.trigger(name);
  };

  const getInputType = (fieldName: string) => {
    switch (fieldName) {
      case 'password':
        return 'password';
      case 'email':
      case 'email_empresa':
        return 'email';
      default:
        return 'text';
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="form-item">
          <FormLabel className="form-label">
            {label}
          </FormLabel>
          <div className="flex w-full flex-col">
            <div className="relative">
              <FormControl>
                <Input 
                  placeholder={placeholder}
                  className={`input-class ${error || apiError ? 'border-red-500' : ''} ${isLoading ? 'pr-10' : ''}`}
                  type={getInputType(name)}
                  disabled={disabled || isLoading}
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => handleInputChange(e, field)}
                  onBlur={() => handleBlur(field)}
                />
              </FormControl>
              {isLoading && name === 'cpf' && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                </div>
              )}
            </div>
            {apiError && (
              <p className="form-message mt-2 text-red-500">{apiError}</p>
            )}
            <FormMessage className="form-message mt-2 text-red-500" />
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput