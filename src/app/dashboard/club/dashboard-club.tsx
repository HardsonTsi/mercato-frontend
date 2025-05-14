import { Loader2, Shield } from 'lucide-react';
import { PhotoIcon } from '@heroicons/react/20/solid';
import { clubSchema } from '@/app/zod-schemas/club.ts';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { Button } from '@/components/ui/button.tsx';
import { ChangeEvent, useState } from 'react';
import { useUploadMutation } from '@/app/redux/api/fileApi.ts';
import { useToast } from '@/components/hooks/use-toast.ts';
import { useCreateClubMutation, useUpdateClubMutation } from '@/app/redux/api/clubApi.ts';
import { useAuth } from '@/app/redux/slices/auth.slice.ts';
import { Country } from 'country-state-city';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';

export default function DashboardClub() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadFile] = useUploadMutation();
  const [createClub, { isLoading }] = useCreateClubMutation();
  const [updateClub, { isLoading: updateClubLoading }] = useUpdateClubMutation();
  const countries = Country.getAllCountries();


  const { user } = useAuth();

  const { toast } = useToast();

  const form = useForm<z.infer<typeof clubSchema>>({
    resolver: zodResolver(clubSchema),
    defaultValues: user.club || {
      budget: 0,
      country: 'FR',
      logo: '',
      name: '',
    },
  });

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setFile(e.target.files[0]);
    await uploadFile(file)
      .unwrap()
      .then(async (_) => {
        const { name, budget, country } = user.club;

        await onSubmit({ name, budget, country, logo: _.url });

        setFile(null);
      })
      .catch((_) => {
        console.log(_);
        toast({
          type: 'background',
          variant: 'default',
          title: 'Echec de l\'enregistrement du logo',
        });
      });
  };

  const onSubmit = async (data: z.infer<typeof clubSchema>) => {
    console.log(data);
    const cas = !user.club ? createClub(data) : updateClub(data);

    await cas
      .unwrap()
      .then((_) => {
        console.log(_);
        toast({
          variant: 'default',
          title: 'Club enregistré avec succès',
        });
      })
      .catch((e) => {
        console.log(e);
        toast({
          variant: 'default',
          title: `Echec de l'enregistrement du club`,
        });
      });
  };

  return (
    <>

      {/* Mon club */}

      {user.club ? (
        <>
          <div className="flex flex-col items-center">


            {user.club.logo ? (
              <img
                src={user.club.logo}
                alt={user.club.name}
                width={100}
                height={100}
              />
            ) : (
              <Shield width={100}
                      height={100} />
            )}
            <p className="font-extrabold text-3xl">
              {user.club.name}
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col items-center">
            <Shield width={100}
                    height={100}
                    className={'mx-auto'} />
            <p className="font-extrabold text-3xl">Nom du club</p>
          </div>
        </>
      )}


      <Separator className="my-6" />

      {/*  formulaire*/}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
              className=" p-6 md:p-8">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base/7 font-semibold text-gray-900">
                Mon club
              </h2>
              <p className="mt-1 text-sm/6 text-gray-600">
                Ces informations seront affichées publiquement.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Logo du club
                  </label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <PhotoIcon
                        aria-hidden="true"
                        className="mx-auto size-12 text-gray-300"
                      />
                      <div className="mt-4 flex text-sm/6 text-gray-600">
                        <label
                          htmlFor="file"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-primary-600 focus-within:ring-2 focus-within:ring-primary-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-primary-500"
                        >
                          <span>Télécharger un fichier</span>
                          <input
                            id="file"
                            onChange={handleFileChange}
                            name="file"
                            type="file"
                            accept="image/*"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">ou par glisser-déposer</p>
                      </div>
                      <p className="text-xs/5 text-gray-600">
                        PNG, JPG, GIF & SVG
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base/7 font-semibold text-gray-900">
                Information du club
              </h2>
              <p className="mt-1 text-sm/6 text-gray-600">
                Utilisez une adresse permanente où vous pouvez recevoir du
                courrier.
              </p>

              <div className="mt-10 grid gap-8 ">
                {/*name*/}
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom du club</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/*budget*/}
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Le budget</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/*  country*/}
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => {
                      const selectedCountry = Country.getCountryByCode(field.value);
                      const country = `${selectedCountry?.name} ${selectedCountry?.flag}`;
                      return (
                        <FormItem>
                          <FormLabel>Pays</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange}
                                    defaultValue={field.value}>
                              <SelectTrigger className="w-full">
                                <SelectValue
                                  placeholder={country}
                                >
                                  {country}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  {countries.map((country) => (
                                    <SelectItem
                                      value={country.isoCode}
                                      key={`Country-${country.isoCode}`}
                                    >
                                      {country.name} {country.flag}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button variant="outline"
                    type="reset">
              Annuler
            </Button>
            <Button type="submit">
              Enregistrer
              {(isLoading || updateClubLoading) && (
                <Loader2 className="animate-spin" />
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
