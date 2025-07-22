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
import { bookFormats, bookGenres } from "@/types_&_schemas";
import { useTranslation } from "react-i18next";

const BookFormatOptions = [...bookFormats];
const BookGenreOptions = [...bookGenres];

function BookForm() {
  const methods = useForm<BookFields>({
    resolver: zodResolver(BookSchema),
  });

  const { t } = useTranslation();

  const onSubmit: SubmitHandler<BookFields> = (formData) => {
    console.log(formData);
    alert("submitted");
    methods.reset();
  };
  return (
    <Card className="md:w-[25vw] sm:w-[50vw] mt-20">
      <CardHeader>
        <CardTitle className="text-center">{t("form.form_title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <FormInputText
              name="title"
              label={t("form.title")}
              placeholder={t("form.placeholders.title")}
            />
            <FormInputText
              name="author"
              label={t("form.author")}
              placeholder={t("form.placeholders.author")}
            />
            <FormSelect
              name="format"
              label={t("form.format")}
              placeholder={t("form.placeholders.select")}
              options={BookFormatOptions}
            />
            <FormSelect
              name="genre"
              label={t("form.genre")}
              placeholder={t("form.placeholders.select")}
              options={BookGenreOptions}
            />
            <FormInputNumber name="price" label={t("form.price")} />

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
                        <span>{t("form.placeholders.select_date")}</span>
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
            <FormInputText
              name="publisher"
              label={t("form.publisher")}
              placeholder={t("form.placeholders.publisher")}
            />
            <Button
              disabled={methods.formState.isSubmitting}
              className="mx-auto w-full"
              type="submit"
            >
              {methods.formState.isSubmitting
                ? t("form.submitting")
                : t("form.submit")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default BookForm;
