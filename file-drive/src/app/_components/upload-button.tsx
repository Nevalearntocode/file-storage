"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useMutation } from "convex/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../../convex/_generated/api";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useOrganizationContext } from "@/contexts/organization-context";
import { typeConverter } from "@/lib/utils";

type Props = {};

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  file: z
    .custom<FileList | undefined>((val) => val instanceof FileList, "required")
    .refine((files) => files && files.length > 0, "required"),
});

type FormType = z.infer<typeof formSchema>;

const UploadButton = (props: Props) => {
  const organization = useOrganizationContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const createFile = useMutation(api.files.createFile);

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      file: undefined,
    },
  });

  const isLoading = form.formState.isSubmitting;
  const fileRef = form.register("file");

  const onLogData = (data: FormType) => {
    console.log(data);
  };

  const onSubmit = async (data: FormType) => {
    if (!organization) {
      return;
    }

    const { orgId } = organization;

    const file = data.file?.[0];

    if (!file) {
      return;
    }

    try {
      const postUrl = await generateUploadUrl();
      const result = await axios.post(postUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      });
      const storageId = result.data.storageId;

      await createFile({
        name: data.name,
        orgId,
        fileId: storageId,
        type: typeConverter(file.type),
        size: file.size,
      });
      form.reset();
      setIsModalOpen(false);
      toast.success("File uploaded successfully");
    } catch (error: any) {
      console.error(error);
      toast.error(error.data);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button>Upload File</Button>
      </DialogTrigger>
      <DialogOverlay className="opacity-60">
        <DialogContent>
          <DialogHeader className="mb-4">
            <DialogTitle>Upload your file</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="file"
                render={() => (
                  <FormItem>
                    <FormLabel>File</FormLabel>
                    <FormControl>
                      <Input type="file" {...fileRef} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="flex items-center self-end"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <p>Uploading...</p>
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  "Upload"
                )}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default UploadButton;
