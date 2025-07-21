import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { BookSchema, type BookFields } from "@/types_&_schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { FormInputNumber, FormInputText } from "./FormInput";
// import { ja } from "date-fns/locale";
import FormSelect from "./FormSelect";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";

const BookFormatOptions = ["Hardcover", "Paperback", "eBook", "Audiobook"];
const BookGenreOptions = [
  "Fiction",
  "Non-fiction",
  "Mystery",
  "Fantasy",
  "Romance",
  "Science Fiction",
  "Biography",
  "History",
  "Horror",
];

function BookForm() {
  const methods = useForm<BookFields>({
    resolver: zodResolver(BookSchema),
  });

  const onSubmit: SubmitHandler<BookFields> = (formData) => {
    console.log(formData);
    alert("submitted");
    methods.reset();
  };
  return (
    <Card className="w-[25vw] mt-4">
      <CardHeader>
        <CardTitle>Submission Form</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <FormInputText name="name" label="Title" />
            <FormInputText name="author" label="author" />
            <FormSelect
              name="format"
              label="Select book format"
              options={BookFormatOptions}
            />
            <FormSelect
              name="genre"
              label="Select book genre"
              options={BookGenreOptions}
            />
            <FormInputNumber name="price" label="price" />

            <Controller
              control={methods.control}
              name="published_date"
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {field.value ? (
                        format(field.value, "PP")
                      ) : (
                        <span>Select Date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      showOutsideDays={false}
                      styles={{ cell: { minWidth: "32px" } }}
                      // locale={ja}
                      selected={field.value}
                      onSelect={(date) => {
                        field.onChange(date);
                        if (!date) {
                          methods.setError("published_date", {
                            type: "manual",
                            message: "Please select a date",
                          });
                        } else {
                          methods.clearErrors("published_date");
                        }
                      }}
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
            <FormInputText name="publisher" label="publisher" />
            <Button
              disabled={methods.formState.isSubmitting}
              className="mx-auto w-full"
              type="submit"
            >
              {methods.formState.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default BookForm;
