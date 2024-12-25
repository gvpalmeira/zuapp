"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from 'lucide-react';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FormProgress from '@/components/FormProgress';
import CustomInput from './CustomInput';
import CustomDatePicker from './CustomDatePicker';
import { authFormSchema } from '@/lib/utils';
import { signIn, signUp } from '@/lib/user.actions';

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [stepHistory, setStepHistory] = useState<number[]>([1]);
  const formSchema = authFormSchema(type);
  const totalSteps = 5;

  // Redirecionar para sign-in se estiver na raiz
  useEffect(() => {
    if (pathname === '/') {
      router.push('/sign-in');
    }
  }, [pathname, router]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      //STEP 1
      accountType: '',
      email: '',
      password: '',
      //STEP 2
      phone: '',
      //STEP 3
      cpf: '',
      nome_completo: '',
      data_nascimento: '',
      nome_mae: '',
      //STEP 4
      cnpj: '',
      razao_social: '',
      nome_fantasia : '',
      data_abertura: '',
      telefone_empresa: '',
      email_empresa: '',
      //STEP 5
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      municipio: '',
      uf: ''
    },
  });

  const selectedAccountType = form.watch('accountType');

  const clearUnrelatedFields = useCallback(() => {
    const currentValues = form.getValues();
    const newValues = { ...currentValues };
    
    if (selectedAccountType === 'Pessoa Física') {
      newValues.cnpj = '';
      newValues.razao_social = '';
      newValues.nome_fantasia = '';
      newValues.data_abertura = '';
      newValues.telefone_empresa = '';
      newValues.email_empresa = '';
    }
    
    form.reset(newValues, { keepValues: true });
  }, [selectedAccountType, form]);

  useEffect(() => {
    clearUnrelatedFields();
  }, [clearUnrelatedFields]);

  const isStepValid = useCallback((step: number) => {
    const { errors } = form.formState;
    const values = form.getValues();
    
    switch (step) {
      case 1:
        return !!values.accountType && !errors.accountType;
                 
      case 2:
        const phoneValue = values.phone?.replace(/\D/g, '') || '';
        const isPhoneValid = phoneValue.length === 11 && !errors.phone;
        const isEmailValid = values.email && !errors.email;
        const isPasswordValid = values.password && values.password.length >= 8 && !errors.password;
        
        return isPhoneValid && isEmailValid && isPasswordValid;  
      
      case 3:
        return !!values.cpf && 
               !!values.nome_completo && 
               !!values.data_nascimento && 
               !!values.nome_mae;
      
      case 4:
        if (selectedAccountType === 'Pessoa Jurídica') {
          const companyPhoneValue = values.telefone_empresa?.replace(/\D/g, '') || '';
          const isCompanyPhoneValid = companyPhoneValue.length === 11;
          const isCompanyEmailValid = values.email_empresa && !errors.email_empresa;
          
          return !!values.cnpj && 
                 !!values.razao_social && 
                 !!values.nome_fantasia && 
                 !!values.data_abertura && 
                 isCompanyPhoneValid && 
                 isCompanyEmailValid;
        }
        return true;
      
      case 5:
        return !!values.cep && 
               !!values.logradouro && 
               !!values.numero && 
               !!values.bairro && 
               !!values.municipio && 
               !!values.uf;
      
      default:
        return false;
    }
  }, [form, selectedAccountType]);

  const getNextStep = useCallback((currentStep: number) => {
    if (currentStep === 3 && selectedAccountType === 'Pessoa Física') {
      return 5;
    }
    return currentStep + 1;
  }, [selectedAccountType]);

  const handleNext = async () => {
    let fieldsToValidate: (keyof z.infer<typeof formSchema>)[] = [];
    switch (currentStep) {
      case 1:
        fieldsToValidate.push('accountType');
        break;
      case 2:
        fieldsToValidate.push('phone', 'email', 'password');
        break;
      case 3:
        fieldsToValidate.push('cpf', 'nome_completo', 'data_nascimento', 'nome_mae');
        break;
      case 4:
        if (selectedAccountType === 'Pessoa Jurídica') {
          fieldsToValidate.push('cnpj', 'razao_social', 'nome_fantasia', 
                               'data_abertura', 'telefone_empresa', 'email_empresa');
        }
        break;
      case 5:
        fieldsToValidate.push('cep', 'logradouro', 'numero', 'complemento',
                             'bairro', 'municipio', 'uf');
        break;
    }
  
    const isValid = await form.trigger(fieldsToValidate, { shouldFocus: true });

    const hasErrors = Object.keys(form.formState.errors).length > 0;
    
    if (isValid && !hasErrors && isStepValid(currentStep)) {
      const nextStep = getNextStep(currentStep);
      setStepHistory(prev => [...prev, nextStep]);
      setCurrentStep(nextStep);
      form.clearErrors();
    }
  };
  
  const handleBack = () => {
    if (stepHistory.length > 1) {
      const newHistory = stepHistory.slice(0, -1);
      setStepHistory(newHistory);
      setCurrentStep(newHistory[newHistory.length - 1]);
      form.clearErrors();
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      if(type === 'sign-up') {
        const userData = {
          //STEP 1
          accountType: data.accountType!,
          email: data.email,
          password: data.password,
          //STEP 2
          phone: data.phone!,
          //STEP 3
          cpf: data.cpf!,
          nome_completo: data.nome_completo!,
          data_nascimento: data.data_nascimento!,
          nome_mae: data.nome_mae!,
          //STEP 4
          cnpj: data.cnpj!,
          razao_social: data.razao_social!,
          nome_fantasia : data.nome_fantasia!,
          data_abertura: data.data_abertura!,
          telefone_empresa: data.telefone_empresa!,
          email_empresa: data.email_empresa!,
          //STEP 5
          cep: data.cep!,
          logradouro: data.logradouro!,
          numero: data.numero!,
          complemento: data.complemento!,
          bairro: data.bairro!,
          municipio: data.municipio!,
          uf: data.uf!,
          //PUXAR DA RECEITA FEDERAL, SALVAR NO BANCO DE DADOS MAS NÃO EXIBIR NO FORMULÁRIO
        }

        await signUp(userData);
        router.push('/');
      }

      if(type === 'sign-in') {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });

        if(response) router.push('/');
      }
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };
      const renderStepContent = (step: number) => {
        switch (step) {
          case 1:
            return (
              <FormField
                control={form.control}
                name="accountType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Tipo de conta</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col gap-4 w-full max-w-[280px]"
                        disabled={isLoading}
                      >
                        <FormItem className="flex items-center rounded-lg border border-gray-300 p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                          <FormControl>
                            <RadioGroupItem value="Pessoa Física" className="h-5 w-5 border-gray-400" />
                          </FormControl>
                          <FormLabel className="text-16 font-medium text-gray-700 ml-3 cursor-pointer">
                            Pessoa Física
                          </FormLabel>
                        </FormItem>
                        
                        <FormItem className="flex items-center rounded-lg border border-gray-300 p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                          <FormControl>
                            <RadioGroupItem value="Pessoa Jurídica" className="h-5 w-5 border-gray-400" />
                          </FormControl>
                          <FormLabel className="text-16 font-medium text-gray-700 ml-3 cursor-pointer">
                            Pessoa Jurídica
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            );
          case 2:
            return (
              <>
                <CustomInput control={form.control} form={form} name='phone' label="Telefone" placeholder='Insira seu telefone' disabled={isLoading} />
                <CustomInput control={form.control} form={form} name='email' label="E-mail" placeholder='Insira seu e-mail' disabled={isLoading} />
                <CustomInput control={form.control} form={form} name='password' label="Senha" placeholder='Digite sua senha' disabled={isLoading} />
              </>
            );
          case 3:
            return (
              <>
                <CustomInput control={form.control} form={form} name='cpf' label="CPF" placeholder='Digite seu CPF' disabled={isLoading} />
                <CustomInput control={form.control} form={form} name='nome_completo' label="Nome Completo" placeholder='Digite seu nome' disabled={isLoading} />
                <CustomDatePicker control={form.control} form={form} name='data_nascimento' label="Data de Nascimento" placeholder='DD/MM/AAAA' disabled={isLoading} />
                <CustomInput control={form.control} form={form} name='nome_mae' label="Nome Completo da Mãe" placeholder='Digite o nome completo da mãe' disabled={isLoading} />
              </>
            );
          case 4:
          return selectedAccountType === 'Pessoa Jurídica' ? (
            <>
              <CustomInput control={form.control} form={form} name='cnpj' label="CNPJ" placeholder='Digite seu CNPJ' disabled={isLoading} />
              <CustomInput control={form.control} form={form} name='razao_social' label="Razão Social" placeholder='Digite sua razão social' disabled={isLoading} />
              <CustomInput control={form.control} form={form} name='nome_fantasia' label="Nome Fantasia" placeholder='Digite o nome fantasia' disabled={isLoading} />
              <CustomDatePicker control={form.control} form={form} name='data_abertura' label="Data de Fundação" placeholder='DD/MM/AAAA' disabled={isLoading} />
              <CustomInput control={form.control} form={form} name='telefone_empresa' label="Telefone" placeholder='Digite seu telefone' disabled={isLoading} />
              <CustomInput control={form.control} form={form} name='email_empresa' label="E-mail" placeholder='Digite seu e-mail' disabled={isLoading} />
            </>
          ) : null;
          case 5:
            return (
              <>
                <CustomInput control={form.control} form={form} name='cep' label="CEP" placeholder='Digite seu CEP' disabled={isLoading} />
                <CustomInput control={form.control} form={form} name='logradouro' label="Endereço" placeholder='Digite seu endereço' disabled={isLoading} />
                <div className="flex gap-4">
                  <CustomInput control={form.control} form={form} name='numero' label="Número" placeholder='Digite seu número' disabled={isLoading} />
                  <CustomInput control={form.control} form={form} name='complemento' label="Complemento" placeholder='Digite seu complemento' disabled={isLoading} />
                </div>
                <div className="flex gap-4">
                  <CustomInput control={form.control} form={form} name='bairro' label="Bairro" placeholder='Digite seu bairro' disabled={isLoading} />
                  <CustomInput control={form.control} form={form} name='municipio' label="Cidade" placeholder='Digite sua cidade' disabled={isLoading} />
                  <CustomInput control={form.control} form={form} name='uf' label="Estado" placeholder='Digite seu estado' disabled={isLoading} />
                </div>
              </>
            );
          default:
            return null;
        }
      };

      return (
        <section className="auth-form">
          <header className='flex flex-col gap-5 md:gap-8'>
            <Link href="/" className="cursor-pointer flex items-center gap-1">
              <Image 
                src="/icons/logo2.svg"
                width={164}
                height={164}
                alt="Logo"
              />
            </Link>
            <div className="flex flex-col gap-1 md:gap-3">
              {type === 'sign-in' ? (
                <>
                  <h1 className="text-24 lg:text-32 font-semibold text-gray-900">Olá!</h1>
                  <p className="text-16 lg:text-20 font-semibold text-gray-600">
                    Estamos felizes com você aqui.
                  </p>
                  <p className="text-16 text-gray-600">
                    Insira seu e-mail e senha para entrar
                  </p>
                </>
              ) : (
                <>
                  <p className="text-16 lg:text-32 text-gray-600">Estamos quase lá, só falta um pouco.</p>
                  <FormProgress currentStep={currentStep} totalSteps={totalSteps} accountType={form.watch('accountType') || ''} />
                </>
              )}
            </div>
          </header>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === 'sign-in' ? (
                <>
                  <CustomInput 
                    control={form.control} 
                    form={form} 
                    name='email' 
                    label="E-mail" 
                    placeholder='Insira seu e-mail' 
                    disabled={isLoading} 
                  />
                  <CustomInput 
                    control={form.control} 
                    form={form} 
                    name='password' 
                    label="Senha" 
                    placeholder='Digite sua senha' 
                    disabled={isLoading} 
                  />
                </>
              ) : (
                renderStepContent(currentStep)
              )}

              <div className="flex flex-col gap-4">
                {type === 'sign-up' ? (
                  <>
                    {currentStep === totalSteps ? (
                      <Button 
                        type="submit" 
                        disabled={isLoading || !isStepValid(currentStep)} 
                        className="form-btn"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 size={20} className="animate-spin" />
                            <span className="ml-2">Carregando...</span>
                          </>
                        ) : 'Cadastrar'}
                      </Button>
                    ) : (
                      <Button 
                        type="button" 
                        onClick={handleNext} 
                        className="form-btn"
                        disabled={!isStepValid(currentStep)}
                      >
                        Avançar
                      </Button>
                    )}
                    {currentStep > 1 && (
                      <Button 
                        type="button" 
                        onClick={handleBack}
                        className="form-link"
                      >
                        Voltar
                      </Button>
                    )}
                  </>
                ) : (
                  <Button 
                    type="submit" 
                    disabled={isLoading} 
                    className="form-btn"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        <span className="ml-2">Carregando...</span>
                      </>
                    ) : 'Entrar'}
                  </Button>
                )}
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
        <p className="text-14 font-normal text-gray-600">
          {type === 'sign-in'
            ? "Não tem uma conta ainda?"
            : "Já tem uma conta?"}
        </p>
        <Link 
          href={type === 'sign-in' ? '/sign-up' : '/sign-in'} 
          className="form-link"
        >
          {type === 'sign-in' ? 'Cadastrar' : 'Entrar'}
        </Link>
      </footer>
    </section>
  );
};

export default AuthForm;