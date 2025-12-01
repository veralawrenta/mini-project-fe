"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { axiosInstance } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

interface BannerResponse {
  fileURL: string;
  filePath: string;
}

const category = [
  "ENTERTAINMENT",
  "BUSINESS",
  "SPORTS",
  "ART",
  "EDUCATION",
] as const;
const city = [
  "MEDAN",
  "JAKARTA",
  "YOGYAKARTA",
  "DENPASAR",
  "LOMBOK",
  "TIMIKA",
] as const;
const venueType = ["FREE", "PAID"] as const;

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  category: z.enum(category),
  description: z
    .string()
    .min(30, "Description must be at least 30 characters."),
  banner: z.instanceof(File, { message: "Banner is required" }),
  venue: z.string().min(5, "Venue must be at least 5 characters."),
  city: z.enum(city),
  address: z.string().min(5, "Address must be at least 5 characters."),
  venueType: z.enum(venueType),
  date: z.coerce.date("Invalid date format"),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  availableSeats: z.coerce
    .number()
    .min(1, "Available seats must be at least 1."),
  price: z.coerce.number(),
});

type FormFields = z.infer<typeof formSchema>;

const FillEventForm = () => {
  const router = useRouter();

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      title: "",
      category: "ENTERTAINMENT",
      description: "",
      banner: undefined,
      venue: "",
      address: "",
      city: "MEDAN",
      venueType: "FREE",
      date: new Date(),
      startTime: "",
      endTime: "",
      availableSeats: 1,
      price: 0,
    },
  });

  const { mutateAsync: createEvent, isPending } = useMutation({
    mutationFn: async (body: FormFields) => {
      const formData = new FormData();

      formData.append("banner", body.banner);
      formData.append("title", body.title);
      formData.append("description", body.description);
      formData.append("category", body.category);
      formData.append("city", body.city);
      formData.append("venue", body.venue);
      formData.append("address", body.address);
      formData.append("venueType", body.venueType);
      formData.append("date", new Date(body.date).toISOString());
      formData.append("availableSeats", body.availableSeats.toString());
      formData.append("price", body.price.toString());

      if (body.startTime) {
        formData.append("startTime", body.startTime);
      }

      if (body.endTime) {
        formData.append("endTime", body.endTime);
      }

      const { data } = await axiosInstance.post("/events", formData);

      return data;
    },
    onSuccess: () => {
      alert("Create Event Success");
      router.push("/");
    },
    onError: (e: AxiosError<{ message: string }>) => {
      alert(e.response?.data.message || "Create Event Failed");
    },
  });

  async function onSubmit(data: FormFields) {
    await createEvent(data);
  }

  return (
    <div className="container mx-auto px-4 mt-6 pb-20">
      <form id="form-write" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend className="font-extrabold text-primary text-6xl text-center">Create Your Event Here</FieldLegend>
            <FieldDescription className="font-semibold text-center text-secondary-foreground">
              Please fill all necessary information to create your event.
            </FieldDescription>

            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="title" className="font-bold">Title</FieldLabel>
                  <Input {...field} id="title" placeholder="Title" 
                  className="border-primary hover:border-secondary-foreground"/>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Description</FieldLabel>
                  <Textarea {...field} placeholder="Description" 
                  className="border-primary hover:border-secondary-foreground"/>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="category"
              control={form.control}
              render={({ field }) => (
                <Field>
                <FieldLabel htmlFor="City">
                    Category
                  </FieldLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="event-category"
                  className="border-primary hover:border-secondary-foreground">
                    <SelectValue placeholder="Select event category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ENTERTAINMENT">ENTERTAINMENT</SelectItem>
                    <SelectItem value="BUSINESS">BUSINESS</SelectItem>
                    <SelectItem value="SPORTS">SPORTS</SelectItem>
                    <SelectItem value="ART">ART</SelectItem>
                    <SelectItem value="EDUCATION">EDUCATION</SelectItem>
                  </SelectContent>
                </Select>
                </Field>
              )}
            />

            <Controller
              name="venue"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Venue</FieldLabel>
                  <Input {...field} placeholder="Venue" 
                  className="border-primary hover:border-secondary-foreground"/>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="address"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Address</FieldLabel>
                  <Input {...field} placeholder="Address" 
                 className="border-primary hover:border-secondary-foreground"/>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="city"
              control={form.control}
              render={({ field }) => (
                <Field>
                <FieldLabel htmlFor="City">
                    City
                  </FieldLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="event-city"
                  className="border-primary hover:border-secondary-foreground">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MEDAN">MEDAN</SelectItem>
                    <SelectItem value="JAKARTA">JAKARTA</SelectItem>
                    <SelectItem value="YOGYAKARTA">YOGYAKARTA</SelectItem>
                    <SelectItem value="DENPASAR">DENPASAR</SelectItem>
                    <SelectItem value="LOMBOK">LOMBOK</SelectItem>
                    <SelectItem value="TIMIKA">TIMIKA</SelectItem>
                  </SelectContent>
                </Select>
                </Field>
              )}
            />

            <Controller
              name="date"
              control={form.control}
              render={({ field, fieldState }) => {
                const value = field.value
                  ? new Date(field.value).toISOString().slice(0, 16)
                  : "";

                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Date</FieldLabel>
                    <Input
                      type="datetime-local"
                      value={value}
                      onChange={(e) => field.onChange(new Date(e.target.value))}
                    className="border-primary hover:border-secondary-foreground"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                );
              }}
            />

            <Controller
              name="startTime"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Start Time</FieldLabel>
                  <Input {...field} type="time" 
                  className="border-primary hover:border-secondary-foreground"/>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="endTime"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>End Time</FieldLabel>
                  <Input {...field} type="time" 
                  className="border-primary hover:border-secondary-foreground"/>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="venueType"
              control={form.control}
              render={({ field }) => (
                <Field>
                <FieldLabel htmlFor="City">
                    Venue Type
                  </FieldLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="venue-type"
                  className="border-primary hover:border-secondary-foreground">
                    <SelectValue placeholder="Select venue type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FREE">FREE</SelectItem>
                    <SelectItem value="PAID">PAID</SelectItem>
                  </SelectContent>
                </Select>
                </Field>
              )}
            />

            <Controller
              name="banner"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Banner</FieldLabel>
                  <Input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      field.onChange(file ?? undefined);
                    }}
                  className="border-primary hover:border-secondary-foreground"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Field className="w-fit">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Loading..." : "Submit"}
              </Button>
            </Field>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
};

export default FillEventForm;
