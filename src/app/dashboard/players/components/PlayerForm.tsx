import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { playerSchema } from '@/app/zod-schemas/player.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { faker } from '@faker-js/faker';
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
import { Ban, Tag } from 'lucide-react';
import { Country } from 'country-state-city';
import { Calendar } from '@/components/ui/calendar.tsx';
import { Button } from '@/components/ui/button.tsx';
import { SheetClose, SheetFooter } from '@/components/ui/sheet.tsx';


export const PlayerForm = ({ player }: { player: PlayerType }) => {

  const countries = Country.getAllCountries();

  const form = useForm<z.infer<typeof playerSchema>>({
    resolver: zodResolver(playerSchema),
    defaultValues: {
      lastname: player.lastname || faker.person.lastName(),
      firstname: player.firstname || faker.person.firstName(),
      email: player.email || faker.internet.email(),
      number: player.number || faker.number.int({ min: 1, max: 99 }), // Utilisation de `??` pour vérifier si `number` est défini
      price: player.price || faker.number.float({ min: 1000 }),
      available: player.available || faker.datatype.boolean(),
      country: player.country || faker.location.countryCode(),
      avatar: player.avatar || faker.image.avatar(),
      birthday: player.birthday || faker.date.past({ years: 1987 }),
      position: player.position || faker.helpers.arrayElement(Object.keys(FootballPositionType)),
    },
  });

  function onSubmit(data: any) {
    console.log(data);
  }

  return <>

    <div className="flex flex-1 flex-col gap-4 overflow-y-auto py-4 text-sm">

      <img src={player.avatar}
           className=" mx-auto w-1/2 h-[400px]"

           alt={`${player.lastname} ${player.firstname}`} />
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
                      <Input {...field} />
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
                      <ToggleGroup type="single">
                        <ToggleGroupItem onChange={field.onChange}
                                         value="true">
                          <Tag className="text-green-500 dark:text-green-400" />
                          En vente
                        </ToggleGroupItem>
                        <ToggleGroupItem onChange={field.onChange}
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
                      <Input {...field} />
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
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pays</FormLabel>
                    <FormControl>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={`${Country.getCountryByCode(form.getValues('country'))?.name} ${Country.getCountryByCode(form.getValues('country'))?.flag}`}>
                            {Country.getCountryByCode(form.getValues('country'))?.name} {Country.getCountryByCode(form.getValues('country'))?.flag}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {countries.map(country => <SelectItem
                              value={country.isoCode}
                              onChange={field.onChange}
                            >
                              {country.name} {country.flag}
                            </SelectItem>)}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <SheetFooter className="mt-auto flex gap-2 sm:flex-col sm:space-x-0">
            <Button type={'submit'} className="w-full">Submit</Button>
            <SheetClose asChild>
              <Button
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
