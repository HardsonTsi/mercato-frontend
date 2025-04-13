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
import { useNavigate } from 'react-router-dom';
import { setAuth } from '@/app/redux/slices/auth.slice.ts';
import { useAppDispatch } from '@/app/redux/store.ts';

export const SigninForm = () => {
  const [signIn, { isLoading }] = useSignInMutation();

  const { toast } = useToast();
  const navigate = useNavigate()
  const dispatch = useAppDispatch();


  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: z.infer<typeof signInSchema>) {
    console.log(data);
    await signIn(data)
      .unwrap()
      .then((data) => {
        toast({
          variant: 'destructive',
          title: `Bienvenue ${data.data.user.firstname} ${data.data.user.lastname}`,
        });
        dispatch(setAuth(data.data));
        navigate("/dashboard")
      })
      .catch((err) => {


        toast({
          variant: 'destructive',
          title: err.data.data.message
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
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-balance text-muted-foreground">
                    Login to your Acme Inc account
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
                            <Input {...field} type="password" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex items-center">
                    <Button type="submit"
                            className="w-full">
                      <span>Se connecter</span>

                      {isLoading && (
                        <span className="animate-spin">
                          <LoaderCircle />
                        </span>
                      )}
                    </Button>
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
