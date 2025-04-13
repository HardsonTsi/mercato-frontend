import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp.tsx';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { useActivateAccountMutation } from '@/app/redux/api/authApi.ts';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/form.tsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { activeAccountSchema } from '@/app/zod-schemas/auth.ts';
import { Button } from '@/components/ui/button.tsx';
import { LoaderCircle } from 'lucide-react';
import { useAppDispatch } from '@/app/redux/store.ts';
import { setAuth } from '@/app/redux/slices/auth.slice.ts';
import { useNavigate } from 'react-router-dom';
import { ActiveAccountType } from '@/app/types/auth.ts';
import config from '@/config/config.ts';
import { useToast } from '@/components/hooks/use-toast';

export const ActiveAccountComponent = ({ email }: { email: string }) => {
  const [activateAccount, { isLoading }] = useActivateAccountMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { toast } = useToast();


  const form = useForm<ActiveAccountType>({
    resolver: zodResolver(activeAccountSchema),
    defaultValues: {
      email: email || 'hardsontessi2@gmail.com',
      code: '',
    },
  });

  async function onSubmit(data: ActiveAccountType) {
    console.log(data);
    await activateAccount(data)
      .unwrap()
      .then((_: any) => {
        console.log(_);
        dispatch(setAuth(_.data));
        navigate('/dashboard');
      })
      .catch((e) => {
        toast({
          variant: 'destructive',
          title: e.data.data.message,
        });
      });
  }

  return (
    <>
      <p className="text-center font-bold py-1">Activez votre compte</p>
      <Form {...form}>
        <form
          className="flex flex-col gap-4 justify-center pt-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={config.authCodeLength}
                      {...field}
                      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit"

          >
            {/**/}
            Activer mon compte
            {isLoading && (
              <span className="animate-spin">
                <LoaderCircle />
              </span>
            )}
          </Button>


          <div className="grid grid-cols-3 gap-4"></div>
          <div className="text-center text-sm">
            Don&apos;t have an account?{' '}
            <a href="#"
               className="underline underline-offset-4">
              Sign up
            </a>
          </div>
        </form>
      </Form>
    </>
  );
};

