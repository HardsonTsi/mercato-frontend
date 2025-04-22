import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signUpSchema } from '@/app/zod-schemas/auth.ts';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { LoaderCircle } from 'lucide-react';
import { Button } from './ui/button';
import { useSignUpMutation } from '@/app/redux/api/authApi.ts';

import { useToast } from '@/components/hooks/use-toast';
import { Link } from 'react-router-dom';
import { useNavigateSearch } from '@/app/hooks/useNavigationSearch.tsx';

export function SignupForm() {
  const [signUp, { isLoading }] = useSignUpMutation();
  const { toast } = useToast();
  const navigateSearch = useNavigateSearch();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      firstname: '',
      lastname: '',
      password: '12345678',
      termOfUse: false,
    },
  });

  async function onSubmit(data: z.infer<typeof signUpSchema>) {
    console.log(data);
    await signUp(data)
      .unwrap()
      .then(() => {
        toast({
          variant: 'destructive',
          title: 'Compte créé avec succès',
          description: 'Compte créé avec succès',
        });
        localStorage.setItem('email', data.email);
        navigateSearch('/auth/active-account', { email: data.email });
      })
      .catch((error) => {
        console.log(error);
        toast({
          variant: 'destructive',
          title: error.data.data.message,
          description: error.data.data.message,
        });
      });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center text-center ">
              <h1 className="text-2xl font-bold">Welcome back</h1>
              <p className="text-balance text-muted-foreground">
                Login to your Acme Inc account
              </p>
            </div>

            {/**/}
            <div className=" grid p-0 md:grid-cols-2 gap-2">
              {/*lastname*/}
              <div className="">
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/*firstname*/}
              <div className="">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/*email*/}
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="m@example.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/*password*/}
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input {...field} type={'password'} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center">
              <Button
                disabled={!form.formState.isValid}
                type="submit"
                className="w-full"
              >
                <span>Créer un compte</span>

                {isLoading && (
                  <span className="animate-spin">
                    <LoaderCircle />
                  </span>
                )}
              </Button>
            </div>

            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4"></div>
            <div className="text-center text-sm">
              Vous avez déjà un compte ?{' '}
              <Link to={'/auth'} className="underline underline-offset-4">
                Se connecter
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
