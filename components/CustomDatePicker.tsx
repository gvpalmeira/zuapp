"use client";

import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from 'date-fns/locale/pt-BR';
import { Control, FieldPath } from 'react-hook-form';
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form';
import { z } from 'zod';
import { authFormSchema, formatDateString, isValidDateValue, parseDate } from '@/lib/utils';

registerLocale('pt-BR', ptBR);

const formSchema = authFormSchema('sign-up');

interface CustomDatePickerProps {
  control: Control<z.infer<typeof formSchema>>,
  name: FieldPath<z.infer<typeof formSchema>>,
  label: string,
  placeholder: string,
  disabled?: boolean,
  form: any
}

const CustomDatePicker = ({ control, name, label, placeholder, disabled, form }: CustomDatePickerProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="form-item">
          <FormLabel className="form-label">{label}</FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <DatePicker
                selected={field.value ? parseDate(field.value) : null}
                onChange={(date: Date | null, event?: any) => {
                const formattedDate = date ? formatDateString(date) : '';
                field.onChange(formattedDate);
                form.trigger(name);
                }}
                onBlur={field.onBlur}
                dateFormat="dd/MM/yyyy"
                locale="pt-BR"
                placeholderText={placeholder}
                disabled={disabled}
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                maxDate={new Date()}
              />
            </FormControl>
            <FormMessage className="form-message mt-2 text-red-500" />
          </div>
        </div>
      )}
    />
  );
};

export default CustomDatePicker;