import { z } from 'zod';

export const profileFormSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: 'O nome deve ter pelo menos 3 caracteres' })
      .max(100, { message: 'O nome deve ter no máximo 100 caracteres' }),
    email: z.string().email({ message: 'Email inválido' }),
    password: z
      .string()
      .min(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
      .optional()
      .or(z.literal('')),
    confirmPassword: z.string().optional().or(z.literal(''))
  })
  .refine(
    (data) => {
      if (data.password && data.password.length > 0) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: 'As senhas não coincidem',
      path: ['confirmPassword']
    }
  );

export type ProfileFormData = z.infer<typeof profileFormSchema>;
