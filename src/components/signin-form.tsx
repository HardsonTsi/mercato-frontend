import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { signInSchema } from '@/app/zod-schemas/auth.ts';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { LoaderCircle } from 'lucide-react';
import { useSignInMutation } from '@/app/redux/api/authApi.ts';
import { useToast } from '@/components/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import { setAuth } from '@/app/redux/slices/auth.slice.ts';
import { useAppDispatch } from '@/app/redux/store.ts';
import { useNavigateSearch } from '@/app/hooks/useNavigationSearch.tsx';

export const SigninForm = () => {
  const [signIn, { isLoading }] = useSignInMutation();

  const { toast } = useToast();
  const navigate = useNavigate();
  const navigateSearch = useNavigateSearch();
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '12345678',
    },
  });

  async function onSubmit(data: z.infer<typeof signInSchema>) {
    console.log(data);
    let title = '';
    await signIn(data)
      .unwrap()
      .then((data) => {
        title = `Bienvenue ${data.data.user.firstname} ${data.data.user.lastname}`;
        toast({
          variant: 'destructive',
          title,
        });
        dispatch(setAuth(data.data));
        navigate('/dashboard');
      })
      .catch((err) => {
        if (err.data.status === 403) {
          navigateSearch(`/auth/active-account`, { email: data.email });
          title = 'Veuillez activer votre compte';
        }
        toast({
          variant: 'destructive',
          title: title || err.data.data.message,
        });
      });
  }

  return (
    <>
      <div>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" p-6 md:p-8"
            >
              <div className="flex flex-col gap-6 space-y-2">
                <div className=" flex flex-col items-center text-center ">
                  <h1 className="text-2xl font-bold">Bienvenue</h1>
                  <p className="text-balance text-muted-foreground">
                    Connectez-vous à votre compte Mercato
                  </p>
                </div>

                {/**/}
                <div className="  space-y-4 p-0 md:grid-cols-2 gap-4">
                  {/*email*/}
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adresse Email</FormLabel>
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
                            <Input {...field} type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex items-center">
                    <Button type="submit" className="w-full">
                      <span>Se connecter</span>

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
                    Vous n'avez pas de compte?{' '}
                    <Link
                      to={'/auth/signup'}
                      className="underline underline-offset-4"
                    >
                      Créer un compte
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};
