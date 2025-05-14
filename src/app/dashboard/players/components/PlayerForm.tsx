import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { playerSchema } from '@/app/zod-schemas/player.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { FootballPositionType, PlayerType } from '@/app/types/player.ts';
import { Input } from '@/components/ui/input.tsx';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select.tsx';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group.tsx';
import { Ban, Shield, Tag } from 'lucide-react';
import { Country } from 'country-state-city';
import { Calendar } from '@/components/ui/calendar.tsx';
import { Button } from '@/components/ui/button.tsx';
import { SheetClose, SheetFooter } from '@/components/ui/sheet.tsx';
import { useEffect } from 'react';
import { useCreatePlayerMutation, useUpdatePlayerMutation } from '@/app/redux/api/playerApi.ts';
import { useToast } from '@/components/hooks/use-toast.ts';


export const PlayerForm = ({
                             player = {
                               id: undefined,
                               lastname: '',
                               firstname: '',
                               email: '',
                               number: 0,
                               price: 0,
                               country: 'FR',
                               birthday: undefined,
                               position: FootballPositionType[0],
                               avatar: '',
                               available: false,
                             }, setOpen,
                           }: { player?: PlayerType, setOpen: Function }) => {

  const countries = Country.getAllCountries();
  const [createPlayer, {}] = useCreatePlayerMutation();
  const [updatePlayer, {}] = useUpdatePlayerMutation();

  const form = useForm<z.infer<typeof playerSchema>>({
    resolver: zodResolver(playerSchema),
    defaultValues: player,
  });

  const { errors } = form.formState;
  const { toast } = useToast();
  useEffect(() => {
    console.log('Erreurs du formulaire :', errors);
  }, [errors]);

  async function onSubmit(data: any) {
    console.log(data);
    const id = player.id;
    const response = id ? updatePlayer({ id, data }) : createPlayer(data);

    await response
      .unwrap()
      .then(() => {
        setOpen(false);
        toast({
          variant: 'default',
          type: 'foreground',
          title: id ? 'Joueur mise à jour' : 'Joueur enregistré',
        });
      })
      .catch(e => {
        toast({
          variant: 'default',
          type: 'background',
          title: e.data.message,
        });
      });

  }

  return <>

    <div className="flex flex-1 flex-col gap-4 overflow-y-auto py-4 text-sm ">

      {
        player.avatar
          ?
          <img
            src={player.avatar}
            className="mx-auto w-1/2 h-[400px] bg-red-500"
            alt={`${player.lastname} ${player.firstname}`}
          />
          :
          <Shield

            width={100}
            height={100}
          />

      }

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <div className="grid grid-cols-2 gap-4">
            {/*lastname*/}
            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/*firstname*/}
            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prénom</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/*email*/}
            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/*number*/}
            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value ?? ''}
                        onChange={(e) => {
                          const value = e.target.valueAsNumber;
                          field.onChange(Number.isNaN(value) ? undefined : value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/*available*/}
            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="available"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Disponible</FormLabel>
                    <FormControl>
                      <ToggleGroup type="single"
                                   value={field.value.toString()}
                                   onValueChange={(newValue) => {
                                     field.onChange(newValue === 'true');
                                   }}
                      >
                        <ToggleGroupItem
                          value="true">
                          <Tag className="text-green-500 dark:text-green-400" />
                          En vente
                        </ToggleGroupItem>
                        <ToggleGroupItem
                          value="false">
                          <Ban className="text-red-500 dark:text-red-400" />
                          Pas à vendre
                        </ToggleGroupItem>
                      </ToggleGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/*price*/}
            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix</FormLabel>
                    <FormControl>
                      <Input {...field}
                             type={'number'}
                             value={field.value ?? ''}
                             onChange={(e) => {
                               const value = e.target.valueAsNumber;
                               field.onChange(Number.isNaN(value) ? undefined : value);
                             }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/*country*/}
            <div className="flex flex-col gap-3">
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

            {/*birthday*/}
            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="birthday"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de naissance</FormLabel>
                    <FormControl>
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        className="rounded-md border"
                        disabled={(date) => date > new Date() || date < new Date('1987-01-01')}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/*position*/}
          <div className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choisissez un poste">
                          {field.value}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {FootballPositionType.map(position => (
                          <SelectItem
                            key={position}
                            value={position}
                          >
                            {position}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <SheetFooter className="mt-auto flex gap-2 sm:flex-col sm:space-x-0">
            <Button
              type={'submit'}
              className="w-full">Publier</Button>
            <SheetClose asChild>
              <Button
                type="reset"
                variant="outline"
                className="w-full"
              >
                Fermer
              </Button>
            </SheetClose>
          </SheetFooter>

        </form>
      </Form>
    </div>
  </>;

};
