"use client";

import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";

type Props = {};

const formSchema = z.object({
  query: z.string().min(0),
});

type FormType = z.infer<typeof formSchema>;

const SearchBar = (props: Props) => {
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("search");
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: currentQuery ?? "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: FormType) => {
    // add search query to url
    // Create a new URL object from the current window location
    const url = new URL(window.location.href);

    // Add the search query to the URL's search parameters
    url.searchParams.set("search", data.query);

    // Replace the current URL in the browser history with the updated URL
    window.history.replaceState({}, "", url.toString());

    // If the query is empty, remove the "search" parameter from the URL
    if (data.query === "") {
      url.searchParams.delete("search");
      // Replace the current URL in the browser history with the updated URL
      window.history.replaceState({}, "", url.toString());
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative flex items-center"
      >
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Search..."
                  {...field}
                  className="focus-visible:ring-offset-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="absolute right-0" variant={`ghost`}>
          <Search className="h-4 w-4" />
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;
