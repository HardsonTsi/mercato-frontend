import { Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils.ts';
import { Card, CardContent } from '@/components/ui/card.tsx';

const AuthLayout = () => {
  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <div className={cn('flex flex-col gap-6')}>
            <Card className="overflow-hidden">
              <CardContent className="grid p-0 md:grid-cols-2">
                <Outlet />

                <div className="relative hidden bg-muted md:block">
                  <img
                    src="/public/signup.svg"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                  />
                </div>
              </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
              En cliquant sur continuer, vous acceptez nos{' '}
              <a href="#">Conditions d’utilisation</a> et{' '}
              <a href="#">Politique de confidentialité</a>.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
