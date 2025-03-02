import { GenericForm } from "./generic-form";
import { FORM_FIELDS } from "../constants/Formfields";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { z } from "zod";
import { ScrollArea } from "./ui/scroll-area";
import { FileText } from "lucide-react";
import { Separator } from "./ui/separator";

function GenericFormCard() {
  const defaultValues = {
    text: "",
    textarea: "",
    select: "",
    checkbox: false,
    switch: false,
    radio: "option1",
    slider: [1],
    datePicker: new Date(),
  };

  const validationSchema = z.object({
    text: z.string().min(2, "Invalid input"),
    textarea: z.string().min(5, "Invalid input"),
    select: z.string().min(1, "Selection required"),
    checkbox: z.boolean().refine((val) => val === true, {
      message: "This field is required",
    }),
    toggle: z.boolean().refine((val) => val === true, {
      message: "This field is required",
    }),
    radio: z.string().min(1, "Selection required"),
    slider: z
      .array(z.number().min(1, "Invalid value").positive("Invalid value"))
      .nonempty("This field is required"),
    datePicker: z.union([z.string(), z.date()]).refine(
      (value) => {
        const date = value instanceof Date ? value : new Date(value);
        return !isNaN(date.getTime()) && date >= new Date();
      },
      {
        message: "Invalid date",
      }
    ),
  });

  return (
    <Card className="w-full max-w-2xl shadow-lg rounded-2xl">
      <CardHeader className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-primary" /> {/* Icon */}
          <CardTitle className="text-xl font-semibold">Generic Form</CardTitle>
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          Fill out the details below and submit the form.
        </CardDescription>
        <Separator />
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96 px-6 py-4">
          <GenericForm
            formConfig={{
              formFields: FORM_FIELDS,
              defaultValues,
              validationSchema,
            }}
            formSettings={{
              mode: "onChange",
            }}
            actions={{
              onSubmit: (values) => console.log(values),
              onError: (errors) => console.log(errors),
              submitButtonText: "Submit",
            }}
          />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

export default GenericFormCard;
